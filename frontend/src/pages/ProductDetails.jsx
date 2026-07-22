import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import API from "../services/api";
import { addToCart } from "../slices/cartSlice";

import "./ProductDetails.css";

function ProductDetails() {

  const navigate = useNavigate();

  const { id } = useParams();

  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data.product);
    } catch (err) {
      console.log(err);
    }
  }

  function handleAddToCart() {

    dispatch(addToCart(product));

    toast.success(`🛍️ ${product.name} added to your bag`);

    console.log("Added:", product);

  }

  if (!product) {
    return (
      <div className="loading">
        Loading Product...
      </div>
    );
  }

  return (
    

    <div className="productDetails">

      <div className="productLeft">

        <img
          src={product.images?.[0]}
          alt={product.name}
        />

      </div>

      <div className="productRight">

        <span className="category">
          {product.category}
        </span>

        <h1>{product.name}</h1>

        <div className="rating">
          ⭐⭐⭐⭐⭐ (4.9)
        </div>

        <h2>₹ {product.price}</h2>

        <p>{product.description}</p>

        <h4>
          Stock : {product.stock}
        </h4>

        <div className="buttons">

          <button
            className="cartBtn"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>

         <button
  className="buyBtn"
  onClick={() =>
    navigate("/checkout", {
      state: {
        buyNowProduct: {
          ...product,
          quantity: 1,
        },
      },
    })
  }
>
  Buy Now
</button>

        </div>

      </div>

    </div>
    

  );

}

export default ProductDetails;