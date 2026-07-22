import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import OrderCard from "../components/OrderCard";

import "./Orders.css";

function Orders() {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadOrders();

  }, []);

  async function loadOrders() {

    try {

      const res = await API.get("/orders");

      setOrders(res.data.orders);

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setLoading(false);

    }

  }

  return (

    <>

      <Navbar />

      <div className="ordersPage">

        <h1>

          My Orders

        </h1>

        <p>

          Track every purchase from Zyra Fashion

        </p>

        {

          loading ?

          <h2>

            Loading Orders...

          </h2>

          :

          orders.length === 0 ?

          <div className="emptyOrders">

            <h2>

              No Orders Yet

            </h2>

          </div>

          :

          <div className="ordersGrid">

            {

              orders.map(order => (

                <OrderCard

                  key={order._id}

                  order={order}

                />

              ))

            }

          </div>

        }

      </div>

      <Footer />

    </>

  );

}

export default Orders;