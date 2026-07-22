import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  increaseQty,
  decreaseQty,
  removeFromCart
} from "../slices/cartSlice";

import "./Cart.css";

function Cart() {

  const navigate=useNavigate();

  const dispatch = useDispatch();

  const cartItems = useSelector(
    state => state.cart.cartItems
  );

  const subtotal = cartItems.reduce(

    (total, item) =>

      total + item.price * item.quantity,

    0

  );

  const shipping = subtotal > 1499 ? 0 : 99;

  const total = subtotal + shipping;

  if (cartItems.length === 0) {

    return (

      <div className="emptyCart">

        <h1>Your Cart is Empty</h1>

        <p>Add beautiful collections to your bag.</p>

      </div>

    );

  }

  return (
    

    <div className="cartPage">

      <div className="cartLeft">

        <h1>Shopping Bag</h1>

        {

          cartItems.map(item => (

            <div
              className="cartCard"
              key={item._id}
            >

              <img
                src={item.images[0]}
                alt={item.name}
              />

              <div className="cartInfo">

                <h2>{item.name}</h2>

                <p>{item.category}</p>

                <h3>₹ {item.price}</h3>

                <div className="qty">

                  <button

                    onClick={() =>

                      dispatch(
                        decreaseQty(item._id)
                      )

                    }

                  >

                    -

                  </button>

                  <span>

                    {item.quantity}

                  </span>

                  <button

                    onClick={() =>

                      dispatch(
                        increaseQty(item._id)
                      )

                    }

                  >

                    +

                  </button>

                </div>

                <button

                  className="removeBtn"

                  onClick={() =>

                    dispatch(
                      removeFromCart(item._id)
                    )

                  }

                >

                  Remove

                </button>

              </div>

            </div>

          ))

        }

      </div>

      <div className="summary">

        <h2>Order Summary</h2>

        <div>

          <span>Subtotal</span>

          <span>₹ {subtotal}</span>

        </div>

        <div>

          <span>Shipping</span>

          <span>

            {shipping === 0 ? "FREE" : `₹ ${shipping}`}

          </span>

        </div>

        <hr />

        <div className="total">

          <span>Total</span>

          <span>₹ {total}</span>

        </div>

        <button
onClick={()=>navigate("/checkout")}
>

Proceed To Checkout

</button>

      </div>

    </div>

    

  );

}

export default Cart;