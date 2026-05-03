import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  FolderKanban,
  CheckCircle,
  Clock3,
  AlertCircle,
} from "lucide-react";

const MemberDashboard = () => {

  const [dashboard, setDashboard] = useState({
    projects: [],
    tasks: [],
    stats: {
      totalProjects: 0,
      completedTasks: 0,
      pendingTasks: 0,
      deadlines: 0,
    },
  });

  const user =
    JSON.parse(localStorage.getItem("user"));

  const token =
    localStorage.getItem("token");

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const res = await axios.get(
        "teamflow-production-f8a9.up.railway.app/member/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      setDashboard({
        projects: res.data.projects || [],
        tasks: res.data.tasks || [],
        stats: res.data.stats || {
          totalProjects: 0,
          completedTasks: 0,
          pendingTasks: 0,
          deadlines: 0,
        },
      });

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-[#f5f7fb] p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-5xl font-bold text-gray-800">
            Hello, {user?.name}
          </h1>

          <p className="text-gray-500 mt-2">
            Let’s finish your task today and stay productive.
          </p>

        </div>

        <div className="bg-green-700 text-white px-6 py-3 rounded-2xl shadow-sm font-medium">
          TeamFlow Member
        </div>

      </div>

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-[32px] p-10 text-white flex items-center justify-between mb-8 overflow-hidden">

        <div>

          <h2 className="text-5xl font-bold mb-4">
            Today's Tasks
          </h2>

          <p className="text-green-100 text-lg mb-6 max-w-lg">
            Track your work, manage deadlines, and stay focused with your workspace.
          </p>

          <button className="bg-white text-green-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-all">
            View Schedule
          </button>

        </div>

        <img
  src={
    user?.profilePic ||
    "https://i.pravatar.cc/300?img=12"
  }
  alt="profile"
  className="w-64 h-64 rounded-full object-cover border-8 border-white/30 hidden lg:block"
/>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <div className="bg-white border border-gray-200 rounded-3xl p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                Projects
              </p>

              <h2 className="text-4xl font-bold text-gray-800 mt-3">
                {dashboard?.stats?.totalProjects || 0}
              </h2>

            </div>

            <div className="bg-blue-100 p-4 rounded-2xl">

              <FolderKanban className="text-blue-600" />

            </div>

          </div>

        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                Completed
              </p>

              <h2 className="text-4xl font-bold text-green-600 mt-3">
                {dashboard?.stats?.completedTasks || 0}
              </h2>

            </div>

            <div className="bg-green-100 p-4 rounded-2xl">

              <CheckCircle className="text-green-600" />

            </div>

          </div>

        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                Pending
              </p>

              <h2 className="text-4xl font-bold text-orange-500 mt-3">
                {dashboard?.stats?.pendingTasks || 0}
              </h2>

            </div>

            <div className="bg-orange-100 p-4 rounded-2xl">

              <Clock3 className="text-orange-500" />

            </div>

          </div>

        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                Deadlines
              </p>

              <h2 className="text-4xl font-bold text-red-500 mt-3">
                {dashboard?.stats?.deadlines || 0}
              </h2>

            </div>

            <div className="bg-red-100 p-4 rounded-2xl">

              <AlertCircle className="text-red-500" />

            </div>

          </div>

        </div>

      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* PROJECTS */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-2xl font-bold text-gray-800">
                Active Projects
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Current project progress
              </p>

            </div>

          </div>

          <div className="space-y-5">

            {(dashboard?.projects || []).map((project) => (

              <div
                key={project.id}
                className="bg-[#f9fafb] border border-gray-200 rounded-2xl p-5"
              >

                <div className="flex justify-between items-center mb-3">

                  <div>

                    <h3 className="font-bold text-lg text-gray-800">
                      {project.project_name || project.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {project.description}
                    </p>

                  </div>

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                    {project.progress || 0}%
                  </span>

                </div>

                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">

                  <div
                    className="bg-green-600 h-3 rounded-full"
                    style={{
                      width: `${project.progress || 0}%`
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* TASKS */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-2xl font-bold text-gray-800">
                My Tasks
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Your assigned tasks
              </p>

            </div>

          </div>

          <div className="space-y-4">

            {(dashboard?.tasks || []).map((task) => (

              <div
                key={task.id}
                className="bg-[#f9fafb] border border-gray-200 rounded-2xl p-5 flex items-center justify-between"
              >

                <div>

                  <h3 className="font-semibold text-gray-800 text-lg">
                    {task.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">

                    Due:

                    {" "}

                    {
                      task.deadline
                        ? new Date(task.deadline)
                            .toLocaleDateString()
                        : "No deadline"
                    }

                  </p>

                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : task.status === "in_progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >

                  {task.status}

                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

};

export default MemberDashboard;