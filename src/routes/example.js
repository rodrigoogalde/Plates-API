const Router = require('koa-router');
const router = new Router();

router.post('/api', async (ctx) => {
  console.log(ctx.request.body);

  const {
    id_computer,
    id_camera,
    plate,
    timestamp,
    confidence,
    id_list,
    id_lane,
  } = ctx.request.body;

  try {
    const newEntry = await ctx.orm.Entry.create({
      id_computer,
      id_camera,
      plate,
      timestamp,
      confidence,
      id_list,
      id_lane,
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
    message: ctx.request.body
  };
});

module.exports = router;