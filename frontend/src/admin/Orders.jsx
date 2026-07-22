import "./Orders.css";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

export default function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    useEffect(() => {
        loadOrders();
    }, []);

    async function loadOrders() {

        try {

            const res = await API.get("/orders");

            setOrders(res.data.orders);

        } catch {

            toast.error("Unable to load orders");

        } finally {

            setLoading(false);

        }

    }

    const filteredOrders = useMemo(() => {

        return orders.filter(order => {

            const matchesSearch =

                order.orderNumber
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||

                order.address?.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||

                order.address?.phone
                    ?.includes(search);

            const matchesStatus =

                status === "All"

                    ? true

                    : order.status === status;

            return matchesSearch && matchesStatus;

        });

    }, [orders, search, status]);

    return (

        <div className="adminOrders">

            <div className="ordersHeader">

                <h1>Orders Management</h1>

                <input
                    placeholder="Search Order..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />

            </div>

            <div className="filterButtons">

                {
                    ["All","Processing","Shipped","Delivered","Cancelled"]

                    .map(item=>(

                        <button

                            key={item}

                            className={
                                status===item ? "active":""
                            }

                            onClick={()=>setStatus(item)}

                        >

                            {item}

                        </button>

                    ))
                }

            </div>

            <table>

                <thead>

                    <tr>

                        <th>Order</th>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Payment</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        loading ?

                        (

                            <tr>

                                <td colSpan="8">

                                    Loading...

                                </td>

                            </tr>

                        )

                        :

                        filteredOrders.map(order=>(

                            <tr key={order._id}>

                                <td>{order.orderNumber}</td>

                                <td>{order.address?.name}</td>

                                <td>{order.address?.phone}</td>

                                <td>{order.paymentMethod}</td>

                                <td>₹ {order.total}</td>

                                <td>

                                    <span

                                        className={`badge ${order.status}`}

                                    >

                                        {order.status}

                                    </span>

                                </td>

                                <td>

                                    {

                                        new Date(

                                            order.createdAt

                                        ).toLocaleDateString()

                                    }

                                </td>

                                <td>

                                    <Link

                                        className="viewBtn"

                                        to={`/admin/orders/${order._id}`}

                                    >

                                        View

                                    </Link>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}