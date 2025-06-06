const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Currículo API',
      version: '1.0.0',
      description: 'API para cadastro de currículos com Pessoa, Experiência, Formação e Skills',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Troque pelo link do Vercel depois, se quiser
      },
    ],
  },
  apis: ['./src/routes/*.js'], // ou onde estão suas rotas
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
