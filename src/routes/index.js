// src/routes/index.js
const Router = require('koa-router');
// Importamos el router de películas
const movies = require('./plates');

const router = new Router();
// Conectamos el router de películas al router principal
router.use('/plates', movies.routes());

module.exports = router;