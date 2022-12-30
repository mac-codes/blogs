const { model, DataTypes } = require('sequelize');
const Sequelize = require('../config/connection');
class comment extends model {}
comment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  comment_text: {
    type: DataTypes.STRING,
    validate: {
      len: [3]
    }
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'post',
      key: 'id'
    }
  }
} , {
  Sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'comment'
});

model.exports = comment;