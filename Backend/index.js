require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use(
'/api/welcome',
require('./routes/welcome')
);

try{

app.use(
'/api/auth',
require('./routes/auth')
);

}

catch(err){

console.log(err);

}

app.use(
'/api/products',
require('./routes/product')
);

app.use(
'/api/cart',
require('./routes/cart')
);

app.use(
'/api/orders',
require('./routes/order')
);


mongoose.connect(
'mongodb+srv://Naziya:Naziya321@cluster0.a5m4ows.mongodb.net/fashionMarketplace?retryWrites=true&w=majority'
)

.then(() => {
console.log('Db connected');
})

.catch((error) => {
console.log(error);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});