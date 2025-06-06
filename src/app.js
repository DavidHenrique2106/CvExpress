const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan('dev')); 

const pessoaRouter = require('./routes/pessoa');
const skillRouter = require('./routes/skill');
const formacaoRouter = require('./routes/formacao');
const experienciaRouter = require('./routes/experiencia');

app.use('/pessoas', pessoaRouter);

app.use('/pessoas/:id/Skill', skillRouter);
app.use('/pessoas/:id/formacao', formacaoRouter);
app.use('/pessoas/:id/experiencia', experienciaRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
