const Router = require('koa-router');
const router = new Router();
const { generateFile, uploadToFtp } = require('../controller/plateController');

require("dotenv").config();

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
        await generateFile(ctx);
        await uploadToFtp(ctx);
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

router.put('/update/:id', async (ctx) => {
    try {
        const plate = await ctx.orm.Plate.findByPk(ctx.params.id);

        if (!plate) {
            ctx.status = 404;
            ctx.body = { message: 'Patente no encontrada' };
            return;
        }

        await plate.update(ctx.request.body);

        await generateFile(ctx);
        await uploadToFtp(ctx);

        ctx.status = 200;
        ctx.body = {
            message: 'Patente actualizada exitosamente',
            plate,
        };
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            message: 'Error al actualizar la patente',
            error,
        };
    }
});

router.delete('/delete/:id', async (ctx) => {
    try {
        const plate = await ctx.orm.Plate.findByPk(ctx.params.id);

        if (!plate) {
            ctx.status = 404;
            ctx.body = { message: 'Patente no encontrada' };
            return;
        }

        await plate.destroy();

        // Generar y subir los archivos actualizados
        await generateFile(ctx);
        await uploadToFtp(ctx);

        ctx.status = 200;
        ctx.body = {
            message: 'Patente eliminada exitosamente',
        };
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            message: 'Error al eliminar la patente',
            error,
        };
    }
});

module.exports = router;