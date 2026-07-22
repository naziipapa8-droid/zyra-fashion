const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

try {

const authHeader =
req.headers.authorization;

if (!authHeader) {

return res.status(401).send({
success:false,
message:'Token Missing'
});

}

const token =
authHeader.replace(
'Bearer ',
''
);

const decoded =
jwt.verify(
token,
process.env.JWT_SECRET
);

req.user =
decoded;

next();

}

catch(error){

console.log(error);

return res.status(401).send({

success:false,

message:error.message

});

}

};