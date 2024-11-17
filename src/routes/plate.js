const Router = require('koa-router');
const router = new Router();

const { Plate } = require('../models');

router.get('/api', async (ctx) => {
    try {
        // Obtiene todos los registros de la base de datos
        const plates = await Plate.findAll();

        // Responde con los registros obtenidos
        ctx.body = plates;
    } catch (error) {
        console.error(error);
        ctx.status = 500; // Internal Server Error
        ctx.body = { error: 'An error occurred while processing your request' };
    }
});


router.post('/api', async (ctx) => {
    try {
        // Obtén los datos del cuerpo de la solicitud
        const { IDCOMP, IDCAM, PLT, DTE, CNF, IDNAME, IDLAN } = ctx.request.body;

        // Valida que todos los datos requeridos estén presentes
        if (!IDCOMP || !IDCAM || !PLT || !DTE || !CNF || !IDNAME || !IDLAN) {
            ctx.status = 400; // Bad Request
            ctx.body = { error: 'Missing required fields' };
            return;
        }

        // Crea un nuevo registro en la base de datos
        const newPlate = await Plate.create({
            idcomp: IDCOMP,
            idcam: IDCAM,
            plt: PLT,
            dtf: DTE,
            cnf: parseFloat(CNF), // Convierte CNF a un número flotante
            idname: IDNAME,
            idlan: IDLAN,
        });

        // Responde con el registro creado
        ctx.status = 201; // Created
        ctx.body = {
            message: 'Plate created successfully',
            data: newPlate,
        };
    } catch (error) {
        console.error(error);
        ctx.status = 500; // Internal Server Error
        ctx.body = { error: 'An error occurred while processing your request' };
    }
});

module.exports = router;