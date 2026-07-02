
const mongoose = require("mongoose");

const ProprtySchema = new mongoose.Schema({

    title : {
     type : String,
     required : true
    },

    location : {
        type : String,
        required : true
    },

    listingType : {
        type : String,
        required : true,
        enum:["rent","sale"]
    },

    price: {
    type: Number,
    required: true
},

    status: {
    type: String,
    enum: ["available", "sold"],
    default: "available"
},

    description : {
        type : String ,
        required : true
    },

    images:{
        type:[String],
        required:true
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

});

module.exports = mongoose.model("Property", ProprtySchema);