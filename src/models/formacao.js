const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('Formacao', {
    instituicao: DataTypes.STRING,
    curso: DataTypes.STRING,
    conclusao: DataTypes.DATE,
    pessoaId: DataTypes.INTEGER
  });
