const Router = require('koa-router');
const router = new Router();

// Obtener todas las marcas
router.get('/', async (ctx) => {
    try {
        const brands = await ctx.orm.Brand.findAll();
        ctx.status = 200;
        ctx.body = brands;
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            message: 'Error al obtener las marcas',
            error,
        };
    }
});

// Crear una nueva marca
router.post('/', async (ctx) => {
    try {
        // Verificar si la marca ya existe
        const brandExists = await ctx.orm.Brand.findOne({
            where: { name: ctx.request.body.name },
        });

        if (brandExists) {
            ctx.status = 400;
            ctx.body = {
                message: 'La marca ya existe',
            };
            return;
        }

        const newBrand = await ctx.orm.Brand.create(ctx.request.body);
        ctx.status = 201;
        ctx.body = newBrand;
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            message: 'Error al crear la marca',
            error,
        };
    }
});

// Actualizar una marca
router.put('/:id', async (ctx) => {
    try {
        const brand = await ctx.orm.Brand.findByPk(ctx.params.id);

        if (!brand) {
            ctx.status = 404;
            ctx.body = {
                message: 'La marca no existe',
            };
            return;
        }

        await brand.update(ctx.request.body);
        ctx.status = 200;
        ctx.body = {
            message: 'La marca ha sido actualizada exitosamente',
            brand,
        };
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            message: 'Error al actualizar la marca',
            error,
        };
    }
});

// Eliminar una marca
router.delete('/:id', async (ctx) => {
    try {
        const brand = await ctx.orm.Brand.findByPk(ctx.params.id);

        if (!brand) {
            ctx.status = 404;
            ctx.body = {
                message: 'La marca no existe',
            };
            return;
        }

        await brand.destroy();
        ctx.status = 200;
        ctx.body = {
            message: 'La marca ha sido eliminada exitosamente',
        };
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            message: 'Error al eliminar la marca',
            error,
        };
    }
});

module.exports = router;
