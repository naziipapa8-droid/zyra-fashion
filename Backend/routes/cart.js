const express =
require('express');

const router =
express.Router();

const Cart =
require('../models/Cart');


// ADD CART
router.post(
'/add',

async(req,res)=>{

try{

const cart =
await Cart.create(
req.body
);

res.send({

success:true,

cart

});

}

catch(error){

res.status(500).send({

success:false,

message:error.message

});

}

}

);


// GET CART
router.get(
'/',

async(req,res)=>{

const cart =
await Cart.find()
.populate(
'items.product'
);

res.send({

success:true,

cart

});

}

);


// DELETE CART
router.delete(
'/:id',

async(req,res)=>{

await Cart.findByIdAndDelete(
req.params.id
);

res.send({

success:true,

message:
'Removed'

});

}

);

module.exports =
router;