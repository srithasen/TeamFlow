import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");

    const [members, setMembers] = useState([]);

const [showTaskModal, setShowTaskModal] =
  useState(false);

const [taskTitle, setTaskTitle] =
  useState("");

const [taskDescription, setTaskDescription] =
  useState("");

const [assignedTo, setAssignedTo] =
  useState("");

const [selectedProject, setSelectedProject] =
  useState("");

const [deadline, setDeadline] =
  useState("");

    useEffect(() => {

    fetchProjects();
    fetchTasks();
    fetchMembers();

}, []);

    const fetchProjects = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
   "https://zestful-patience-production-a8c1.up.railway.app/projects",
   {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setProjects(response.data.projects || []);

        } catch (error) {

            console.log(error);

        }

    };

    const fetchTasks = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
   "https://zestful-patience-production-a8c1.up.railway.app/my-tasks",
   {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setTasks(response.data.tasks || []);

        } catch (error) {

            console.log(error);

        }

    };

    const fetchMembers = async () => {

    try {

        const token =
          localStorage.getItem("token");

        const response = await axios.get(
            "https://zestful-patience-production-a8c1.up.railway.app/team",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setMembers(response.data.members || []);

    } catch (error) {

        console.log(error);

    }

};

    const createProject = async () => {

        try {

            const token =
                localStorage.getItem("token");

            await axios.post(

                "https://zestful-patience-production-a8c1.up.railway.app/projects",

                {
                    title,
                    description,
                    priority
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            setShowModal(false);

            setTitle("");
            setDescription("");
            setPriority("Medium");

            fetchProjects();

        } catch (error) {

            console.log(error);

        }

    };

    const createTask = async () => {

    try {

        const token =
          localStorage.getItem("token");

        await axios.post(

            "https://zestful-patience-production-a8c1.up.railway.app/tasks",

            {
                project_id: selectedProject,
                assigned_to: assignedTo,
                title: taskTitle,
                description: taskDescription,
                deadline
            },

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        setShowTaskModal(false);

        fetchTasks();

    } catch (error) {

        console.log(error);

    }

};

    const completedTasks =
        (tasks || []).filter(task => task.status === "completed");

    const pendingTasks =
        (tasks || []).filter(task => task.status === "pending");

    const inProgressTasks =
        (tasks || []).filter(task => task.status === "in_progress");

    const progress =
    tasks?.length > 0
        ? Math.round(
            ((completedTasks?.length || 0) / tasks.length) * 100
        )
        : 0;

    return (

    <div className="min-h-screen bg-[#eef2f7] flex">

        {/* SIDEBAR SPACE */}
        <div className="w-[250px]"></div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-6">

            {/* DASHBOARD BOX */}
            <div className="bg-white rounded-[35px] shadow-sm p-8 min-h-[95vh]">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-8">

                    <div>

                        <h1 className="text-5xl font-bold text-gray-800">
                            Dashboard
                        </h1>

                        <p className="text-gray-500 mt-2 text-lg">
                            Manage projects, tasks and team productivity.
                        </p>

                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-2xl font-medium"
                    >
                        + Add Project
                    </button>

                </div>

                {/* STATS */}
                <div className="grid grid-cols-4 gap-6 mb-8">

                    <div className="bg-green-700 text-white rounded-3xl p-6">

                        <p className="text-sm opacity-80 mb-3">
                            Total Projects
                        </p>

                        <h2 className="text-5xl font-bold">
                            {projects.length}
                        </h2>

                    </div>

                    <div className="bg-[#f5f7fb] rounded-3xl p-6">

                        <p className="text-sm text-gray-500 mb-3">
                            Completed Tasks
                        </p>

                        <h2 className="text-5xl font-bold text-green-700">
                            {completedTasks.length}
                        </h2>

                    </div>

                    <div className="bg-[#f5f7fb] rounded-3xl p-6">

                        <p className="text-sm text-gray-500 mb-3">
                            Running Tasks
                        </p>

                        <h2 className="text-5xl font-bold text-blue-600">
                            {inProgressTasks.length}
                        </h2>

                    </div>

                    <div className="bg-[#f5f7fb] rounded-3xl p-6">

                        <p className="text-sm text-gray-500 mb-3">
                            Pending Tasks
                        </p>

                        <h2 className="text-5xl font-bold text-yellow-500">
                            {pendingTasks.length}
                        </h2>

                    </div>

                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-3 gap-6">

                    {/* LEFT */}
                    <div className="col-span-2 space-y-6">

                        {/* ACTIVE PROJECTS */}
                        <div className="bg-[#f5f7fb] rounded-3xl p-6">

                            <h2 className="text-3xl font-bold text-black mb-6">
                                Active Projects
                            </h2>

                            <div className="space-y-5">

                                {(projects || []).map((project) => (

                                    <div
                                        key={project.id}
                                        className="bg-white rounded-2xl p-5"
                                    >

                                        <div className="flex justify-between mb-4">

                                            <div>

                                                <h3 className="font-bold text-lg text-gray-800">
                                                    {project.title}
                                                </h3>

                                                <p className="text-gray-500 text-sm mt-1">
                                                    {project.description}
                                                </p>

                                            </div>

                                            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm h-fit">
                                                {project.priority}
                                            </span>

                                        </div>

                                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                                            <div
                                                className="h-full bg-green-700 rounded-full"
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
                        <div className="bg-[#f5f7fb] rounded-3xl p-6">

                            <div className="flex justify-between items-center mb-6">

                                <h2 className="text-3xl font-bold text-black">
                                    Assigned Tasks
                                </h2>

                                <button
                                    onClick={() => setShowTaskModal(true)}
                                    className="bg-green-700 text-white px-5 py-3 rounded-2xl"
                                >
                                    Assign Task
                                </button>

                            </div>

                            <div className="space-y-4">

                                {(tasks || []).map((task) => (

                                    <div
                                        key={task.id}
                                        className="bg-white rounded-2xl p-5 flex items-center justify-between"
                                    >

                                        <div>

                                            <h3 className="font-semibold text-gray-800">
                                                {task.assigned_user || "No User"}
                                            </h3>

                                            <p className="text-gray-500 text-sm mt-1">
                                                {task.title}
                                            </p>

                                        </div>

                                        <span
                                            className={`px-4 py-2 rounded-full text-sm
                                            ${
                                                task.status === "completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
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

                        {/* PROGRESS */}
                        <div className="bg-[#f5f7fb] rounded-3xl p-6">

                            <h2 className="text-3xl font-bold text-black mb-6">
                                Workspace Progress
                            </h2>

                            <div className="flex justify-center">

                                <div className="w-52 h-52 rounded-full border-[18px] border-green-700 flex items-center justify-center">

                                    <div className="text-center">

                                        <h2 className="text-5xl font-bold">
                                            {progress}%
                                        </h2>

                                        <p className="text-gray-500 mt-2">
                                            Completed
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* RECENT PROJECTS */}
                        <div className="bg-[#f5f7fb] rounded-3xl p-6">

                            <h2 className="text-3xl font-bold text-black mb-6">
                                Recent Projects
                            </h2>

                            <div className="space-y-5">

                                {(projects || []).map((project) => (

                                    <div
                                        key={project.id}
                                        className="flex justify-between items-center bg-white rounded-2xl p-4"
                                    >

                                        <div>

                                            <h3 className="font-semibold text-gray-800">
                                                {project.title}
                                            </h3>

                                            <p className="text-sm text-gray-500">
                                                Active
                                            </p>

                                        </div>

                                        <span className="text-gray-500 text-sm">
                                            {project.progress || 0}%
                                        </span>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
        {/* CREATE PROJECT MODAL */}
{showModal && (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div className="bg-white w-full max-w-lg rounded-3xl p-8">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-3xl font-bold text-gray-800">
                    Create Project
                </h2>

                <button
                    onClick={() => setShowModal(false)}
                    className="text-2xl"
                >
                    ×
                </button>

            </div>

            <div className="space-y-4">

                <input
                    type="text"
                    placeholder="Project Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-[#f5f7fb] border border-gray-200 outline-none"
                />

                <textarea
                    placeholder="Project Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-36 p-4 rounded-2xl bg-[#f5f7fb] border border-gray-200 outline-none resize-none"
                />

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-[#f5f7fb] border border-gray-200 outline-none"
                >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>

                <button
                    onClick={createProject}
                    className="w-full bg-green-700 text-white py-4 rounded-2xl font-semibold"
                >
                    Create Project
                </button>

            </div>

        </div>

    </div>

)}

{/* ASSIGN TASK MODAL */}
{showTaskModal && (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div className="bg-white w-full max-w-lg rounded-3xl p-8">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-3xl font-bold text-gray-800">
                    Assign Task
                </h2>

                <button
                    onClick={() => setShowTaskModal(false)}
                    className="text-2xl"
                >
                    ×
                </button>

            </div>

            <div className="space-y-4">

                <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-[#f5f7fb] border border-gray-200"
                >

                    <option value="">
                        Select Project
                    </option>

                    {(projects || []).map((project) => (

                        <option
                            key={project.id}
                            value={project.id}
                        >
                            {project.title}
                        </option>

                    ))}

                </select>

                <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-[#f5f7fb] border border-gray-200"
                >

                    <option value="">
                        Assign Member
                    </option>

                    {(members || []).map((member) => (

                        <option
                            key={member.id}
                            value={member.id}
                        >
                            {member.name}
                        </option>

                    ))}

                </select>

                <input
                    type="text"
                    placeholder="Task Title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-[#f5f7fb] border border-gray-200"
                />

                <textarea
                    placeholder="Task Description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    className="w-full h-32 p-4 rounded-2xl bg-[#f5f7fb] border border-gray-200"
                />

                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-[#f5f7fb] border border-gray-200"
                />

                <button
                    onClick={createTask}
                    className="w-full bg-green-700 text-white py-4 rounded-2xl font-semibold"
                >
                    Assign Task
                </button>

            </div>

        </div>

    </div>

)}

    </div>

);
}
export default AdminDashboard;