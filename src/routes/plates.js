
const Router = require('koa-router');
const router = new Router();

router.post('/api', (ctx) => {
    console.log(ctx);
    const { postMessage, params } = ctx.request.body;

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

module.exports = router;