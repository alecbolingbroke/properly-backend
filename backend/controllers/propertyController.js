const Property = require("../models/property");

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.status(200).json(properties);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all active properties
const getAllActiveProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({
      // Active status assumes to still be on market
      where: { listingStatus: "Active" },
    });
    res.status(200).json(properties);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get property by id
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) {
      return res.status(200).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create property
const createProperty = async (req, res) => {
  try {
    const newProperty = await Property.create(req.body);
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Buy property
const buyProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) {
      return res.status(200).json({ message: "Property not found" });
    }
    if (property.listingStatus === "Sold") {
      return res.status(200).json({ message: "Property already sold" });
    }
    const updatedProperty = await property.update({ listingStatus: "Sold" });
    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Update property
const updateProperty = async (req, res) => {
  try {
    const [rowsUpdated] = await Property.update(req.body, {
      where: { id: req.params.id },
    });
    if (!rowsUpdated) {
      return res.status(200).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) {
      return res.status(200).json({ message: "Property not found" });
    }
    await property.destroy();
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllProperties,
  getAllActiveProperties,
  getPropertyById,
  createProperty,
  buyProperty,
  updateProperty,
  deleteProperty,
};
