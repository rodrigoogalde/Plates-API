// src/routes/movies.js
const Router = require('koa-router');
const router = new Router();

// Metodo GET para obtener todas las películas
router.get('/', (ctx) => {
  ctx.body = 'GET /nothing';
});

router.get('/paramsStandard', (ctx) => {
    console.log(ctx.query);
    ctx.body = {
        message: ctx.query
    };
});

router.get('/paramsExtracted', (ctx) => {
  // Obtener los parámetros de la consulta
  const {
    plate,
    time,
    cam,
    conf,
    lane,
    list
  } = ctx.query;

  // Imprimir los parámetros en la consola
  console.log('Parámetros recibidos:');
  console.log('Número de placa (plate):', plate);
  console.log('Marca de tiempo (time):', time);
  console.log('Identificador de cámara (cam):', cam);
  console.log('Confianza (conf):', conf);
  console.log('Carril (lane):', lane);
  console.log('Lista de identificadores (list):', list);

  // Responder al cliente
  ctx.body = {
    message: 'Parámetros recibidos correctamente',
    data: {
      plate,
      time,
      cam,
      conf,
      lane,
      list,
    },
  };
});

router.post('/api', (ctx) => {
    console.log(ctx.request.body);

    ctx.body = {
        message: ctx.request.body
    };
});



// Exportamos el router con los endpoints de películas
module.exports = router;