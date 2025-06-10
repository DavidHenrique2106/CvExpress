const Pessoa = require('./Pessoa')(sequelize);
const Skill = require('/Skill')(sequelize)
const Experiencia = require('./experiencia')(sequelize);
const Formacao = require('./formacao')(sequelize);

Pessoa.hasMany(Skill, { foreignKey: 'pessoaId' });
Skill.belongsTo(Pessoa, { foreignKey: 'pessoaId' });

Pessoa.hasMany(Experiencia, { foreignKey: 'pessoaId' });
Experiencia.belongsTo(Pessoa, { foreignKey: 'pessoaId' });

Pessoa.hasMany(Formacao, { foreignKey: 'pessoaId' });
Formacao.belongsTo(Pessoa, { foreignKey: 'pessoaId' });

module.exports = {
  Pessoa,
  Skill,
  Experiencia,
  Formacao,
  sequelize
};
