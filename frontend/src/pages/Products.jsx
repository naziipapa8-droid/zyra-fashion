import { useSearchParams } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import SkeletonCard from "../components/SkeletonCard";
import { useEffect, useMemo, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import "./Products.css";

function Products() {

 const [products, setProducts] = useState([]);

const [searchParams] = useSearchParams();

const category = searchParams.get("category") || "All";

const [active, setActive] = useState(category);

const [search, setSearch] = useState("");
const [sort, setSort] = useState("default");
const [loading, setLoading] = useState(true);

useEffect(() => {
  loadProducts();
}, []);

useEffect(() => {
  setActive(category);
}, [category]);

useEffect(() => {

  const selected = searchParams.get("category") || "All";

  setActive(selected);

}, [searchParams]);

 async function loadProducts(){

    try{

        const res = await API.get("/products");

        setProducts(res.data.products);

    }

    catch(err){

        console.log(err);

    }

    finally{

        setLoading(false);

    }

}

  const categories = [
    "All",
    "Kurtas",
    "Gowns",
    "Denim",
    "Casual",
    "Traditional",
    "Abayas",
    "Festive",
    "Western"
  ];

  const filtered = useMemo(() => {

    let data = [...products];

    // Category Filter
    if (active !== "All") {
      data = data.filter(
        item => item.category === active
      );
    }

    // Search
    if (search) {
      data = data.filter(item =>
        item.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Sorting
    if (sort === "low") {
      data.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      data.sort((a, b) => b.price - a.price);
    }

    if (sort === "az") {
      data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return data;

  }, [products, active, search, sort]);

 return (



    <div className="products">

      {/* Hero */}

      <section className="hero">

        <p>Luxury Collection</p>

        <h1>Discover Your Style</h1>

        <span>
          Curated Women's Fashion For Every Occasion
        </span>

      </section>

      {/* Search + Sort */}

      <div className="filterBar">

        <input
          type="text"
          placeholder="Search your favourite style..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort Products</option>
          <option value="low">Price : Low → High</option>
          <option value="high">Price : High → Low</option>
          <option value="az">A → Z</option>
        </select>

      </div>

      {/* Categories */}

      <div className="tabs">

        {categories.map((cat) => (

          <button
            key={cat}
            className={active === cat ? "active" : ""}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>

        ))}

      </div>

      {/* Count */}

      <div className="topInfo">

        <h2>{filtered.length} Collections Found</h2>

      </div>

      {/* Products */}

      <div className="grid">

        {loading ? (

          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))

        ) : (

          filtered.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))

        )}

      </div>

    </div>



);


}

export default Products;