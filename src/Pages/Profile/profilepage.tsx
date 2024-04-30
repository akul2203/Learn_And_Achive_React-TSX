/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { UserService } from "../../Services/UserService";
import User from "../../Payloads/User";

function profilepage() {
  const [User, setUserData] = useState<User | null>(null);
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) getuser(email);
  }, []);

  function getuser(email: any) {
    UserService.getuser(email).then((data: any) => {
      setUserData(data.data);
      console.log(User);

      console.log(data);
    });
  }

  function loadFile(e: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  function submitupadte(): void {
    alert("function to update data");
  }

  return (
    <div className="content" data-number={8}>
      <div className="mb-4 d-flex justify-content-between">
        <h1 className="fs-18 fw-600 mb-0">PROFILE</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="#">Dashboard</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Profile
            </li>
          </ol>
        </nav>
      </div>

      <div
        className="table_container table-responsive"
        style={{ display: "block" }}
      >
        <div className="table_title">
          <div className="table_headings">
            <h4 className="fs-20 fw-600 dark mb-0">Edit Profile</h4>
          </div>
        </div>

        {/* tabs */}
        {/* user details tabs */}
        <ul className="nav nav-pills mb-4 gap_12" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="tabs_btn active fs-16 fw-600"
              id="Transactionss"
              data-bs-toggle="pill"
              data-bs-target="#Transactions"
              type="button"
              role="tab"
              aria-controls="pills-Transactions"
              aria-selected="true"
            >
              Personal Details
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="tabs_btn fs-16 fw-600"
              id="Emergencys"
              data-bs-toggle="pill"
              data-bs-target="#Emergency"
              type="button"
              role="tab"
              aria-controls="pills-Emergency"
              aria-selected="false"
            >
              Change Password
            </button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          {/* Personal Details tabs */}
          {/* Personal Details tabs */}
          <div
            className="tab-pane fade show active"
            id="Transactions"
            role="tabpanel"
            aria-labelledby="pills-Transactions-tab"
            tabIndex={0}
          >
            <div className="table_container mb-4 table-responsive">
              <div className="col-md-2 m-auto">
                <div className="mb-4 position-relative  d-flex justify-content-center">
                  <input
                    id="file"
                    type="file"
                    onChange={(e) => loadFile(e)}
                    className="d-none"
                  />
                  <img
                    className="modal_profile"
                    id="output"
                    src={User?.imageName}
                    alt="Profile"
                  />
                  <label className="-label" htmlFor="file">
                    <a className="secondary fs-16 fw-500  edit_img d-flex justify-content-center align-items-center">
                      <img src="assets/images/svg2/c.svg" alt="Edit" />
                    </a>
                  </label>
                </div>
                <div className="profile_text">
                  <h2>{User?.name}</h2>
                  <h3>{User?.email}</h3>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3 ps-0 px-2">
                  <label htmlFor="" className="modal_input_heading">
                    Name<span className="danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control profile_edit"
                    placeholder={User?.name}
                  />
                </div>
                <div className="col-md-6 mb-3 ps-0 px-2">
                  <label htmlFor="" className="modal_input_heading">
                    Email Id<span className="danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control profile_edit light"
                    placeholder={User?.email}
                  />
                </div>
                <div className="col-md-6 mb-3 ps-0 px-2">
                  <label htmlFor="" className="modal_input_heading">
                    Mobile No.<span className="danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control profile_edit light"
                    placeholder="Enter Mobile No."
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <a href="" className="back_login ">
               
                </a>
                <div className="select-btn ">
                  <button
                    className="gap_6 primary_btn"
                    onClick={submitupadte}
                    data-bs-toggle="modal"
                  >
                    Update
                  </button>
                  <img
                    src="assets/images/svg2/right.svg"
                    className="add_btn"
                    alt="Update"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Personal Details tabs end*/}
          {/* Personal Details tabs end*/}

          {/* Change Password tabs */}
          <div
            className="tab-pane fade"
            id="Emergency"
            role="tabpanel"
            aria-labelledby="pills-Emergency-tab"
            tabIndex={0}
          >
            <div className="table_container mb-4 table-responsive">
              <div className="row">
                <div className="col-md-6 mb-3 ps-0 px-2">
                  <label
                    htmlFor="currentPassword"
                    className="modal_input_heading"
                  >
                    Current Password<span className="danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control profile_edit"
                    placeholder="Enter Current Password"
                  />
                </div>
                <div className="col-md-6 mb-3 ps-0 px-2">
                  <label htmlFor="newPassword" className="modal_input_heading">
                    New Password<span className="danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control profile_edit light"
                    placeholder="Enter New Password"
                  />
                </div>
                <div className="col-md-6 mb-3 ps-0 px-2">
                  <label
                    htmlFor="confirmPassword"
                    className="modal_input_heading"
                  >
                    Confirm Password<span className="danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control profile_edit light"
                    placeholder="Enter Confirm Password"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <a href="#" className="back_login ">
                 
                </a>
                <div className="select-btn ">
                  <button
                    className="gap_6 primary_btn"
                    data-bs-target="#password_update"
                    data-bs-toggle="modal"
                  >
                    Change Password
                  </button>
                  <img src="assets/images/svg2/lock2.svg" className="add_btn" />
                </div>
              </div>
            </div>
          </div>
          {/* Change Password tabs end */}
        </div>
      </div>
    </div>
  );
}

export default profilepage;
