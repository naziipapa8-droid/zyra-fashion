import "./Topbar.css";

import {

FaBell,
FaSearch

} from "react-icons/fa";

export default function Topbar(){

return(

<header className="topbar">

<div className="search">

<FaSearch/>

<input
placeholder="Search..."
/>

</div>

<div className="topbarRight">

<FaBell className="bell"/>

<div className="adminProfile">

<img
src="https://i.pravatar.cc/100"
alt=""
/>

<div>

<h4>Nazia</h4>

<p>Administrator</p>

</div>

</div>

</div>

</header>

);

}