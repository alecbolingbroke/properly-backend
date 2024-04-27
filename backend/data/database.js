const Sequelize = require('sequelize');

// Database connection
const sequelize = new Sequelize("5750alecbolingbroke_examproject", "5750alecbolingbroke", "A02218071", {
    dialect: "mysql",
    host: "fadel-5750-sp23.ckm1cfmd3i4j.us-west-2.rds.amazonaws.com",
});


// Export sequelize and Sequelize objects
module.exports = { sequelize, Sequelize };