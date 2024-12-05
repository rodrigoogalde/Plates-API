const Koa = require('koa');
const Logger = require('koa-logger');
const { koaBody } = require("koa-body");
const bodyParser = require('koa-bodyparser');
const router = require('./routes');
const KoaLogger = require('koa-logger');
const orm = require('./models')
const cors = require('@koa/cors');

const app = new Koa();

app.context.orm = orm

app.use(cors());

app.use(KoaLogger());
app.use(koaBody());

app.use(bodyParser());
app.use(Logger());
app.use(router.routes());

app.use((ctx, next) => {
    ctx.body = "API FastPass Plates";
});
  
module.exports = app;