/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SideBar = () => {
  const navigate = useNavigate();
  const sideBarId = {
    classmaster: "dashboard",
    subjectmaster: "subjectmaster",
    studymaterialadd: "addstudymaterial",
    questionbank: "question",
  };

  useEffect(() => {
    const path = window.location.pathname.split("/")[1];
    if (path.includes("addstudymaterial") || path.includes("studymaterial")) {
      document.getElementById("addstudymaterial")?.click();
    } else if (
      path.includes("bulkupload") ||
      path.includes("question") ||
      path.includes("addquestion")
    ) {
      document.getElementById("question")?.click();
    } else {
      document.getElementById(path)?.click();
    }

    // console.log(path)
  }, []);

  return (
    // <!-- SIDEBAR START -->

    <>
      <div className="sidebar">
        <div className="logo">
          <img src="assets/images/temp_img/logo2-1 1.png" />
        </div>
        <div className="sidebar_navbar">
          {/* <!-- Getting Started Accordian --> */}
          <div className="accordion" id="accordionExample">
            {/* <!-- sidebar start --> */}

            {/* <!-- Class Master --> */}
            <div className="accordion-item selectSection">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed mb-0 class"
                  data-number="1"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  id={sideBarId.classmaster}
                  aria-controls="collapseOne"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  <img
                    src="assets/images/svg2/s1.svg"
                    className="accordian_svg"
                  />
                  Class Master
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse"
                data-bs-parent="#accordionExample"
              ></div>
            </div>

            {/* <!-- Subject Master --> */}
            <div className="accordion-item selectSection">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed mb-0 class"
                  data-number="2"
                  type="button"
                  id={sideBarId.subjectmaster}
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  onClick={() => {
                    navigate("/subjectmaster");
                  }}
                >
                  <img
                    src="assets/images/svg2/s1.svg"
                    className="accordian_svg"
                  />
                  Subject Master
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              ></div>
            </div>

            {/* <!-- Study Material --> */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed mb-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                  id={sideBarId.studymaterialadd}
                >
                  <img
                    src="assets/images/svg2/s1.svg"
                    className="accordian_svg"
                  />
                  Study Material
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div className="selectSection select_option">
                    <button
                      type="button"
                      data-number="3"
                      onClick={() => {
                        navigate("/addstudymaterial");
                      }}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      data-number="4"
                      onClick={() => {
                        navigate("/studymaterial");
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Question Bank --> */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed mb-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                  id={sideBarId.questionbank}
                >
                  <img
                    src="assets/images/svg2/s1.svg"
                    className="accordian_svg"
                  />
                  Question Bank
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div className="selectSection select_option">
                    <button
                      type="button"
                      data-number="5"
                      onClick={() => {
                        navigate("/addquestion");
                      }}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      data-number="6"
                      onClick={() => {
                        navigate("/question");
                      }}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      data-number="7"
                      onClick={() => {
                        navigate("/bulkupload");
                      }}
                    >
                      Bulk Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
