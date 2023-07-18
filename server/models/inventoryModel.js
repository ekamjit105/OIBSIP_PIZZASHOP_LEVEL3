const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema(
    {
        name:{type : String
        },
        variants:[],
        prices:[],
        varqty:[],
    },
);

const inventoryModel = mongoose.model("inventory", inventorySchema);
module.exports = inventoryModel;
