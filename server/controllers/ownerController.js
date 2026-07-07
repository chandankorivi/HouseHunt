const Property = require("../models/PropertySchema");

const addProperty = async (req, res) => {

    const {
        title,
        location,
        listingType,
        price,
        description,
        images
    } = req.body;

    const property = await Property.create({
        title,
        location,
        listingType,
        price,
        description,
        images,
        owner: req.user._id
    });

    res.status(201).json({
        message: "Property added successfully",
        property
    });

};

const getMyProperties = async (req, res) => {

    const properties = await Property.find({
        owner: req.user._id
    });

    res.status(200).json({
        properties
    });

};

const getAllProperties = async (req, res) => {

    const properties = await Property.find({
        status: "available"
    });

    res.status(200).json({
        properties
    });

};

const getSingleProperty = async (req, res) => {

    const property = await Property.findById(req.params.id);

    if (!property) {
        return res.status(404).json({
            message: "Property not found"
        });
    }

    res.status(200).json({
        property
    });

};

const updateProperty = async (req, res) => {

    const { id } = req.params;

    const property = await Property.findById(id);

    if (!property) {
        return res.status(404).json({
            message: "Property not found"
        });
    }

    if (property.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            message: "Not Authorized"
        });
    }

    const {
        title,
        location,
        listingType,
        price,
        status,
        description,
        images
    } = req.body;

    property.title = title;
    property.location = location;
    property.listingType = listingType;
    property.price = price;
    property.status = status;
    property.description = description;
    property.images = images;

    await property.save();

    res.status(200).json({
        message: "Property Updated Successfully",
        property
    });

};

const deleteProperty = async (req, res) => {

    const { id } = req.params;

    const property = await Property.findById(id);

    if (!property) {
        return res.status(404).json({
            message: "Property not found"
        });
    }

    if (property.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            message: "Not Authorized"
        });
    }

    await property.deleteOne();

    res.status(200).json({
        message: "Property Deleted Successfully"
    });

};

module.exports = {
    addProperty,
    getMyProperties,
    getAllProperties,
    getSingleProperty,
    updateProperty,
    deleteProperty
};