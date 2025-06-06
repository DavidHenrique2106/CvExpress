const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('Skill', {
    nome: DataTypes.STRING,
    pessoaId: DataTypes.INTEGER
  });
