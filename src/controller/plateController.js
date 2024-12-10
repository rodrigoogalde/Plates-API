const path = require("path");
const fs = require("fs-extra");
const ftp = require("basic-ftp");
const moment = require("moment");

const generateFile = async (ctx) => {
    try {
        const plates = await ctx.orm.Plate.findAll(); // Obtén todos los registros
        let listId = 2; // ID predefinido para el archivo
        const currentTimestamp = new Date().toISOString().replace("Z", "").slice(0, -3); // Fecha y hora actual en formato ISO

        const formatFile = path.join(__dirname, "../../data/ZKTeco_Plates.csv");

        // Creamos el directorio en caso que no exista
        await fs.ensureDir(path.dirname(formatFile));

        const headerLines = [
            "nllist-id;description;color;levenshteindist",
            "-2;all plates;#000000;0",
            "-1;not in list;#000000;0",
            "1;BLOCKLIST;#000000;0",
            "2;Propietarios;#000000;0",
            "3;Invitados;#000000;0",
            "4;Propietarios_Habilitados;#000000;0",
            "nlelemlist-id;numberplate;listid;timestamp;description;startvaliditydate;endvaliditydate"
        ];

        fs.writeFileSync(formatFile, headerLines.join("\n") + "\n");

        let nlelemlistId = 2;
        plates.forEach((plate, index) => {
            if (!plate.plate || plate.plate.trim() === "") {
                // console.warn(`Advertencia: fila omitida debido a 'plate' vacío en índice ${index}`);
                return;
            }

            // // Si plate.site parte con A, se asigna el valor 2, de lo contrario 3
            // if (plate.site.startsWith("A") || plate.site.startsWith("B") || plate.site.startsWith("C")) {
            //     listId = 4;
            // }

            const outputLine = `${nlelemlistId};${plate.plate};${listId};${currentTimestamp};${plate.site};${currentTimestamp};3000-01-01T00:00:00.000`;
            fs.appendFileSync(formatFile, outputLine + "\n");
            nlelemlistId++;
            listId = 2;
        });

        ctx.status = 200;
        ctx.body = {
            message: `Archivo generado exitosamente en ${formatFile}`,
        };
    } catch (error) {
        console.error("Error al generar el archivo:", error);
        ctx.status = 500;
        ctx.body = {
            error: "Error al generar el archivo.",
        };
    }
};

const uploadToFtp = async (ctx) => {
    try {
        const ftpHost = process.env.FTP_HOST;
        const ftpUser = process.env.FTP_USER;
        const ftpPassword = process.env.FTP_PASSWORD;
        const remoteFolder = process.env.FTP_REMOTE_FOLDER;

        const listToLoad = "Propietarios";
        const pathToFile = path.join(__dirname, "../../data/");
        const localCsvFile = path.join(pathToFile, "ZKTeco_Plates.csv");

        const filenameToUpload = `FTP_DATA_EXPORT_CSV_${listToLoad}.csv`;
        const localTempFile = path.join(pathToFile, filenameToUpload);
        const flagFile = path.join(pathToFile, `FTP_DATA_EXPORT_CSV_${listToLoad}.csv.FLAG`);

        await fs.copy(localCsvFile, localTempFile);
        await fs.writeFile(flagFile, "");

        const client = new ftp.Client();
        client.ftp.verbose = true;

        await client.access({
            host: ftpHost,
            user: ftpUser,
            password: ftpPassword,
            secure: false,
        });

        if (remoteFolder) {
            await client.ensureDir(remoteFolder);
        }

        await client.uploadFrom(localTempFile, path.basename(filenameToUpload));
        await client.uploadFrom(flagFile, path.basename(flagFile));
        client.close();

        await fs.remove(localTempFile);
        await fs.remove(flagFile);

        const currentTimestamp = moment().format("YYYY-MM-DD HH:mm:ss");
        ctx.status = 200;
        ctx.body = {
            message: "Archivos subidos exitosamente al servidor FTP.",
            timestamp: currentTimestamp,
        };
    } catch (error) {        
        ctx.status = 500;
        ctx.body = {
            error: "Ocurrió un error al subir los archivos al servidor FTP.",
        };
    }
};

module.exports = {
    generateFile,
    uploadToFtp,
};
