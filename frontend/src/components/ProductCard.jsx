import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { addToCart } from "../slices/cartSlice";

import "./ProductCard.css";

import {
  FaHeart,
  FaStar,
  FaEye,
  FaShoppingBag,
} from "react-icons/fa";

function ProductCard({ product }) {

  const dispatch = useDispatch();

  function handleAddToCart() {

    dispatch(addToCart(product));

    toast.success(`🛍️ ${product.name} added to your bag`);

  }

  return (

    <div className="card">

      <Link
        to={`/product/${product._id}`}
        className="productLink"
      >

        <div className="imgBox">

          <img
            src={product.images?.[0]}
            alt={product.name}
          />

          <span className="badge">
            NEW
          </span>

        </div>

      </Link>

      <div className="info">

        <small>{product.category}</small>

        <h3>{product.name}</h3>

        <div className="stars">

          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />

        </div>

        <p>{product.description}</p>

        <div className="bottom">

          <h2>₹ {product.price}</h2>

          <span className="stock">
            {product.stock} Left
          </span>

        </div>

        <div className="overlayButtons">

          <button>

            <FaEye />

            Quick View

          </button>

          <button onClick={handleAddToCart}>

            <FaShoppingBag />

            Add To Cart

          </button>

        </div>

      </div>

    </div>

  );

}

export default ProductCard;