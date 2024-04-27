const { sequelize } = require("../data/database.js");
const associateModels = require("../models/associations");
const {
  usersData,
  propertiesData,
  postsData,
} = require("../data/dummyData.json");
const User = require("../models/user");
const Property = require("../models/property");
const Post = require("../models/post");

// Call the associateModels function
associateModels();

// Function to populate database with dummy data
const populateDatabase = async () => {
  try {
    // Sync models with database
    await sequelize.sync({ force: true });
    console.log("Database & tables created!");

    // Insert dummy users
    const users = await User.bulkCreate(usersData);
    console.log("Dummy users inserted successfully");

    // Assign userIds to properties
    const propertiesWithUserIds = propertiesData.map((property, index) => ({
      ...property,
      userId: users[index % users.length].id, // Assign userId from dummy users so that all properties have a userId
    }));
    // Insert dummy properties with associated users
    await Property.bulkCreate(propertiesWithUserIds);
    console.log("Dummy properties inserted successfully");

    // Insert dummy posts
    await Post.bulkCreate(postsData);
    console.log("Dummy posts inserted successfully");
  } catch (error) {
    console.error("Error populating database with dummy data:", error);
  }
};

// Call the populateDatabase function
populateDatabase();
