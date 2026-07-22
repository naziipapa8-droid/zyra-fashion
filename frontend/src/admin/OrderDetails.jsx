import "./OrderDetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

export default function OrderDetails() {

    const { id } = useParams();

    const [order, setOrder] = useState(null);

    const [status, setStatus] = useState("");

    useEffect(() => {

        loadOrder();

    }, []);

    async function loadOrder() {

        try {

            const res = await API.get(`/orders/${id}`);

            setOrder(res.data.order);

            setStatus(res.data.order.status);

        }

        catch {

            toast.error("Unable to load order");

        }

    }

    async function updateStatus() {

        try {

            await API.put(`/orders/status/${id}`, {

                status

            });

            toast.success("Order Updated");

            loadOrder();

        }

        catch {

            toast.error("Update Failed");

        }

    }

    if (!order) {

        return <h2 style={{color:"white"}}>Loading...</h2>;

    }

    return (

        <div className="orderDetails">

            <h1>

                Order #{order.orderNumber}

            </h1>

            <div className="detailGrid">

                <div className="card">

                    <h2>Customer</h2>

                    <p><b>Name :</b> {order.address.name}</p>

                    <p><b>Phone :</b> {order.address.phone}</p>

                    <p><b>Email :</b> {order.address.email}</p>

                </div>

                <div className="card">

                    <h2>Shipping Address</h2>

                    <p>{order.address.house}</p>

                    <p>{order.address.street}</p>

                    <p>{order.address.city}</p>

                    <p>{order.address.state}</p>

                    <p>{order.address.pincode}</p>

                </div>

            </div>

            <div className="productsCard">

                <h2>Ordered Products</h2>

                {

                    order.items.map(item=>(

                        <div

                            className="productRow"

                            key={item._id}

                        >

                            <img

                                src={item.image}

                                alt={item.name}

                            />

                            <div>

                                <h3>{item.name}</h3>

                                <p>

                                    ₹ {item.price}

                                </p>

                                <p>

                                    Qty : {item.quantity}

                                </p>

                            </div>

                        </div>

                    ))

                }

            </div>

            <div className="summaryCard">

                <h2>Payment Summary</h2>

                <p>

                    <b>Payment :</b>

                    {order.paymentMethod.toUpperCase()}

                </p>

                <p>

                    <b>Subtotal :</b>

                    ₹ {order.subtotal}

                </p>

                <p>

                    <b>Shipping :</b>

                    ₹ {order.shipping}

                </p>

                <h2>

                    Total : ₹ {order.total}

                </h2>

            </div>

            <div className="statusCard">

                <h2>Update Status</h2>

                <select

                    value={status}

                    onChange={(e)=>

                        setStatus(e.target.value)

                    }

                >

                    <option>Processing</option>

                    <option>Shipped</option>

                    <option>Out For Delivery</option>

                    <option>Delivered</option>

                    <option>Cancelled</option>

                </select>

                <button

                    onClick={updateStatus}

                >

                    Save Changes

                </button>

            </div>

        </div>

    );

}