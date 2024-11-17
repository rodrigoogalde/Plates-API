const Router = require('koa-router');
const router = new Router();

router.post('/api', (ctx) => {
    console.log(ctx.request.body);

    ctx.body = {
        message: ctx.request.body
    };
});

module.exports = router;