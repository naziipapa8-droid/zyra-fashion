import "./Products.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import API from "../services/api";
import toast from "react-hot-toast";

export default function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {

        try {

            const res = await API.get("/products");

            setProducts(res.data.products);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    }

    async function deleteProduct(id) {

        if (!window.confirm("Delete this product?")) return;

        try {

            await API.delete(`/products/${id}`);

            toast.success("Product Deleted");

            loadProducts();

        }

        catch {

            toast.error("Delete Failed");

        }

    }

    const filtered = products.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="adminProducts">

            <div className="productsHeader">

                <h1>Products</h1>

                <Link
                    to="/admin/add-product"
                    className="addBtn"
                >
                    <FaPlus />
                    Add Product
                </Link>

            </div>

            <div className="searchBox">

                <FaSearch />

                <input
                    type="text"
                    placeholder="Search Products..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>

            <table>

                <thead>

                    <tr>

                        <th>Image</th>

                        <th>Name</th>

                        <th>Category</th>

                        <th>Price</th>

                        <th>Stock</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        loading ?

                            <tr>

                                <td colSpan="6">

                                    Loading...

                                </td>

                            </tr>

                            :

                            filtered.map(product => (

                                <tr key={product._id}>

                                    <td>

                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                        />

                                    </td>

                                    <td>{product.name}</td>

                                    <td>{product.category}</td>

                                    <td>₹ {product.price}</td>

                                    <td>{product.stock}</td>

                                    <td>

                                        <Link
                                            to={`/admin/edit-product/${product._id}`}
                                            className="editBtn"
                                        >

                                            <FaEdit />

                                        </Link>

                                        <button
                                            className="deleteBtn"
                                            onClick={() =>
                                                deleteProduct(product._id)
                                            }
                                        >

                                            <FaTrash />

                                        </button>

                                    </td>

                                </tr>

                            ))

                    }

                </tbody>

            </table>

        </div>

    );

}