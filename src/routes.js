const Router = require('koa-router');
const plates = require('./plates');

const router = new Router();

router.use('/plates', plates.routes());