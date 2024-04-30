/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { classservice } from "../../../Services/ClassServices/classservice";

export interface Classmaster {
  className: string;
  classEndDate: string;
}

function AddClss(props: any) {
  const [classData, setClassData] = useState<Classmaster>({
    className: "",
    classEndDate: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClassData({ ...classData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted class data:", classData);
    classservice.addclass(classData).then((response: any) => {
      console.log(response);
    });
    // Reset the form after submission
    props.onClose("addClose");
    setClassData({ className: "", classEndDate: "" });
  };

  return (
    <div className="modal fade" id="addclass" aria-modal="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header p-0">
              <h2 className="fs-20 fw-600 black mb-4">Add Class</h2>
              <button
                type="button"
                className="close_btn d-flex justify-content-end mb-2"
                id="addClose"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fi fi-rr-cross-circle"></i>
              </button>
            </div>
            <div className="modal-body p-0">
              <div className="mb-4">
                <div className="">
                  <div className="col-md-12 mb-3 ps-0 px-2">
                    <label htmlFor="className" className="modal_input_heading">
                      Class<span className="danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="className"
                      name="className"
                      className="form-control profile_edit"
                      placeholder="Enter class"
                      value={classData.className}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-12 mb-3 ps-0 px-2">
                    <label
                      htmlFor="classEndDate"
                      className="modal_input_heading"
                    >
                      Class End Date<span className="danger">*</span>
                    </label>
                    <input
                      type="date"
                      id="classEndDate"
                      name="classEndDate"
                      className="form-control profile_edit light"
                      placeholder="Enter end date"
                      value={classData.classEndDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer p-0 ">
              <div className="select-btn ">
                <button type="submit" className="gap_6 primary_btn">
                  Add
                </button>
                <img src="assets/images/svg_img/plus.svg" className="add_btn" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddClss;
