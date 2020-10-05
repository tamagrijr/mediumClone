'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    followingId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Follow.associate = function(models) {
    // associations can be defined here
    //todo followingId --> user.id
    Follow.belongsTo(models.User, { foreignKey: 'followerId' })
    //todo followerId --> user.id
    Follow.belongsTo(models.User, { foreignKey: 'followingId' })
  };
  return Follow;
};