const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(

    {
        name:{type:String,
        required:true,
        },
        email:{type:String,
        required:true,
        },
        userId:{type:String,
        required:true,
        },
        orderItems:[],
        orderAmount:{type:String,
        required:true,
        },
        isDelivered:{type:Boolean,
        default:false
        },
        transactionId:{type:String,
        required:true,
        },


    },
    { timestamps: true }



)



const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
