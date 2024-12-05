const Router = require('koa-router');
const router = new Router();

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


module.exports = router;