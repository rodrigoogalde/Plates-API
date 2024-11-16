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
    console.log(ctx);
    const { postMessage, params } = ctx.request.body;
    console.log('\n')
    console.log(ctx.req.body);  
    console.log('\n')
    console.log(ctx.request.body);

    // Reemplazar los placeholders con los valores del cuerpo
    let processedMessage = postMessage;
    if (params && typeof params === 'object') {
        for (const [key, value] of Object.entries(params)) {
            const placeholder = `{${key}}`; // Formato del placeholder
            processedMessage = processedMessage.replace(new RegExp(placeholder, 'g'), value);
        }
    }

    // Imprimir el mensaje procesado en la consola
    console.log('Mensaje procesado:', processedMessage);

    // Responder al cliente
    ctx.body = {
        message: 'Post Message procesado correctamente',
        postMessage: processedMessage,
    };


    ctx.body = {
        message: ctx.request.body
    };
});



// Exportamos el router con los endpoints de películas
module.exports = router;