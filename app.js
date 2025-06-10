const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

const pessoaRouter = require('./src/routes/pessoa');
const skillRouter = require('./src/routes/skill');
const formacaoRouter = require('./src/routes/formacao');
const experienciaRouter = require('./src/routes/experiencia');

const pessoasRouter = express.Router();

pessoasRouter.use('/', pessoaRouter);
pessoasRouter.use('/:id/skill', skillRouter);
pessoasRouter.use('/:id/formacao', formacaoRouter);
pessoasRouter.use('/:id/experiencia', experienciaRouter);

app.use('/pessoas', pessoasRouter);

module.exports = app;
