const Router = require('koa-router');
const plates = require('./routes/plates');
const sites = require('./routes/sites');
const brands = require('./routes/brands');

const router = new Router();

router.use('/plates', plates.routes());
router.use('/sites',  sites.routes());
router.use('/brands', brands.routes());

module.exports = router;