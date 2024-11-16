const Koa = require('koa');
const { koaBody } = require("koa-body");
const Logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const router = require('./routes');
const orm = require('./models');

const app = new Koa();
app.context.orm = orm;

app.use(koaBody());
app.use(bodyParser());
app.use(Logger());
app.use(router.routes());
app.use(router.allowedMethods());
app.use((ctx, next) => {
    ctx.body = "Hello World";
    next();
});

module.exports = app;