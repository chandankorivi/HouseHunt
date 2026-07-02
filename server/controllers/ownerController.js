
const Property = require("../models/PropertySchema");

const addProperty = async (req, res) => {

    const {title,location,listingType,price,description,images}=req.body;

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

const getMyProperties = async (req,res) => {
    const properties = await Property.find({
        owner : req.user._id
    });

    res.status(200).json({
        properties
    });
};

const updateProperty = async (req,res) => {

    const { id } = req.params;

const property = await Property.findById(id);

if (!property) {
    return res.status(404).json({
        message: "Property not found"
    });
}

if (property.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({
        message: "You are not authorized to update this property"
    });
}

const updatedProperty = await Property.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
);

res.status(200).json({
    message: "Property updated successfully",
    updatedProperty
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
        message: "You are not authorized to delete this property"
    });
}

await Property.findByIdAndDelete(id);

res.status(200).json({
    message: "Property deleted successfully"
});

};


module.exports = { addProperty,getMyProperties,updateProperty,deleteProperty};