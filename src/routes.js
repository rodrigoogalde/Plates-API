const Router = require('koa-router');
const plates = require('./routes/plates');

const router = new Router();

router.use('/plates', plates.routes());

module.exports = router;