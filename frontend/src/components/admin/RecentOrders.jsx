import "./RecentOrders.css";

const orders=[

{

id:"#ZY1001",

customer:"Aisha",

total:"₹3499",

status:"Delivered"

},

{

id:"#ZY1002",

customer:"Nazia",

total:"₹2199",

status:"Processing"

},

{

id:"#ZY1003",

customer:"Sara",

total:"₹4999",

status:"Shipped"

},

{

id:"#ZY1004",

customer:"Fatima",

total:"₹2899",

status:"Pending"

}

];

export default function RecentOrders(){

return(

<div className="recentCard">

<h2>

Recent Orders

</h2>

{

orders.map(order=>(

<div

className="recentItem"

key={order.id}

>

<div>

<h4>

{order.id}

</h4>

<p>

{order.customer}

</p>

</div>

<div>

<h4>

{order.total}

</h4>

<span>

{order.status}

</span>

</div>

</div>

))

}

</div>

);

}