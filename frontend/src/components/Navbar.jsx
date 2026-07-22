import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  FaShoppingBag,
  FaHeart,
  FaSearch,
  FaUser,
} from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";

import "./Navbar.css";

function Navbar() {

  const { user, logout } = useContext(AuthContext);

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    function handleScroll() {

      if (window.scrollY > 60) {

        setScrolled(true);

      } else {

        setScrolled(false);

      }

    }

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

  }, []);

  return (

    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>

      <div className="logo">

        <Link to="/" className="logoLink">

          <h1>Zyra Fashion</h1>

          <span>CURATED. ELEGANT. YOU.</span>

        </Link>

      </div>

      <nav>

        <Link to="/">Home</Link>

        <Link to="/products">Shop</Link>

        <Link to="/products">Categories</Link>

        <Link to="/products">New Arrivals</Link>

        <Link to="/products">Offers</Link>

      </nav>

      <div className="navIcons">

        <FaSearch className="icon"/>

        <FaHeart className="icon"/>

        <Link
          to="/cart"
          className="cartIcon"
        >

          <FaShoppingBag className="icon"/>

          {

            cartItems.length > 0 && (

              <span className="cartBadge">

                {cartItems.length}

              </span>

            )

          }

        </Link>

        {

          user ?

          (

            <div className="userSection">

              <span className="userName">

                <FaUser/>

                {user.name}

              </span>

              <button
                className="logoutBtn"
                onClick={logout}
              >

                Logout

              </button>

            </div>

          )

          :

          (

            <Link
              to="/login"
              className="loginBtn"
            >

              <FaUser/>

              Login

            </Link>

          )

        }

      </div>

    </header>

  );

}

export default Navbar;