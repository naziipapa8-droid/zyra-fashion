import "./Admin.css";

import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";

import { Outlet } from "react-router-dom";

export default function AdminLayout(){

return(

<div className="adminLayout">

<Sidebar/>

<div className="adminMain">

<Topbar/>

<div className="adminContent">

<Outlet/>

</div>

</div>

</div>

);

}