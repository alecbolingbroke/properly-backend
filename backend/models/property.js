const { Sequelize, sequelize } = require('../data/database');
const User = require('./user');

// Properties model specifying address, description, price, listingType, listingDate, listingStatus, taxID, and imageUrl
const Property = sequelize.define("property", {
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    listingType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    listingDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    listingStatus: {
        type: Sequelize.STRING,
        allowNull: false
    },
    propertyTaxId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Property;