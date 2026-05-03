import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:5000/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            if (response.data.user.role === "admin") {

                navigate("/admin-dashboard");

            } else {

                navigate("/member-dashboard");

            }

        } catch (error) {

            console.log(error);

            alert("Invalid email or password");

        }

    };

    return (

        <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center px-6 overflow-hidden relative">

            {/* BACKGROUND GLOW */}
            <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl top-[-200px] right-[-100px]" />

            <div className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl bottom-[-150px] left-[-100px]" />

            {/* MAIN CARD */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-6xl bg-white rounded-[40px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2"
            >

                {/* LEFT SIDE */}
                <div className="bg-gradient-to-br from-purple-600 to-blue-500 p-14 text-white flex flex-col justify-between relative overflow-hidden">

                    {/* FLOATING CIRCLES */}
                    <motion.div
                        animate={{
                            y: [0, -20, 0]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity
                        }}
                        className="absolute w-40 h-40 bg-white/10 rounded-full top-[-40px] right-[-40px]"
                    />

                    <motion.div
                        animate={{
                            y: [0, 20, 0]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity
                        }}
                        className="absolute w-72 h-72 bg-white/10 rounded-full bottom-[-120px] left-[-100px]"
                    />

                    <div className="relative z-10">

                        <p className="uppercase tracking-[6px] text-sm text-white/80 mb-6">
                            TeamFlow AI
                        </p>

                        <h1 className="text-6xl font-bold leading-tight">
                            Manage work smarter.
                        </h1>

                        <p className="text-lg text-white/80 mt-8 leading-relaxed max-w-md">
                            AI-powered productivity platform for modern teams,
                            collaboration, workflow management, and task tracking.
                        </p>

                    </div>

                    {/* FEATURES */}
                    <div className="relative z-10 space-y-5 mt-14">

                        <motion.div
                            whileHover={{ x: 6 }}
                            className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/10"
                        >

                            <h3 className="font-semibold text-lg">
                                Smart Task Management
                            </h3>

                            <p className="text-sm text-white/70 mt-2">
                                Organize tasks, projects, and team workflows efficiently.
                            </p>

                        </motion.div>

                        <motion.div
                            whileHover={{ x: 6 }}
                            className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/10"
                        >

                            <h3 className="font-semibold text-lg">
                                AI Productivity Insights
                            </h3>

                            <p className="text-sm text-white/70 mt-2">
                                Improve performance using intelligent workflow analytics.
                            </p>

                        </motion.div>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="p-14 flex flex-col justify-center bg-white">

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >

                        <h2 className="text-5xl font-bold text-gray-900">
                            Welcome back
                        </h2>

                        <p className="text-gray-500 mt-4 text-lg">
                            Login to continue your workflow.
                        </p>

                        <form
                            onSubmit={handleLogin}
                            className="mt-10 space-y-6"
                        >

                            <div>

                                <label className="text-sm font-medium text-gray-700 block mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                            </div>

                            <div>

                                <label className="text-sm font-medium text-gray-700 block mb-2">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition-all"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-4 rounded-2xl font-semibold shadow-lg"
                            >
                                Login to TeamFlow
                            </motion.button>

                        </form>

                        <p className="text-gray-500 text-center mt-8">

                            Don’t have an account?{" "}

                            <Link
                                to="/signup"
                                className="text-purple-600 font-semibold hover:text-purple-700"
                            >
                                Create Account
                            </Link>

                        </p>

                    </motion.div>

                </div>

            </motion.div>

        </div>

    );

}

export default LoginPage;