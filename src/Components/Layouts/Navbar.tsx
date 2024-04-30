/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserService } from "../../Services/UserService";

import ChangePasswordModel from "../ReUsableModels/ApplicationReqquired/ChangePasswordModel";
import LogoutModel from "../ReUsableModels/ApplicationReqquired/LogoutModel";
import User from "../../Payloads/User";

function Navbar() {
  const navigate = useNavigate();
  const [User, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) getuser(email);
  }, []);

  function getuser(email: any) {
    UserService.getuser(email).then(
      (data: any) => {
        setUserData(data.data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  return (
    <>
      {/* <!-- top-navbar --> */}
      <nav className="topnavbar d-flex align-items-center justify-content-between">
        <h4 className="black mb-0 fs-20 fw-600">Welcome, Admin!</h4>
        <div className="right-admin-profile d-flex align-items-center">
          <div className="d-flex align-items-center gap_34">
            <div className="position-relative">
              <input
                type="search"
                className="search_box search_bar"
                placeholder="Search"
              />
              <i className="fi fi-br-search search_icon gray"></i>
            </div>

            <a href="notification.html" className="">
              <img src="assets/images/svg2/notification.svg" />
            </a>
            <div className="dropdown position-relative">
              <a
                className="fs-16 fw-500 black dropdown-toggle d-flex align-items-center"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                <img className="profile_img" src={User?.imageName} />
              </a>
              <ul
                className="dropdown-menu profiles_dropdown"
                aria-labelledby="dropdownMenuLink"
                data-popper-placement="bottom-end"
              >
                <div className="mb-2">
                  <li className="profile_dropdown fs-16 fw-500 black border_bottom">
                    <img className="profile_img" src={User?.imageName} />
                    <div className="profile_details">
                      <h2>{User?.name}</h2>
                      <h3>{User?.email}</h3>
                    </div>
                  </li>
                </div>
                <div className="border-bottom">
                  <a
                    onClick={() => {
                      navigate("/profilepage");
                    }}
                  >
                    <li className="profile_card">
                      <img src="assets/images/svg2/profile.svg" />
                      View Profile
                    </li>
                  </a>
                
                </div>
                <li
                  className="profile_card primary mt-2"
                  data-bs-target="#logoutmodal"
                  data-bs-toggle="modal"
                >
                  <img src="assets/images/svg2/logout.svg" />
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* <!-- top-navbar end --> */}
      {/* logout model */}
      <LogoutModel />
      {/* <!-- CHANGE PASSWORD MODAL --> */}
      <ChangePasswordModel />
      {/* <!-- CHANGE PASSWORD MODAL END --> */}
    </>
  );
}

export default Navbar;
