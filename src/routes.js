const Router = require('koa-router');
const plates = require('./routes/plates');
const sites = require('./routes/sites');
const brands = require('./routes/brands');
const users = require('./routes/users');
const example = require('./routes/example');
const jwtMiddleware = require('koa-jwt');
const dotenv = require('dotenv');


dotenv.config();

const router = new Router();

router.use('/sites',  sites.routes());
router.use('/brands', brands.routes());
router.use('/users', users.routes());
router.use('/example', example.routes());

router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }));

router.use('/plates', plates.routes());

module.exports = router;