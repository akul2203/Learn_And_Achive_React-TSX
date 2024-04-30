import React, { useEffect, useState } from "react";
import { subjectservice } from "../../../Services/SubjectService/subjectservice";
import subjectmasterentity from "../../../Payloads/classmasterentity";

function EditSubject(props: any) {
  const [SubjectData, setSubjectData] = useState<subjectmasterentity | undefined>(
    undefined
  );

  useEffect(() => {
    setSubjectData(props.subjectData);
  }, [props.subjectData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubjectData((prevSubjectData) => ({
      ...prevSubjectData!,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (SubjectData) {
      subjectservice.updatesubject(SubjectData, SubjectData.id).then(
        (data: any) => {
          console.log("DATA :: ", data);
        },
        (error: any) => {}
      );
    }
    setSubjectData(undefined);
    props.onClose("subjecteditclose");
  };

  return (
    <div
      className="modal fade"
      id="EditSubject"
      aria-labelledby="exampleModalToggleLabel2"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header p-0">
              <h2 className="fs-20 fw-600 black mb-4">Edit Subject</h2>
              <button
                type="button"
                className="close_btn d-flex justify-content-end mb-2"
                data-bs-dismiss="modal"
                id="subjecteditclose"
                aria-label="Close"
              >
                <i className="fi fi-rr-cross-circle"></i>
              </button>
            </div>
            <div className="modal-body p-0">
              <div className="mb-4">
                <div className="col-md-12 mb-3 ps-0 px-2">
                  <label htmlFor="subjectName" className="modal_input_heading">
                    Subject<span className="danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="subjectName"
                    name="subjectName"
                    className="form-control profile_edit"
                    placeholder={props.subjectData?.subjectName}
                    value={SubjectData?.subjectName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer p-0">
              <div className="select-btn">
                <button type="submit" className="gap_6 primary_btn">
                  Update
                </button>
                <img src="assets/images/svg_img/plus.svg" className="add_btn" alt="Add" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditSubject;
