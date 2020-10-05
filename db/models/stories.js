'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    title: {
      allowNull: false,
      type: DataTypes.STRING(255)},
    body: {
      allowNull: false,
      type: DataTypes.TEXT,},
    authorId: {
      allowNull:false,
      type: DataTypes.INTEGER},
  }, {});
  Story.associate = function(models) {
    // associations can be defined here
    Story.belongsTo(models.User, { foreignKey: "authorId" });
    Story.hasMany(models.Bookmark, { foreignKey: "storyId" });
    Story.hasMany(models.Like, { foreignKey: "storyId" });
    Story.hasMany(models.Comment, { foreignKey: "storyId" });
  };
  return Story;
};
