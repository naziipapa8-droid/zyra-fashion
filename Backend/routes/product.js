const express = require('express');

const router = express.Router();

const Product = require('../models/Product');


router.post('/create', async (req, res) => {

try {

const data = Array.isArray(req.body)
? req.body
: [req.body];

const products =
await Product.insertMany(
data
);

res.send({

success:true,

count:
products.length,

products

});

}

catch(error){

res.status(500).send({

success:false,

message:error.message

});

}

});

// GET ALL PRODUCTS

router.get('/', async(req,res)=>{

try{

const products =
await Product.find();

res.send({

success:true,

count:
products.length,

products

});

}

catch(error){

res.status(500).send({

success:false,

message:error.message

});

}

});

// SEARCH
router.get('/search/:keyword', async(req,res)=>{

try{

const products =
await Product.find({

name:{
$regex:req.params.keyword,
$options:'i'
}

});

res.send({

success:true,

products

});

}

catch(error){

res.status(500).send({

success:false,

message:error.message

});

}

});


// GET ONE
router.get('/:id', async(req,res)=>{

const product =
await Product.findById(
req.params.id
);

res.send({

success:true,

product

});

});


// UPDATE
router.put("/:id", async (req,res)=>{

    try{

        const product = await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            {new:true}

        );

        res.send({

            success:true,

            product,

            message:"Product Updated"

        });

    }

    catch(err){

        res.status(500).send({

            success:false,

            message:err.message

        });

    }

});
// DELETE ALL

router.delete(
"/delete-all",

async(req,res)=>{

try{

await Product.deleteMany({});

res.send({

success:true,

message:
"All Products Deleted"

});

}

catch(error){

res.status(500).send({

success:false,

message:error.message

});

}

});


// DELETE PRODUCTS BY CATEGORY

router.delete('/category/:category', async (req, res) => {

  try {

    const result = await Product.deleteMany({
      category: req.params.category
    });

    res.send({
      success: true,
      message: `${result.deletedCount} products deleted`,
      deletedCount: result.deletedCount
    });

  } catch (error) {

    res.status(500).send({
      success: false,
      message: error.message
    });

  }

});



// DELETE
router.delete('/:id', async(req,res)=>{

try{

await Product.findByIdAndDelete(
req.params.id
);

res.send({

success:true,

message:'Product Deleted'

});

}

catch(error){

res.status(500).send({

success:false,

message:error.message

});

}

});

module.exports = router;