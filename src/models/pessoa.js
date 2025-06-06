const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('Pessoa', {
    nome: DataTypes.STRING,
    resumo: DataTypes.TEXT,
  });
