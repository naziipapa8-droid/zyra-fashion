const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// ============================
// CREATE ORDER
// ============================

router.post("/create", async (req, res) => {

  try {

    const {

      user,

      items,

      address,

      paymentMethod,

      subtotal,

      shipping,

      total

    } = req.body;

    console.log("USER ID:", user);

    const orderNumber =
      "ZYR" +
      Date.now().toString().slice(-8);

    const order = await Order.create({

      orderNumber,

      user,

      items,

      address,

      paymentMethod,

      subtotal,

      shipping,

      total,

      status: "Processing"

    });

    res.status(201).send({

      success: true,

      message: "Order Placed Successfully",

      order

    });

  }

  catch (err) {

    res.status(500).send({

      success: false,

      message: err.message

    });

  }

});

// ============================
// GET ALL ORDERS
// ============================

router.get("/", async (req, res) => {

  try {

    const orders = await Order.find()

      .sort({ createdAt: -1 });

    res.send({

      success: true,

      orders

    });

  }

  catch (err) {

    res.status(500).send({

      success: false,

      message: err.message

    });

  }

});


// DASHBOARD STATS

router.get("/dashboard", async (req, res) => {

    try {

        const totalOrders = await Order.countDocuments();

        const revenue = await Order.aggregate([

            {
                $group: {
                    _id: null,
                    total: { $sum: "$total" }
                }
            }

        ]);

        const recentOrders = await Order
            .find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.send({

            success: true,

            totalOrders,

            revenue:
                revenue.length > 0
                    ? revenue[0].total
                    : 0,

            recentOrders

        });

    }

    catch (err) {

        res.status(500).send({

            success: false,
            message: err.message

        });


        // =====================================
// GET CUSTOMERS
// =====================================

router.get("/customers/all", async (req, res) => {

    try {

        const customers = await Order.aggregate([

            {
                $group: {

                    _id: "$address.email",

                    name: { $first: "$address.name" },

                    phone: { $first: "$address.phone" },

                    email: { $first: "$address.email" },

                    orders: { $sum: 1 },

                    totalSpent: { $sum: "$total" },

                    lastOrder: { $max: "$createdAt" }

                }

            },

            {
                $sort: {

                    totalSpent: -1

                }

            }

        ]);

        res.send({

            success: true,

            customers

        });

    }

    catch (err) {

        res.status(500).send({

            success: false,

            message: err.message

        });

    }

});



// ============================
// GET SINGLE ORDER
// ============================

router.get("/:id", async (req, res) => {

  try {

    const order = await Order.findById(

      req.params.id

    );

    if (!order) {

      return res.status(404).send({

        success: false,

        message: "Order not found"

      });

    }

    res.send({

      success: true,

      order

    });

  }

  catch (err) {

    res.status(500).send({

      success: false,

      message: err.message

    });

  }

});


    }

});

router.put("/status/:id", async (req,res)=>{

    try{

        const order = await Order.findByIdAndUpdate(

            req.params.id,

            {

                status:req.body.status

            },

            {

                new:true

            }

        );

        res.send({

            success:true,

            order,

            message:"Status Updated"

        });

    }

    catch(err){

        res.status(500).send({

            success:false,

            message:err.message

        });

    }

});

module.exports = router;