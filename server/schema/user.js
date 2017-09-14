/* jshint indent: 2 */

export default function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: ''
    },
    password: {
      type: DataTypes.CHAR(128),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'user'
  });
};
