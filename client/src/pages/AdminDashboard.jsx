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
   "https://zestful-patience-production-a8c1.up.railway.app/projects",
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

        <div className="min-h-screen bg-[#f5f7fb] p-6">

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

                <div>

                    <h1 className="text-5xl font-bold text-gray-800">
                        Dashboard
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage projects, tasks and team productivity.
                    </p>

                </div>

                <div className="flex gap-4">

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-2xl font-medium transition-all"
                    >
                        + Add Project
                    </button>

                </div>

            </div>

            {/* MODAL */}
            {showModal && (

                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white w-full max-w-lg rounded-3xl p-8">

                        <div className="flex justify-between items-center mb-6">

                            <h2 className="text-3xl font-bold text-gray-800">
                                Create Project
                            </h2>

                            <button
                                onClick={() => setShowModal(false)}
                                className="text-2xl text-black"
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
                                className="w-full p-4 rounded-2xl bg-[#f5f7fb] border border-gray-200 outline-none text-black"
                            />

                            <textarea
                                placeholder="Project Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full h-36 p-4 rounded-2xl bg-[#f5f7fb] border border-gray-200 outline-none text-black resize-none"
                            />

                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full p-4 rounded-2xl bg-[#f5f7fb] border border-gray-200 outline-none text-black"
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

            {showTaskModal && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white w-full max-w-lg rounded-3xl p-8">

<div className="flex justify-between items-center mb-6">

<h2 className="text-3xl font-bold text-gray-800">
Assign Task
</h2>

<button
    onClick={() => setShowTaskModal(false)}
    className="text-2xl text-black"
>
    ×
</button>

</div>

<div className="space-y-4">

<select
value={selectedProject}
onChange={(e) => setSelectedProject(e.target.value)}
className="w-full p-4 rounded-2xl bg-[#f5f7fb] border border-gray-200 text-black"
>

<option value="">
Select Project
</option>

{projects.map((project) => (

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
className="w-full p-4 rounded-2xl bg-[#f5f7fb] border border-gray-200 text-black"
>

<option value="">
Assign Member
</option>

{members.map((member) => (

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
className="w-full p-4 rounded-2xl bg-[#f5f7fb] border border-gray-200 text-black"
/>

<textarea
placeholder="Task Description"
value={taskDescription}
onChange={(e) => setTaskDescription(e.target.value)}
className="w-full h-32 p-4 rounded-2xl bg-[#f5f7fb] border border-gray-200 text-black"
/>

<input
type="date"
value={deadline}
onChange={(e) => setDeadline(e.target.value)}
className="w-full p-4 rounded-2xl bg-[#f5f7fb] border border-gray-200 text-black"
/>

<button
onClick={createTask}
className="w-full bg-green-700 text-white py-4 rounded-2xl"
>
Assign Task
</button>

</div>

</div>

</div>

)}

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

                <div className="bg-green-700 text-white rounded-3xl p-6">

                    <p className="text-sm opacity-80 mb-3">
                        Total Projects
                    </p>

                    <h2 className="text-5xl font-bold">
                        {projects?.length || 0}
                    </h2>(projects || []).slice(0, 5)

                </div>

                <div className="bg-white rounded-3xl border border-gray-200 p-6">

                    <p className="text-sm text-gray-500 mb-3">
                        Completed Tasks
                    </p>

                    <h2 className="text-5xl font-bold text-green-700">
                        {completedTasks?.length || 0}
                    </h2>

                </div>

                <div className="bg-white rounded-3xl border border-gray-200 p-6">

                    <p className="text-sm text-gray-500 mb-3">
                        Running Tasks
                    </p>

                    <h2 className="text-5xl font-bold text-blue-600">
                        {inProgressTasks?.length || 0}
                    </h2>

                </div>

                <div className="bg-white rounded-3xl border border-gray-200 p-6">

                    <p className="text-sm text-black-500 mb-3">
                        Pending Tasks
                    </p>

                    <h2 className="text-5xl font-bold text-yellow-500">
                        {pendingTasks?.length || 0}
                    </h2>

                </div>

            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* LEFT */}
                <div className="xl:col-span-2 space-y-6">

                    {/* ACTIVE PROJECTS */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-6">

                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Active Projects
                        </h2>

                        <div className="space-y-5">

                            {(projects || []).slice(0, 5).map((project) => (

                                <div
                                    key={project.id}
                                    className="bg-[#f5f7fb] rounded-2xl p-5"
                                >

                                    <div className="flex items-center justify-between mb-4">

                                        <div>

                                            <h3 className="font-bold text-lg text-gray-800">
                                                {project.title}
                                            </h3>

                                            <p className="text-gray-500 text-sm mt-1">
                                                {project.description}
                                            </p>

                                        </div>

                                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                                            {project.priority}
                                        </span>

                                    </div>

                                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                                        <div
                                            className="h-full bg-green-700 rounded-full"
                                            style={{
                                                width: `${project.progress}%`
                                            }}
                                        />

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* TASKS */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-6">

                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Assigned Tasks
                        </h2>

                        <div className="space-y-4">

                            {(tasks || []).slice(0, 6).map((task) => (

                                <div
                                    key={task.id}
                                    className="flex items-center justify-between bg-[#f5f7fb] rounded-2xl p-4"
                                >

                                    <div>

                                        <h3 className="font-semibold text-gray-800">
                                            {task.title}
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {task.assigned_user}
                                        </p>

                                    </div>

                                    <span
                                        className={`px-4 py-2 rounded-full text-sm
                                        ${
                                            task.status === "completed"
                                            ? "bg-green-100 text-green-700"
                                            : task.status === "pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-blue-100 text-blue-700"
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

                    {/* WORKSPACE PROGRESS */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-6">

                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Workspace Progress
                        </h2>

                        <div className="flex items-center justify-center">

                            <div className="relative w-52 h-52 rounded-full border-[18px] border-green-700 flex items-center justify-center">

                                <div className="text-center">

                                    <h2 className="text-5xl font-bold text-gray-800">
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
                    <div className="bg-white rounded-3xl border border-gray-200 p-6">

                        <h2 className="text-2xl font-bold text-gray-800 mb-5">
                            Recent Projects
                        </h2>

                        <div className="space-y-4">

                            {(projects || []).slice(0, 5).map((project) => (

                                <div
                                    key={project.id}
                                    className="flex items-center justify-between"
                                >

                                    <div>

                                        <h3 className="font-semibold text-gray-800">
                                            {project.title}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            {project.status}
                                        </p>

                                    </div>

                                    <span className="text-sm text-gray-500">
                                        {project.progress}%
                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                    <button
  onClick={() => setShowTaskModal(true)}
  className="bg-green-700 text-white px-4 py-2 rounded-xl text-sm mb-5"
>
  Assign Task
</button>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;