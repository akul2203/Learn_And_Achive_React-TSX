import React from "react";

import { Outlet } from "react-router-dom";
import { SideBar } from "../Components/Layouts/SideBar";
import Navbar from "../Components/Layouts/Navbar";

function Dashboard() {
  return (
    <div className="d-flex">
      {/* SideBar Content Area */}
      <SideBar />

      {/* Middle Content */}
      <div className="middle_content">
        {/* <!-- top-navbar --> */}
        <Navbar />
        <div className="main_content contentSection scroll_bar">
          {/* main center content */}

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
