import "./Customers.css";
import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function Customers(){

const [customers,setCustomers]=useState([]);

const [loading,setLoading]=useState(true);

const [search,setSearch]=useState("");

useEffect(()=>{

loadCustomers();

},[]);

async function loadCustomers(){

try{

const res=await API.get("/orders/customers/all");

setCustomers(res.data.customers);

}

catch{

toast.error("Unable to load customers");

}

finally{

setLoading(false);

}

}

const filtered=customers.filter(item=>

item.name.toLowerCase().includes(search.toLowerCase())||

item.email.toLowerCase().includes(search.toLowerCase())||

item.phone.includes(search)

);

return(

<div className="customers">

<div className="customerHeader">

<h1>Customers</h1>

<input

placeholder="Search Customer..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

</div>

<table>

<thead>

<tr>

<th>Name</th>

<th>Email</th>

<th>Phone</th>

<th>Orders</th>

<th>Total Spent</th>

<th>Last Order</th>

</tr>

</thead>

<tbody>

{

loading ?

<tr>

<td colSpan="6">

Loading...

</td>

</tr>

:

filtered.map(customer=>(

<tr key={customer.email}>

<td>{customer.name}</td>

<td>{customer.email}</td>

<td>{customer.phone}</td>

<td>{customer.orders}</td>

<td>

₹ {customer.totalSpent}

</td>

<td>

{

new Date(

customer.lastOrder

).toLocaleDateString()

}

</td>

</tr>

))

}

</tbody>

</table>

</div>

);

}