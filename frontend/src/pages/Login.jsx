import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({

        email: "",

        password: ""

    });

    async function handleLogin(e) {

    e.preventDefault();

    console.log("Button clicked");
    console.log(form);

    try{

        const res = await API.post("/auth/login", form);

        console.log("API Response:", res.data);

        login(res.data.user, res.data.token);

        toast.success(`✨ Welcome back, ${res.data.user.name}`);

        navigate("/");

    }

    

        catch(err){

            toast.error(err.response?.data?.message || "Login Failed");

        }

    }

    return(
        

        <div className="loginPage">

            <form
            className="loginBox"
            onSubmit={handleLogin}
            >

                <h1>Welcome Back</h1>

                <p>Login to Zyra Fashion</p>

                <input

                type="email"

                placeholder="Email"

                value={form.email}

                onChange={(e)=>

                setForm({

                    ...form,

                    email:e.target.value

                })

                }

                />

                <input

                type="password"

                placeholder="Password"

                value={form.password}

                onChange={(e)=>

                setForm({

                    ...form,

                    password:e.target.value

                })

                }

                />

                <button type="submit">
                         Login
                </button>

                <span>

                    Don't have an account?

                    <Link to="/register">

                        Register

                    </Link>

                </span>

            </form>

        </div>
        

    )

}

export default Login;