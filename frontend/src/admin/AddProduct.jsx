import "./AddProduct.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

export default function AddProduct() {

    const navigate = useNavigate();

    const [product, setProduct] = useState({

        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        images: ""

    });

    async function saveProduct(e) {

        e.preventDefault();

        try {

            const data = {

                ...product,

                price: Number(product.price),
                stock: Number(product.stock),
                images: [product.images]

            };

            const res = await API.post(
                "/products/create",
                data
            );

            toast.success(res.data.message);

            navigate("/admin/products");

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Unable to add product"

            );

        }

    }

    return (

        <div className="addProduct">

            <h1>Add New Product</h1>

            <form onSubmit={saveProduct}>

                <input
                    placeholder="Product Name"
                    value={product.name}
                    onChange={(e)=>
                        setProduct({
                            ...product,
                            name:e.target.value
                        })
                    }
                />

                <textarea
                    placeholder="Description"
                    rows="5"
                    value={product.description}
                    onChange={(e)=>
                        setProduct({
                            ...product,
                            description:e.target.value
                        })
                    }
                />

                <select
                    value={product.category}
                    onChange={(e)=>
                        setProduct({
                            ...product,
                            category:e.target.value
                        })
                    }
                >

                    <option value="">
                        Select Category
                    </option>

                    <option>Kurtas</option>
                    <option>Gowns</option>
                    <option>Denim</option>
                    <option>Casual</option>
                    <option>Traditional</option>
                    <option>Abayas</option>
                    <option>Festive</option>
                    <option>Western</option>

                </select>

                <input
                    type="number"
                    placeholder="Price"
                    value={product.price}
                    onChange={(e)=>
                        setProduct({
                            ...product,
                            price:e.target.value
                        })
                    }
                />

                <input
                    type="number"
                    placeholder="Stock"
                    value={product.stock}
                    onChange={(e)=>
                        setProduct({
                            ...product,
                            stock:e.target.value
                        })
                    }
                />

                <input
                    placeholder="Image URL"
                    value={product.images}
                    onChange={(e)=>
                        setProduct({
                            ...product,
                            images:e.target.value
                        })
                    }
                />

                <button>

                    Save Product

                </button>

            </form>

        </div>

    );

}