
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
    FaChartPie,
    FaTasks,
    FaProjectDiagram,
    FaSignOutAlt,
    FaChartLine,
    FaBars
} from "react-icons/fa";

function Layout({ children }) {

    const navigate = useNavigate();

    const location = useLocation();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const user =
        JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/");

    };

    const goToDashboard = () => {

        if (user?.role === "admin") {

            navigate("/admin-dashboard");

        }
        else {

            navigate("/member-dashboard");

        }

    };

    const navClass = (path) => {

        const active = location.pathname === path;

        return `
            flex items-center gap-4 px-4 py-4 rounded-2xl
            transition-all duration-300 w-full text-left
            ${
                active
                ? "bg-blue-600 text-white"
                : "hover:bg-white/10 text-zinc-300"
            }
        `;

    };


return (

    <div className="flex min-h-screen bg-zinc-950 text-white">

        {/* SIDEBAR */}
        <div className="w-[240px] bg-zinc-900 border-r border-white/10 flex flex-col p-6">

            {/* LOGO */}
            <div className="mb-12">

                <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">

                    TeamFlow

                </h1>

                <p className="text-zinc-400 mt-2 text-sm">
                    AI Productivity Platform
                </p>

            </div>

            {/* MENU */}
            <nav className="flex flex-col gap-5 mt-8">

                {/* DASHBOARD */}
                <button
                    onClick={goToDashboard}
                    className="flex items-center gap-4 w-full px-4 py-3 rounded-2xl bg-blue-600 transition-all text-left"
                >

                    <FaChartPie className="text-lg" />

                    <span className="font-medium text-lg">
                        Dashboard
                    </span>

                </button>

                {/* PROJECTS */}
                <button
                    onClick={() => navigate("/projects")}
                    className="flex items-center gap-4 w-full px-4 py-3 rounded-2xl hover:bg-white/10 transition-all text-left"
                >

                    <FaProjectDiagram className="text-lg" />

                    <span className="font-medium text-lg">
                        Projects
                    </span>

                </button>

                {/* TASKS */}
                <button
                    onClick={() => navigate("/tasks")}
                    className="flex items-center gap-4 w-full px-4 py-3 rounded-2xl hover:bg-white/10 transition-all text-left"
                >

                    <FaTasks className="text-lg" />

                    <span className="font-medium text-lg">
                        Tasks
                    </span>

                </button>

                {/* Profile */}
                <button
                    onClick={goToDashboard}
                    className="flex items-center gap-4 w-full px-4 py-3 rounded-2xl hover:bg-white/10 transition-all text-left"
                >

                    <FaChartLine className="text-lg" />

                    <span className="font-medium text-lg">
                        AProfile
                    </span>

                </button>

            </nav>

            {/* USER SECTION */}
            <div className="mt-auto">

                <div className="bg-zinc-800 border border-white/10 rounded-2xl p-4 mb-5">

                    <p className="text-zinc-400 text-sm mb-1">
                        Logged in as
                    </p>

                    <h3 className="font-semibold text-lg capitalize">
                        {user?.name}
                    </h3>

                    <p className="text-zinc-500 text-sm capitalize mt-1">
                        {user?.role}
                    </p>

                </div>

                {/* LOGOUT */}
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 transition-all rounded-2xl py-4 flex items-center justify-center gap-3 font-medium"
                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-zinc-950 via-black to-zinc-950">

            {children}

        </div>

    </div>

);

}
export default Layout;