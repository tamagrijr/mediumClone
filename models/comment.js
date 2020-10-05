'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    body: {
        type: DataTypes.TEXT
    },
    userId: {
        type: DataTypes.INTEGER
    },
    storyId: {
        type: DataTypes.INTEGER
    }
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, { foreignKey: "userId" });
    Comment.belongsTo(models.Story, { foreignKey: "storyId" });
  };
  return Comment;
};
