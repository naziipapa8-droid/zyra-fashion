import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./OrderDetails.css";

function OrderDetails() {

  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {

    loadOrder();

  }, []);

  async function loadOrder() {

    try {

      const res = await API.get(`/orders/${id}`);

      setOrder(res.data.order);

    }

    catch(err){

      console.log(err);

    }

  }

  if(!order){

    return <h1 className="loading">Loading Order...</h1>;

  }

  return(

    <>

      <Navbar/>

      <div className="orderDetails">

        <h1>

          Order Details

        </h1>

        <div className="topSection">

          <div>

            <h3>Order Number</h3>

            <p>{order.orderNumber}</p>

          </div>

          <div>

            <h3>Status</h3>

            <span className="status">

              {order.status}

            </span>

          </div>

          <div>

            <h3>Payment</h3>

            <p>

              {order.paymentMethod.toUpperCase()}

            </p>

          </div>

          <div>

            <h3>Total</h3>

            <p>

              ₹ {order.total}

            </p>

          </div>

        </div>

        <div className="timeline">

          <div className="active">

            ✓ Order Placed

          </div>

          <div className="line"></div>

          <div className={

            order.status==="Processing" ||

            order.status==="Shipped" ||

            order.status==="Delivered"

            ?

            "active"

            :

            ""

          }>

            ✓ Processing

          </div>

          <div className="line"></div>

          <div className={

            order.status==="Shipped" ||

            order.status==="Delivered"

            ?

            "active"

            :

            ""

          }>

            ✓ Shipped

          </div>

          <div className="line"></div>

          <div className={

            order.status==="Delivered"

            ?

            "active"

            :

            ""

          }>

            ✓ Delivered

          </div>

        </div>

        <div className="products">

          {

            order.items.map(item=>(

              <div

                className="product"

                key={item.product}

              >

                <img

                  src={item.image}

                  alt={item.name}

                />

                <div>

                  <h2>{item.name}</h2>

                  <p>

                    Quantity : {item.quantity}

                  </p>

                  <h3>

                    ₹ {item.price}

                  </h3>

                </div>

              </div>

            ))

          }

        </div>

        <div className="address">

          <h2>

            Delivery Address

          </h2>

          <p>{order.address.name}</p>

          <p>{order.address.phone}</p>

          <p>

            {order.address.house},

            {order.address.street}

          </p>

          <p>

            {order.address.city},

            {order.address.state}

          </p>

          <p>{order.address.pincode}</p>

        </div>

      </div>

      <Footer/>

    </>

  );

}

export default OrderDetails;