import "./CategorySection.css";
import { Link } from "react-router-dom";

const categories = [

{
title:"Kurtas",
image:"https://images.unsplash.com/photo-1609748106043-0e89cc9f285e?w=800"
},

{
title:"Gowns",
image:"https://images.unsplash.com/photo-1756483511246-12ae36997a1b?w=800"
},

{
title:"Denim",
image:"https://images.unsplash.com/photo-1587155471946-9e8d4d1132fa?w=800"
},

{
title:"Casual",
image:"https://images.unsplash.com/photo-1651828855150-ba40f6870a53?w=800"
},

{
title:"Traditional",
image:"https://images.unsplash.com/photo-1700212176001-0a9c60d40529?w=800"
},

{
title:"Abayas",
image:"https://images.unsplash.com/photo-1728487235101-664d87965931?w=800"
},

{
title:"Festive",
image:"https://images.unsplash.com/photo-1753981031189-27bb7bd1c079?w=800"
},

{
title:"Western",
image:"https://images.unsplash.com/photo-1612462170107-fbd9f3bda126?w=800"
}

];

export default function CategorySection(){

return(

<section className="categorySection">

<h2>SHOP BY COLLECTION</h2>

<div className="categoryGrid">

{

categories.map((item,index)=>(

<div
className="categoryCard"
key={index}
>

<img
src={item.image}
alt={item.title}
/>

<div className="overlay">

<h3>{item.title}</h3>

<Link
to={`/products?category=${encodeURIComponent(item.title)}`}
>

<button className="exploreBtn">

Explore

</button>

</Link>

</div>

</div>

))

}

</div>

</section>

);

}