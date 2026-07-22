import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";
import OrderDetails from "./pages/OrderDetails";

import "./App.css";
import "./components/ProductCard.css";


import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import AdminProducts from "./admin/Products";
import AdminOrders from "./admin/Orders";
import Customers from "./admin/Customers";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import AdminOrderDetails from "./admin/OrderDetails";

function App() {
  return (
    <BrowserRouter>

     <Toaster
  position="top-right"
  reverseOrder={false}
  toastOptions={{
    duration: 2500,

    style: {
      background: "#101010",
      color: "#fff",
      border: "1px solid rgba(212,175,55,.35)",
      borderRadius: "18px",
      padding: "18px 20px",
      fontSize: "15px",
      boxShadow: "0 15px 35px rgba(0,0,0,.45)"
    },

    success: {
      iconTheme: {
        primary: "#d4af37",
        secondary: "#101010"
      }
    },

    error: {
      iconTheme: {
        primary: "#ff5b5b",
        secondary: "#101010"
      }
    }
  }}
/>

     <Routes>

  {/* Customer Website */}

  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/orders" element={<Orders />} />
  <Route path="/orders/:id" element={<OrderDetails />} />
  <Route path="/order-success" element={<OrderSuccess />} />



  {/* Admin Dashboard */}

  <Route path="/admin" element={<AdminLayout />}>

      <Route index element={<Dashboard />} />

      <Route
        path="products"
        element={<AdminProducts />}
      />

      <Route
        path="add-product"
        element={<AddProduct />}
      />

      <Route
        path="edit-product/:id"
        element={<EditProduct />}
      />

      <Route
        path="orders"
        element={<AdminOrders />}
      />

      <Route
        path="orders/:id"
        element={<AdminOrderDetails />}
      />

      <Route
        path="customers"
        element={<Customers />}
      />

  </Route>

</Routes>

    </BrowserRouter>
  );
}

export default App;