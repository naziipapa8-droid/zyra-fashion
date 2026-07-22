import "./Newsletter.css";

function Newsletter() {
  return (
    <section className="newsletter">
      <div className="newsletter-content">

        <span>JOIN OUR COMMUNITY</span>

        <h2>
          Get 10% OFF Your First Purchase
        </h2>

        <p>
          Be the first to know about new arrivals,
          exclusive collections and member-only offers.
        </p>

        <div className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
          />

          <button>
            Subscribe
          </button>
        </div>

      </div>
    </section>
  );
}

export default Newsletter;