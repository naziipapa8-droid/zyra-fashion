import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";


import "./Checkout.css";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";
import { clearCart } from "../slices/cartSlice";

function Checkout() {

const location = useLocation();
const buyNowProduct = location.state?.buyNowProduct;


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

 const reduxCart = useSelector(
  state => state.cart.cartItems
);

const cartItems = buyNowProduct
  ? [buyNowProduct]
  : reduxCart;

  const subtotal = cartItems.reduce(

    (total, item) => total + item.price * item.quantity,

    0

  );

  const shipping = subtotal > 1499 ? 0 : 99;

  const total = subtotal + shipping;

  const [payment, setPayment] = useState("cod");

  const [address, setAddress] = useState({

    name: "",
    phone: "",
    email: "",
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: ""

  });

  async function placeOrder() {

    if (!user) {

  toast.error("Please login to place your order");

  navigate("/login");

  return;

}


    if (cartItems.length === 0) {

      toast.error("Your cart is empty");

      return;

    }

    if (

      !address.name ||
      !address.phone ||
      !address.email ||
      !address.house ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.pincode

    ) {

      toast.error("Please fill all delivery details");

      return;

    }

    try {

     const orderData = {

  user: user?._id,

  items: cartItems.map(item => ({

    product: item._id,

    name: item.name,

    image: item.images[0],

    price: item.price,

    quantity: item.quantity

  })),

  address,

  paymentMethod: payment,

  subtotal,

  shipping,

  total

};

    console.log("Order Data:", orderData);
      const res = await API.post(

        "/orders/create",

        orderData

      );

      toast.success(res.data.message);

      dispatch(clearCart());

      navigate("/order-success");

    }

    catch (err) {

      console.log(err);

      toast.error(

        err.response?.data?.message ||

        "Order Failed"

      );

    }

  }

  return (

    <div className="checkout">

      <div className="checkoutLeft">

        <h1>Checkout</h1>

        <div className="section">

          <h2>Delivery Address</h2>

          <input
            placeholder="Full Name"
            value={address.name}
            onChange={(e) =>
              setAddress({
                ...address,
                name: e.target.value
              })
            }
          />

          <input
            placeholder="Phone Number"
            value={address.phone}
            onChange={(e) =>
              setAddress({
                ...address,
                phone: e.target.value
              })
            }
          />

          <input
            placeholder="Email"
            value={address.email}
            onChange={(e) =>
              setAddress({
                ...address,
                email: e.target.value
              })
            }
          />

          <input
            placeholder="House / Apartment"
            value={address.house}
            onChange={(e) =>
              setAddress({
                ...address,
                house: e.target.value
              })
            }
          />

          <input
            placeholder="Street"
            value={address.street}
            onChange={(e) =>
              setAddress({
                ...address,
                street: e.target.value
              })
            }
          />

          <div className="row">

            <input
              placeholder="City"
              value={address.city}
              onChange={(e) =>
                setAddress({
                  ...address,
                  city: e.target.value
                })
              }
            />

            <input
              placeholder="State"
              value={address.state}
              onChange={(e) =>
                setAddress({
                  ...address,
                  state: e.target.value
                })
              }
            />

          </div>

          <input
            placeholder="Pincode"
            value={address.pincode}
            onChange={(e) =>
              setAddress({
                ...address,
                pincode: e.target.value
              })
            }
          />

        </div>

        <div className="section">

          <h2>Payment Method</h2>

          <label>

            <input
              type="radio"
              checked={payment === "cod"}
              onChange={() => setPayment("cod")}
            />

            Cash On Delivery

          </label>

          <label>

            <input
              type="radio"
              checked={payment === "upi"}
              onChange={() => setPayment("upi")}
            />

            UPI

          </label>

          <label>

            <input
              type="radio"
              checked={payment === "card"}
              onChange={() => setPayment("card")}
            />

            Credit / Debit Card

          </label>

          {

            payment === "upi" &&

            <div className="paymentBox">

              <input placeholder="Enter UPI ID" />

            </div>

          }

          {

            payment === "card" &&

            <div className="paymentBox">

              <input placeholder="Card Number" />

              <div className="row">

                <input placeholder="MM/YY" />

                <input placeholder="CVV" />

              </div>

              <input placeholder="Card Holder Name" />

            </div>

          }

        </div>

      </div>

      <div className="checkoutRight">

        <h2>Order Summary</h2>

        {

          cartItems.map(item => (

            <div

              className="summaryItem"

              key={item._id}

            >

              <img

                src={item.images[0]}

                alt={item.name}

              />

              <div>

                <h3>{item.name}</h3>

                <p>

                  ₹ {item.price} × {item.quantity}

                </p>

              </div>

            </div>

          ))

        }

        <div className="priceRow">

          <span>Subtotal</span>

          <span>₹ {subtotal}</span>

        </div>

        <div className="priceRow">

          <span>Shipping</span>

          <span>

            {shipping === 0 ? "FREE" : `₹ ${shipping}`}

          </span>

        </div>

        <hr />

        <div className="totalRow">

          <span>Total</span>

          <h2>₹ {total}</h2>

        </div>

        <button

          className="placeBtn"

          onClick={placeOrder}

        >

          Place Order

        </button>

      </div>

    </div>

  );

}

export default Checkout;