const Router = require('koa-router');
const router = new Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();


router.post('/login', async (ctx) => {
    const expirationSeconds = 60 * 60 * 24 * 30;
    const JWT_SECRET = process.env.JWT_SECRET;

    var token = jwt.sign({
        scope: ['none']
    }, JWT_SECRET, {
        expiresIn: expirationSeconds
    });

    ctx.body = {
        token: token
    };
});

module.exports = router;