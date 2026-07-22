const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const auth = require('../middleware/auth');



// ================= REGISTER =================

router.post(
'/register',

async (req, res) => {

try {

const {
name,
email,
password
} = req.body;


const existing =
await User.findOne({
email
});


if (existing) {

return res.status(400).send({

success:false,

message:'Email already exists'

});

}


const hashed =
await bcrypt.hash(
password,
10
);


const user =
await User.create({

name,

email,

password:hashed

});


res.send({

success:true,

message:'User created',

user

});

}

catch (error) {

console.log(error);

res.status(500).send({

success:false,

message:error.message

});

}

}

);



// ================= LOGIN =================

router.post(

'/login',

async (req, res) => {

try {

const {
email,
password
} = req.body;


const user =
await User.findOne({
email
});


if (!user) {

return res.status(404).send({

success:false,

message:'User not found'

});

}


const match =
await bcrypt.compare(

password,

user.password

);


if (!match) {

return res.status(400).send({

success:false,

message:'Wrong Password'

});

}


const token =
jwt.sign(

{

id:user._id,

email:user.email

},

process.env.JWT_SECRET,

{

expiresIn:'7d'

}

);


console.log(token);

console.log(
process.env.JWT_SECRET
);


res.send({

  success: true,

  message: "Login Success",

  token,

  user: {

    _id: user._id,

    name: user.name,

    email: user.email,

    role: user.role

  }

});

}

catch (error) {

console.log(error);

res.status(500).send({

success:false,

message:error.message

});

}

}

);



// ================= PROFILE =================

router.get(

'/profile',

auth,

(req, res) => {

res.send({

success:true,

user:req.user

});

}

);



module.exports = router;