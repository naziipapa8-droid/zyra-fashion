import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";

import "./Login.css";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    name: "",
    email: "",
    password: ""

  });

  async function handleRegister(e) {

    e.preventDefault();

    if (!form.name || !form.email || !form.password) {

      toast.error("Please fill all fields");

      return;

    }

    try {

      const res = await API.post(

        "/auth/register",

        form

      );

      toast.success(res.data.message);

      navigate("/login");

    }

    catch (err) {

      toast.error(

        err.response?.data?.message ||

        "Registration Failed"

      );

    }

  }

  return (

    <div className="loginPage">

      <form
        className="loginBox"
        onSubmit={handleRegister}
      >

        <h1>Create Account</h1>

        <p>Join Zyra Fashion</p>

        <input

          type="text"

          placeholder="Full Name"

          value={form.name}

          onChange={(e) =>

            setForm({

              ...form,

              name: e.target.value

            })

          }

        />

        <input

          type="email"

          placeholder="Email"

          value={form.email}

          onChange={(e) =>

            setForm({

              ...form,

              email: e.target.value

            })

          }

        />

        <input

          type="password"

          placeholder="Password"

          value={form.password}

          onChange={(e) =>

            setForm({

              ...form,

              password: e.target.value

            })

          }

        />

        <button type="submit">

          Register

        </button>

        <span>

          Already have an account?

          <Link to="/login">

            Login

          </Link>

        </span>

      </form>

    </div>

  );

}

export default Register;