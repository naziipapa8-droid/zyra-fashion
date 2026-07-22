import "./RevenueChart.css";

export default function RevenueChart(){

const months=[

40,
75,
55,
90,
65,
120,
95,
130

];

return(

<div className="chartCard">

<h2>

Revenue Overview

</h2>

<div className="bars">

{

months.map((height,index)=>(

<div

key={index}

className="bar"

style={{

height:`${height*2}px`

}}

>

<span>

₹{height}K

</span>

</div>

))

}

</div>

</div>

);

}