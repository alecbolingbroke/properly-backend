const User = require("./user");
const Property = require("./property");
const Post = require("./post");

// Define associations between models
const associateModels = () => {
  // Define association between User and Property models
  User.hasMany(Property, { foreignKey: "userId" });
  Property.belongsTo(User, { foreignKey: "userId" });
  User.hasMany(Post, { foreignKey: "authorId", as: "author" });
  Post.belongsTo(User, { foreignKey: "authorId", as: "author" });
};

module.exports = associateModels;
