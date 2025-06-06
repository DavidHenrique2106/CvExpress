const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('Experiencia', {
    cargo: DataTypes.STRING,
    empresa: DataTypes.STRING,
    inicio: DataTypes.DATE,
    fim: DataTypes.DATE,
    pessoaId: DataTypes.INTEGER
  });
