// checkAssociations.js

const { sequelize } = require("../data/database");
const associateModels = require("../models/associations");
const User = require("../models/user");
const Property = require("../models/property");
const Post = require("../models/post");

// Set up associations
associateModels();

// Sync the sequelize instance to make sure the associations are in the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");

    // Check if associations are properly set up
    console.log("User has many Posts:", User.associations.posts);
    console.log("Post belongs to User:", Post.associations.user);
    console.log("User has many Properties:", User.associations.properties);
    console.log("Property belongs to User:", Property.associations.user);
  })
  .catch((error) => {
    console.error("Failed to sync the database:", error);
  });
