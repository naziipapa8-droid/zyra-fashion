const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(

{

orderNumber:{

type:String,

required:true,

unique:true

},

user:{

type:mongoose.Schema.Types.ObjectId,

ref:"User",

required:true

},

items:[

{

product:{

type:mongoose.Schema.Types.ObjectId,

ref:"Product"

},

name:String,

image:String,

price:Number,

quantity:Number

}

],

address:{

name:String,

phone:String,

email:String,

house:String,

street:String,

city:String,

state:String,

pincode:String

},

paymentMethod:{

type:String,

enum:["cod","upi","card"],

default:"cod"

},

subtotal:{

type:Number,

required:true

},

shipping:{

type:Number,

required:true

},

total:{

type:Number,

required:true

},

status:{

type:String,

enum:[

"Pending",

"Processing",

"Shipped",

"Delivered",

"Cancelled"

],

default:"Processing"

}

},

{

timestamps:true

}

);

module.exports = mongoose.model(

"Order",

orderSchema

);