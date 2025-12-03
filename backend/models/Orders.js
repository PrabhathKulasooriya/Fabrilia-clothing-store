import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    products : {
        type : Array
    },
    total : {
        type : Number
    },
    date : {
        type : Date,
        default : Date.now
    }
});

const Orders = mongoose.model("Orders", OrderSchema);

export default Orders