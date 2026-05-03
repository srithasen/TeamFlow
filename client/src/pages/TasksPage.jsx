
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function TasksPage() {

    const user =
    JSON.parse(localStorage.getItem("user"));

    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [assignedUser, setAssignedUser] = useState("");

const [taskDescription, setTaskDescription] = useState("");

const [deadline, setDeadline] = useState("");

const [taskStatus, setTaskStatus] =
    useState("pending");
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);

const [selectedProject, setSelectedProject] =
    useState("");

    useEffect(() => {

    fetchTasks();

    fetchUsers();
    fetchProjects();

}, []);

const fetchProjects = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
            "https://teamflow-production-f8a9.up.railway.app/projects",
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

const fetchUsers = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
            "https://teamflow-production-f8a9.up.railway.app/users",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setUsers(response.data.users);

    } catch (error) {

        console.log(error);

    }

};

const fetchTasks = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
            "https://teamflow-production-f8a9.up.railway.app/my-tasks",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setTasks(response.data.tasks);

    } catch (error) {

        console.log(error);

    }

};

const createTask = async () => {

    try {

        const token = localStorage.getItem("token");

        await axios.post(
            "https://teamflow-production-f8a9.up.railway.app/tasks",
            {
                title: taskTitle,
                description: taskDescription,
                project_id: selectedProject,
                assigned_to: assignedUser,
                status: taskStatus,
                deadline: deadline
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setShowModal(false);

        setTaskTitle("");
        setTaskDescription("");
        setSelectedProject("");
        setAssignedUser("");
        setDeadline("");
        setTaskStatus("pending");

        fetchTasks();

    } catch (error) {

        console.log(error);

    }

};


    const updateTaskStatus = async (taskId, status) => {

        try {

            const token = localStorage.getItem("token");

            await axios.put(
                `https://teamflow-production-f8a9.up.railway.app/tasks/${taskId}`,
                {
                    status
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchTasks();

        } catch (error) {

            console.log(error);

        }

    };

    // FILTER TASKS
    const pendingTasks =
        (tasks || []).filter(task => task.status === "pending");

    const inProgressTasks =
        (tasks || []).filter(task => task.status === "in_progress");

    const completedTasks =
        (tasks || []).filter(task => task.status === "completed");

    const TaskCard = ({ task }) => (

        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3 hover:bg-white/10 transition-all">

            <div className="flex justify-between items-start mb-3">

                <div>

                    <h3 className="font-semibold text-sm mb-1">
                        {task.title}
                    </h3>

                    <p className="text-xs text-gray-500">
                        {task.project_name}
                    </p>

                </div>

                <div className="w-2 h-2 rounded-full bg-blue-400 mt-1"></div>

            </div>

            <div className="flex justify-between items-center gap-3">

                <select  className="text-black"
                    value={task.status}
                    onChange={(e) =>
                        updateTaskStatus(
                            task.id,
                            e.target.value
                        )
                    }
                    className="bg-gray-100 border border-white/10 rounded-lg px-2 py-1 text-xs outline-none"
                >

                    <option value="pending">
  Pending
</option>

<option value="in_progress">
  In Progress
</option>

<option value="completed">
  Completed
</option>

                </select>

              
<div className="flex flex-col items-end">

    <span className="text-[11px] text-gray-500 whitespace-nowrap">

        {
            task.deadline
            ? new Date(task.deadline)
                .toLocaleDateString()
            : "No deadline"
        }

    </span>

    {
        task.deadline &&
        new Date(task.deadline) < new Date() &&
        task.status !== "completed" && (

            <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-1 rounded-full mt-1">

                Overdue

            </span>

        )
    }

</div>


            </div>

        </div>

    );

    return (

    <div className="min-h-screen bg-[#f5f7fb] text-black p-6">

                <div className="flex items-center justify-between mb-6">

    <Navbar title="Tasks Workspace" />

{user?.role !== "member" && (

    <button
        onClick={() => setShowModal(true)}
        className="bg-white text-black px-4 py-2 rounded-xl font-semibold hover:opacity-90 transition-all"
    >
        + Create Task
    </button>

)}

</div>
    {showModal && (

    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">

        <div className="bg-white border border-zinc-800 w-full max-w-lg rounded-2xl p-8">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">
                    Create Task
                </h2>

                <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>

            </div>

            <input
    type="text"
    placeholder="Task Title"
    value={taskTitle}
    onChange={(e) =>
        setTaskTitle(e.target.value)
    }
    className="w-full mb-4 p-4 rounded-xl bg-[#f9fafb] text-white outline-none border border-gray-300"
/>

<select
    value={selectedProject}
    onChange={(e) =>
        setSelectedProject(e.target.value)
    }
    className="w-full mb-4 p-4 rounded-xl bg-[#f9fafb] text-white outline-none border border-gray-300"
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
    value={assignedUser}
    onChange={(e) =>
        setAssignedUser(e.target.value)
    }
    className="w-full mb-4 p-4 rounded-xl bg-[#f9fafb] text-white outline-none border border-gray-300"
>

    <option value="">
        Assign User
    </option>

    {users.map((user) => (

        <option
            key={user.id}
            value={user.id}
        >
            {user.name} ({user.role})
        </option>

    ))}

</select>


<textarea
    placeholder="Task Description"
    rows="4"
    value={taskDescription}
    onChange={(e) =>
        setTaskDescription(e.target.value)
    }
    className="w-full mb-4 p-4 rounded-xl bg-[#f9fafb] text-white outline-none border border-gray-300"
/>

<input
    type="date"
    value={deadline}
    onChange={(e) =>
        setDeadline(e.target.value)
    }
    className="w-full mb-4 p-4 rounded-xl bg-[#f9fafb] text-white outline-none border border-gray-300"
/>

<select
    value={taskStatus}
    onChange={(e) =>
        setTaskStatus(e.target.value)
    }
    className="w-full mb-6 p-4 rounded-xl bg-[#f9fafb] text-white outline-none border border-gray-300"
>

    <option value="pending">
        Pending
    </option>

    <option value="in_progress">
        In Progress
    </option>

    <option value="completed">
        Completed
    </option>

</select>


<button
    onClick={createTask}
    className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
>
    Create Task
</button>

        </div>

    </div>

)}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                
                    {/* PENDING */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

                        <div className="flex justify-between items-center mb-5">

                            <h2 className="text-sm font-semibold tracking-wide text-gray-300 uppercase">
                                Pending
                            </h2>

                            <div className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs">

                                {pendingTasks.length}

                            </div>

                        </div>

                        {pending(tasks || []).map(task => (

                            <TaskCard
                                key={task.id}
                                task={task}
                            />

                        ))}

                        {pendingTasks.length === 0 && (

    <p className="text-sm text-gray-400 text-center py-6">
        No pending tasks
    </p>

)}

                    </div>

                    {/* IN PROGRESS */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

                        <div className="flex justify-between items-center mb-5">

                            <h2 className="text-sm font-semibold tracking-wide text-gray-300 uppercase">
                                In Progress
                            </h2>

                            <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs">

                                {inProgressTasks.length}

                            </div>

                        </div>

                        {inProgress(tasks || []).map(task => (

                            <TaskCard
                                key={task.id}
                                task={task}
                            />

                        ))}

                        {inProgressTasks.length === 0 && (

    <p className="text-sm text-gray-400 text-center py-6">
        No tasks in progress
    </p>

)}

                    </div>

                    {/* COMPLETED */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

                        <div className="flex justify-between items-center mb-5">

                            <h2 className="text-sm font-semibold tracking-wide text-gray-300 uppercase">
                                Completed
                            </h2>

                            <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">

                                {completedTasks.length}

                            </div>

                        </div>

                        {completed(tasks || []).map(task => (

                            <TaskCard
                                key={task.id}
                                task={task}
                            />

                        ))}

                        {completedTasks.length === 0 && (

    <p className="text-sm text-gray-400 text-center py-6">
        No completed tasks
    </p>

)}

                    </div>

                </div>

            </div>

       

    );

}

export default TasksPage;