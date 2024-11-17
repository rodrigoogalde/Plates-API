const Router = require('koa-router');
const movies = require('./plates');

const router = new Router();
router.use('/plates', movies.routes());

module.exports = router;