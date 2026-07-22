import "./Features.css";
import {
  FaTruck,
  FaGem,
  FaLock,
  FaUndoAlt
} from "react-icons/fa";

export default function Features(){

const features=[

{
icon:<FaTruck/>,
title:"Free Shipping",
text:"Free delivery on orders above ₹1499"
},

{
icon:<FaGem/>,
title:"Premium Quality",
text:"Carefully selected luxury fashion"
},

{
icon:<FaLock/>,
title:"Secure Payment",
text:"100% secure online transactions"
},

{
icon:<FaUndoAlt/>,
title:"Easy Returns",
text:"7-Day hassle-free return policy"
}

];

return(

<section className="features">

{

features.map((item,index)=>(

<div
className="feature-card"
key={index}
>

<div className="feature-icon">

{item.icon}

</div>

<h3>

{item.title}

</h3>

<p>

{item.text}

</p>

</div>

))

}

</section>

);

}