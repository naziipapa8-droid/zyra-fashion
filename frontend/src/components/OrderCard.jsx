import { Link } from "react-router-dom";
import "./OrderCard.css";

function OrderCard({ order }) {

  function statusColor(status) {

    switch (status) {

      case "Pending":
        return "pending";

      case "Processing":
        return "processing";

      case "Shipped":
        return "shipped";

      case "Delivered":
        return "delivered";

      default:
        return "cancelled";

    }

  }

  return (

    <div className="orderCard">

      <div className="orderImage">

        <img

          src={order.items[0]?.image}

          alt={order.items[0]?.name}

        />

      </div>

      <div className="orderInfo">

        <div className="orderTop">

          <h2>

            {order.items[0]?.name}

          </h2>

          <span

            className={`status ${statusColor(order.status)}`}

          >

            {order.status}

          </span>

        </div>

        <p>

          <strong>Order ID :</strong>

          {order.orderNumber}

        </p>

        <p>

          <strong>Date :</strong>

          {new Date(order.createdAt).toLocaleDateString()}

        </p>

        <p>

          <strong>Payment :</strong>

          {order.paymentMethod.toUpperCase()}

        </p>

        <p>

          <strong>Total :</strong>

          ₹ {order.total}

        </p>

        <Link

          className="viewBtn"

          to={`/orders/${order._id}`}

        >

          View Details

        </Link>

      </div>

    </div>

  );

}

export default OrderCard;