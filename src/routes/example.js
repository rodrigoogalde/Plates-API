const Router = require('koa-router');
const router = new Router();

router.post('/api', async (ctx) => {
  console.log(ctx.request.body);

  const {
    IDCOMP,
    IDCAM,
    PLT,
    DTE,
    CNF,
    IDNAME,
    IDLAN,
  } = ctx.request.body;

  try {
    const newEntry = await ctx.orm.Entry.create({
      id_computer: IDCOMP,
      id_camera: IDCAM,
      plate: PLT,
      timestamp: DTE,
      confidence: CNF,
      id_list: IDNAME,
      id_lane: IDLAN,
    });
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = {
      message: error
    };
    return;
  }

  ctx.status = 201;
  ctx.body = {
    message: 'Entry created'
  };
});

router.get('/api', async (ctx) => {
  try {
    const entries = await ctx.orm.Entry.findAll();
    ctx.body = entries;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
  }
})

module.exports = router;