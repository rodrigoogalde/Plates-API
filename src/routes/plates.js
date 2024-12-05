const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const path = require('path');

router.get('/', async (ctx) => {
        const plates = await ctx.orm.Plate.findAll();
        ctx.body = plates;
    }
);


router.post('/add', async (ctx) => {

    const plate = await ctx.orm.Plate.findOne({
        where: {
            plate: ctx.request.body.plate,
            site: ctx.request.body.site
        }
    });

    if (plate) {
        ctx.status = 400;
        ctx.body = {
            message: 'La patente ya esta asociada a este sitio'
        };
        return;
    }

    try {
        const newPlate = await ctx.orm.Plate.create(ctx.request.body);
        ctx.status = 201;
        ctx.body = newPlate;
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = {
            message: error
        };
    }
});

router.get('/all/:site', async (ctx) => {
    const plates = await ctx.orm.Plate.findAll({
        where: {
            site: ctx.params.site
        }
    });
    ctx.body = plates;
}
);

router.post('/api', (ctx) => {
    console.log(ctx.request.body);

    ctx.body = {
        message: ctx.request.body
    };
});

router.post('/generate-file', async (ctx) => {
    try {
        const plates = await ctx.orm.Plate.findAll(); // Obtén todos los registros
        const listId = 2; // ID predefinido para el archivo
        const currentTimestamp = new Date().toISOString().replace("Z", "").slice(0, -3); // Fecha y hora actual en formato ISO

        // Ruta del archivo CSV de salida
        const formatFile = path.join(__dirname, '../../data/ZKTeco_Plates.csv');

        // Cabeceras del archivo
        const headerLines = [
            "nllist-id;description;color;levenshteindist",
            `${listId};Propietarios;#000000;0`,
            "nlelemlist-id;numberplate;listid;timestamp;description;startvaliditydate;endvaliditydate",
        ];

        // Escribir las cabeceras en el archivo
        fs.writeFileSync(formatFile, headerLines.join("\n") + "\n");

        // Procesar las filas y escribirlas en el archivo
        let nlelemlistId = 2; // Comienza en 2
        plates.forEach((plate, index) => {
            if (!plate.plate || plate.plate.trim() === "") {
                console.warn(`Advertencia: fila omitida debido a 'plate' vacío en índice ${index}`);
                return;
            }

            const outputLine = `${nlelemlistId};${plate.plate};${listId};${currentTimestamp};${plate.site};${currentTimestamp};3000-01-01T00:00:00.000`;
            fs.appendFileSync(formatFile, outputLine + "\n");
            nlelemlistId++;
        });

        ctx.status = 200;
        ctx.body = {
            message: `Archivo generado exitosamente en ${formatFile}`
        };
    } catch (error) {
        console.error("Error al generar el archivo:", error);
        ctx.status = 500;
        ctx.body = {
            error: "Error al generar el archivo."
        };
    }
});

module.exports = router;