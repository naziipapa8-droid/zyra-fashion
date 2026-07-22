import "./EditProduct.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

export default function EditProduct() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState({

        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        images: ""

    });

    useEffect(() => {

        loadProduct();

    }, []);

    async function loadProduct() {

        try {

            const res = await API.get(`/products/${id}`);

            const p = res.data.product;

            setProduct({

                name: p.name,
                description: p.description,
                category: p.category,
                price: p.price,
                stock: p.stock,
                images: p.images[0]

            });

        }

        catch {

            toast.error("Unable to load product");

        }

    }

    async function updateProduct(e) {

        e.preventDefault();

        try {

            await API.put(`/products/${id}`,{

                ...product,

                price:Number(product.price),

                stock:Number(product.stock),

                images:[product.images]

            });

            toast.success("Product Updated");

            navigate("/admin/products");

        }

        catch{

            toast.error("Update Failed");

        }

    }

    return(

        <div className="editProduct">

            <h1>Edit Product</h1>

            <form onSubmit={updateProduct}>

                <input

                    value={product.name}

                    onChange={(e)=>

                        setProduct({

                            ...product,

                            name:e.target.value

                        })

                    }

                />

                <textarea

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

                    value={product.stock}

                    onChange={(e)=>

                        setProduct({

                            ...product,

                            stock:e.target.value

                        })

                    }

                />

                <input

                    value={product.images}

                    onChange={(e)=>

                        setProduct({

                            ...product,

                            images:e.target.value

                        })

                    }

                />

                <button>

                    Update Product

                </button>

            </form>

        </div>

    );

}