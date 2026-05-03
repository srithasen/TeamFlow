import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

import { useEffect, useState } from "react";
import axios from "axios";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    Tooltip
} from "recharts";

function DashboardPage() {

    const [stats, setStats] = useState(null);
    const [insights, setInsights] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        fetchDashboardData();

    }, []);

    const fetchDashboardData = async () => {

        try {

            const token = localStorage.getItem("token");

            // STATS
            const statsResponse = await axios.get(
                "http://localhost:5000/dashboard/stats",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // INSIGHTS
            const insightsResponse = await axios.get(
                "http://localhost:5000/dashboard/insights",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // TASKS
            const tasksResponse = await axios.get(
                "http://localhost:5000/my-tasks",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setStats(statsResponse.data);
            setInsights(insightsResponse.data.insights);
            setTasks(tasksResponse.data.tasks);

        } catch (error) {

            console.log(error);

        }

    };

    if (!stats) {

        return (

            <Layout>

                <div className="text-white text-2xl">
                    Loading Dashboard...
                </div>

            </Layout>

        );

    }

    const chartData = [
        {
            name: "Completed",
            tasks: stats.completed_tasks
        },
        {
            name: "Pending",
            tasks: stats.pending_tasks
        },
        {
            name: "Overdue",
            tasks: stats.overdue_tasks
        }
    ];

    return (

        <Layout>

            <div className="text-white">

    <Navbar title="Dashboard" />

    {/* KPI ROW */}
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <p className="text-sm text-gray-400 mb-2">
                Total Tasks
            </p>

            <h2 className="text-3xl font-semibold">
                {stats.total_tasks}
            </h2>
        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <p className="text-sm text-gray-400 mb-2">
                Completed
            </p>

            <h2 className="text-3xl font-semibold text-green-400">
                {stats.completed_tasks}
            </h2>
        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <p className="text-sm text-gray-400 mb-2">
                Pending
            </p>

            <h2 className="text-3xl font-semibold text-yellow-400">
                {stats.pending_tasks}
            </h2>
        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
            <p className="text-sm text-gray-400 mb-2">
                Overdue
            </p>

            <h2 className="text-3xl font-semibold text-red-400">
                {stats.overdue_tasks}
            </h2>
        </div>

    </div>


    {/* MAIN GRID */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="xl:col-span-2">

            {/* CHART */}
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 h-[430px]">

                <div className="flex items-center justify-between mb-8">

                    <h2 className="text-lg font-semibold">
                        Productivity Analytics
                    </h2>

                    <span className="text-sm text-gray-400">
                        {Math.round(
                            (stats.completed_tasks / stats.total_tasks) * 100
                        )}% completion
                    </span>

                </div>

                <div className="h-[320px]">

                    <ResponsiveContainer width="100%" height="100%">

                        <BarChart data={chartData}>

                            <XAxis
                                dataKey="name"
                                stroke="#6B7280"
                                axisLine={false}
                                tickLine={false}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#111827',
                                    border: '1px solid #374151',
                                    borderRadius: '10px'
                                }}
                            />

                            <Bar
                                dataKey="tasks"
                                fill="#3B82F6"
                                radius={[8, 8, 0, 0]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>


            {/* RECENT TASKS */}
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 mt-6">

                <div className="flex items-center justify-between mb-5">

                    <h2 className="text-lg font-semibold">
                        Recent Tasks
                    </h2>

                    <button className="text-sm text-gray-400 hover:text-white transition-all">
                        View all
                    </button>

                </div>

                <div className="space-y-3">

                    {tasks.slice(0, 5).map((task) => (

                        <div
                            key={task.id}
                            className="flex items-center justify-between border border-gray-800 rounded-xl px-4 py-3 bg-[#0B1220]"
                        >

                            <div>

                                <h3 className="text-sm font-medium">
                                    {task.title}
                                </h3>

                                <p className="text-xs text-gray-500 mt-1">
                                    {task.project_name}
                                </p>

                            </div>

                            <span
                                className={`text-xs px-3 py-1 rounded-full
                                ${task.status === 'completed'
                                    ? 'bg-green-500/10 text-green-400'
                                    : task.status === 'pending'
                                    ? 'bg-yellow-500/10 text-yellow-400'
                                    : 'bg-blue-500/10 text-blue-400'
                                }`}
                            >
                                {task.status}
                            </span>

                        </div>

                    ))}

                </div>

            </div>

        </div>


        {/* RIGHT */}
        <div className="space-y-6">

            {/* INSIGHTS */}
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">

                <h2 className="text-lg font-semibold mb-5">
                    Insights
                </h2>

                <div className="space-y-3">

                    <div className="border border-gray-800 rounded-xl p-4 bg-[#0B1220]">
                        <p className="text-sm text-gray-300">
                            {insights?.overdue_message}
                        </p>
                    </div>

                    <div className="border border-gray-800 rounded-xl p-4 bg-[#0B1220]">
                        <p className="text-sm text-gray-300">
                            {insights?.completion_message}
                        </p>
                    </div>

                    <div className="border border-gray-800 rounded-xl p-4 bg-[#0B1220]">
                        <p className="text-sm text-gray-300">
                            {insights?.pending_message}
                        </p>
                    </div>

                </div>

            </div>


            {/* PROGRESS */}
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">

                <h2 className="text-lg font-semibold mb-5">
                    Workspace Progress
                </h2>

                <div className="space-y-5">

                    <div>

                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Projects</span>
                            <span>78%</span>
                        </div>

                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full w-[78%] bg-blue-500 rounded-full"></div>
                        </div>

                    </div>

                    <div>

                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Tasks</span>
                            <span>63%</span>
                        </div>

                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full w-[63%] bg-green-500 rounded-full"></div>
                        </div>

                    </div>

                    <div>

                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Efficiency</span>
                            <span>91%</span>
                        </div>

                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full w-[91%] bg-purple-500 rounded-full"></div>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>


        </Layout>

    );

}

export default DashboardPage;