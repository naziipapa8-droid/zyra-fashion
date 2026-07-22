import "./Sidebar.css";
import { NavLink } from "react-router-dom";

import {
    FaChartPie,
    FaBoxOpen,
    FaShoppingBag,
    FaUsers,
    FaSignOutAlt
} from "react-icons/fa";

export default function Sidebar() {

    return (

        <aside className="sidebar">

            <div className="logo">

                <h1>Zyra</h1>

                <span>Fashion Admin</span>

            </div>

            <nav>

                <NavLink to="/admin">

                    <FaChartPie />

                    Dashboard

                </NavLink>

                <NavLink to="/admin/products">

                    <FaBoxOpen />

                    Products

                </NavLink>

                <NavLink to="/admin/orders">

                    <FaShoppingBag />

                    Orders

                </NavLink>

                <NavLink to="/admin/customers">

                    <FaUsers />

                    Customers

                </NavLink>

            </nav>
            <NavLink to="/admin/add-product">

Add Product

</NavLink>

            <button className="logoutBtn">

                <FaSignOutAlt />

                Logout

            </button>

        </aside>

    );

}