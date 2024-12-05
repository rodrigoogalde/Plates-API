const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
    const sites = await ctx.orm.Site.findAll();
    ctx.body = sites;
  }
);

router.post('/', async (ctx) => {
  // Check if already exists
  const site = await ctx.orm.Site.findOne({
    where: {
      name: ctx.request.body.name
    }
  });

  if (site) {
    ctx.status = 400;
    ctx.body = {
      message: 'El sitio ya existe'
    };
    return;
  }
  
  try {
    const newSite = await ctx.orm.Site.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = newSite;
  }
  catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: error
    };
  }
});

router.delete('/:id', async (ctx) => {
  const site = await ctx.orm.Site.findByPk(ctx.params.id);

  if (!site) {
    ctx.status = 404;
    ctx.body = {
      message: 'El sitio no existe'
    };
    return;
  }

  await site.destroy();
  ctx.status = 200;
  ctx.body = {
    message: 'El sitio ha sido eliminado'
  };
});

module.exports = router;