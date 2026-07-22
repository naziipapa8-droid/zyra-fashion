import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

import "./OrderSuccess.css";

function OrderSuccess() {

  return (

    <div className="successPage">

      <div className="successCard">

        <FaCheckCircle className="successIcon"/>

        <h1>Order Placed Successfully!</h1>

        <p>

          Thank you for shopping with Zyra Fashion.

        </p>

        <p>

          Your order has been received and is being processed.

        </p>

        <div className="buttons">

          <Link
            to="/orders"
            className="primaryBtn"
          >
            View Orders
          </Link>

          <Link
            to="/products"
            className="secondaryBtn"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>

  );

}

export default OrderSuccess;