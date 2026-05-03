
function Navbar({ title }) {

    const user =
        JSON.parse(localStorage.getItem("user"));

    return (

        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl shadow-2xl flex justify-between items-center mb-8">

            {/* LEFT */}
            <div>

                <h1 className="text-4xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">

                    {title}

                </h1>

                <p className="text-gray-400 mt-2 text-lg">
                    Welcome back to TeamFlow 🚀
                </p>

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-5">

                <div className="text-right">

                    <p className="font-bold text-lg capitalize">
                        {user?.name}
                    </p>

                    <p className="text-sm text-gray-400 capitalize">
                        {user?.role}
                    </p>

                </div>

                {/* AVATAR */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-black text-2xl shadow-2xl">

                    {user?.name?.charAt(0)}

                </div>

            </div>

        </div>

    );

}

export default Navbar;