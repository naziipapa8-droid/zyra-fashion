import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footerTop">

        <div className="footerLogo">
          <h2>Zyra Fashion</h2>
          <p>
            Curated luxury fashion for modern women.
            Discover timeless elegance and premium collections.
          </p>
        </div>

        <div className="footerLinks">
          <h3>Shop</h3>

          <Link to="/products">Kurtas</Link>
          <Link to="/products">Gowns</Link>
          <Link to="/products">Denim</Link>
          <Link to="/products">Casual & Everyday</Link>
          <Link to="/products">Traditional & Ethnic</Link>
          <Link to="/products">Abayas</Link>
          <Link to="/products">Festive</Link>
          <Link to="/products">Western</Link>

        </div>

        <div className="footerLinks">
          <h3>Company</h3>

          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>

        </div>

        <div className="footerSocial">

          <h3>Follow Us</h3>

          <div className="icons">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaPinterestP />
          </div>

        </div>

      </div>

      <div className="footerBottom">
        © 2026 Zyra Fashion. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;