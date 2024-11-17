// src/routes/index.js
const Router = require('koa-router');
// Importamos el router de películas
const movies = require('./plate');

const router = new Router();
// Conectamos el router de películas al router principal
router.use('/plate', movies.routes());

module.exports = router;