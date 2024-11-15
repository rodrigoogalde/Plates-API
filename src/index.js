// src/index.js
const Koa = require('koa');
const Logger = require('koa-logger');

const bodyParser = require('koa-bodyparser');
// Importamos el router principal
const router = require('./routes');


const app = new Koa();
app.use(bodyParser());

app.use(Logger());

// Ahora el servidor utiliza el router principal
app.use(router.routes());

app.listen(3000);