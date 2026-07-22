import "./Dashboard.css";

import {

FaRupeeSign,
FaShoppingBag,
FaBoxOpen,
FaUsers

} from "react-icons/fa";

import StatCard from "../components/admin/StatCard";

import RevenueChart from "../components/admin/RevenueChart";

import RecentOrders from "../components/admin/RecentOrders";

export default function Dashboard(){

return(

<>

<h1 className="pageTitle">

Dashboard

</h1>

<div className="statsGrid">

<StatCard

title="Revenue"

value="₹8,46,520"

icon={<FaRupeeSign/>}

color="#D4AF37"

/>

<StatCard

title="Orders"

value="384"

icon={<FaShoppingBag/>}

color="#4CAF50"

/>

<StatCard

title="Products"

value="118"

icon={<FaBoxOpen/>}

color="#2196F3"

/>

<StatCard

title="Customers"

value="952"

icon={<FaUsers/>}

color="#E91E63"

/>

</div>

<div className="dashboardGrid">

<RevenueChart/>

<RecentOrders/>

</div>

</>

);

}