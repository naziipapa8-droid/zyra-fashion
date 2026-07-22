import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-overlay"></div>

      <div className="hero-content">

        <span className="hero-tag">
          NEW ARRIVALS • PREMIUM COLLECTION
        </span>

        <h1>
          Style Beyond
          <br />
          Fashion
        </h1>

        <p>
          Discover timeless elegance with handcrafted collections
          designed for modern women.
        </p>

        <div className="hero-buttons">

          <button className="shop-btn">
            Shop Collection
          </button>

          <button className="lookbook-btn">
            Explore Lookbook
          </button>

        </div>

      </div>

    </section>
  );
}