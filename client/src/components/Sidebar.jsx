import React from "react";

import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  Users,
  User,
  LogOut
} from "lucide-react";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

const Sidebar = ({ user }) => {

  const navigate = useNavigate();

  const location = useLocation();

  const menuItems = [

    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path:
        user?.role === "admin"
          ? "/admin-dashboard"
          : "/member-dashboard"
    },

    {
      name: "Tasks",
      icon: <CheckSquare size={20} />,
      path: "/tasks"
    },

    {
      name: "Calendar",
      icon: <CalendarDays size={20} />,
      path: "/calendar"
    },

    {
      name: "Profile",
      icon: <User size={20} />,
      path: "/profile"
    }

  ];

  return (

    <div className="h-screen w-full flex flex-col justify-between bg-white px-6 py-8">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="mb-14">

          <h1 className="text-3xl font-bold text-green-700">
            TeamFlow
          </h1>

        </div>

        {/* MENU */}
        <div>

          <p className="text-xs uppercase tracking-[3px] text-gray-400 mb-5">
            Menu
          </p>

          <div className="flex flex-col gap-2">

            {menuItems.map((item) => (

              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 text-left ${
                  location.pathname === item.path
                    ? "bg-green-100 text-green-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >

                {item.icon}

                <span>
                  {item.name}
                </span>

              </button>

            ))}

          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div>

        <div className="bg-[#f5f7fb] rounded-3xl p-5 mb-5">

  <div className="flex items-center gap-4">

    <img
      src={
        user?.profilePic ||
        "https://i.pravatar.cc/150?img=12"
      }
      alt="profile"
      className="w-14 h-14 rounded-full object-cover"
    />

    <div>

      <h2 className="font-bold text-gray-800 text-lg">
        {user?.name}
      </h2>

      <p className="text-gray-500 capitalize mt-1">
        {user?.role}
      </p>

    </div>

  </div>

</div>

        {/* LOGOUT */}
        <button
          onClick={() => {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            navigate("/");

          }}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all"
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </div>

  );

};

export default Sidebar;