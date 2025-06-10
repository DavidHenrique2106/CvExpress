const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

const pessoaRouter = require('./routes/pessoa');
const skillRouter = require('./routes/skill');
const formacaoRouter = require('./routes/formacao');
const experienciaRouter = require('./routes/experiencia');

// Criar um router para pessoas para montar as rotas aninhadas
const pessoasRouter = express.Router();

// Rotas básicas para /pessoas
pessoasRouter.use('/', pessoaRouter);

// Rotas aninhadas, já com o :id sendo passado
pessoasRouter.use('/:id/skill', skillRouter);
pessoasRouter.use('/:id/formacao', formacaoRouter);
pessoasRouter.use('/:id/experiencia', experienciaRouter);

// Montar no app
app.use('/pessoas', pessoasRouter);

module.exports = app;
