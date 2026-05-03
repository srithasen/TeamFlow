import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";

const MainLayout = () => {

  const user =
    JSON.parse(localStorage.getItem("user"));

  return (

    <div className="flex h-screen bg-[#f5f7fb] overflow-hidden">

      {/* FIXED SIDEBAR */}
      <div className="w-[270px] h-screen fixed left-0 top-0 bg-white border-r border-gray-200 z-50">

        <Sidebar user={user} />

      </div>

      {/* PAGE CONTENT */}
      <div className="flex-1 ml-[270px] overflow-y-auto p-8">

        <Outlet />

      </div>

    </div>

  );

};

export default MainLayout;