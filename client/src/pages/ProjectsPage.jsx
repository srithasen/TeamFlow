import { useEffect, useState } from "react";
import axios from "axios";

function ProjectsPage() {

    const user =
      JSON.parse(localStorage.getItem("user"));

    const [projects, setProjects] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

        fetchProjects();

    }, []);

    // FETCH PROJECTS
    const fetchProjects = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "teamflow-production-f8a9.up.railway.app/projects",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setProjects(response.data.projects);

        } catch (error) {

            console.log(error);

        }

    };

    // CREATE PROJECT
    const createProject = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await axios.post(
                "teamflow-production-f8a9.up.railway.app/projects",
                {
                    title,
                    description
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // CLEAR FORM
            setTitle("");
            setDescription("");

            // CLOSE MODAL
            setShowModal(false);

            // REFRESH PROJECTS
            fetchProjects();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="p-6">

            <div className="min-h-screen bg-[#f5f7fb]">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

                    <div>

                        <h1 className="text-5xl font-bold text-gray-800">
                            Projects
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage your team workflows and productivity.
                        </p>

                    </div>

                    {user?.role === "admin" && (

                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-green-700 transition-all"
                        >
                            + New Project
                        </button>

                    )}

                </div>

                {/* CREATE PROJECT MODAL */}
                {showModal && (

                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">

                        <form
                            onSubmit={createProject}
                            className="bg-white border border-gray-200 w-full max-w-lg rounded-[32px] p-8 shadow-lg"
                        >

                            <div className="flex justify-between items-center mb-6">

                                <h2 className="text-3xl font-bold text-gray-800">
                                    Create Project
                                </h2>

                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-500 hover:text-black"
                                >
                                    ✕
                                </button>

                            </div>

                            <input
                                type="text"
                                placeholder="Project Title"
                                className="w-full mb-4 p-4 rounded-2xl bg-[#f5f7fb] outline-none border border-gray-300"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <textarea
                                placeholder="Project Description"
                                rows="4"
                                className="w-full mb-6 p-4 rounded-2xl bg-[#f5f7fb] outline-none border border-gray-300"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-4 rounded-2xl font-semibold hover:bg-green-700 transition-all"
                            >
                                Create Project
                            </button>

                        </form>

                    </div>

                )}

                {/* PROJECT CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {projects.map((project) => (

                        <div
                            key={project.id}
                            className="bg-white border border-gray-200 rounded-[32px] p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >

                            <div className="flex justify-between items-start mb-4">

                                <div>

                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                        {project.title}
                                    </h2>

                                    <div className="flex gap-2 mt-4">

                                        <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full">
                                            {project.priority}
                                        </span>

                                    </div>

                                </div>

                                <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full whitespace-nowrap">
                                    {project.status}
                                </span>

                            </div>

                            {/* PROGRESS BAR */}
                            <div className="mt-6">

                                <div className="flex justify-between text-sm mb-2">

                                    <span className="text-gray-500">
                                        Progress
                                    </span>

                                    <span className="font-semibold text-gray-700">
                                        {project.progress}%
                                    </span>

                                </div>

                                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                                    <div
                                        className="h-full bg-green-500 rounded-full"
                                        style={{
                                            width: `${project.progress}%`
                                        }}
                                    />

                                </div>

                            </div>

                            {/* FOOTER */}
                            <div className="mt-6 flex items-center justify-between">

                                <div className="flex -space-x-2">

                                    <img
                                        src="https://i.pravatar.cc/40?img=1"
                                        alt=""
                                        className="w-9 h-9 rounded-full border-2 border-white"
                                    />

                                    <img
                                        src="https://i.pravatar.cc/40?img=2"
                                        alt=""
                                        className="w-9 h-9 rounded-full border-2 border-white"
                                    />

                                    <img
                                        src="https://i.pravatar.cc/40?img=3"
                                        alt=""
                                        className="w-9 h-9 rounded-full border-2 border-white"
                                    />

                                </div>

                                <p className="text-gray-400 text-sm">
                                    Updated 2h ago
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default ProjectsPage;