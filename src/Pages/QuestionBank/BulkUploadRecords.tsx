/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import BulkUploadModal from "../../Components/ReUsableModels/ApplicationReqquired/BulkUploadModel";

function BulkUploadRecords() {
  return (
    <>
      {" "}
      <div className="content" data-number="7">
        <div className="mb-4 d-flex justify-content-between">
          <h1 className="fs-18 fw-600 mb-0">QUESTION BANK</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="#">Dashboard</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Question Bank
              </li>
            </ol>
          </nav>
        </div>

        {/* <!-- table list --> */}
        <div
          className="table_container table-responsive"
          style={{ display: "block" }}
        >
          <div className="table_title">
            <h4 className="fs-20 fw-600 dark mb-2">Parameter - Bulk Uploads</h4>
          </div>
          <div className="d-flex gap_30">
            {" "}
            <div className="select-btn ">
              <button
                className="gap_6 primary_btn"
                data-bs-target="#BulkUpload"
                data-bs-toggle="modal"
              >
                Bulk Upload
              </button>
              <img
                src="assets/images/svg_img/plus.svg"
                className="add_btn"
                alt="add"
              />
            </div>
          </div>
          <div style={{ overflow: "auto" }}>
            <table
              className="table mb-0"
              id="dtHorizontalExample"
              cellSpacing="0"
              width="100%"
            >
              <thead>
                <tr className="table_heading">
                  <th scope="col" style={{ width: "10%" }}>
                    Sr No.
                  </th>
                  <th scope="col" style={{ width: "25%" }}>
                    File Name
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Timing
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Timing
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    Total Count
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    Success Count
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Fail Count
                  </th>
                </tr>
              </thead>
              <tbody className="bg_light">
                <tr>
                  <td>1</td>
                  <td>parameterbulkupload.xlsx</td>
                  <td>19-03-2024</td>
                  <td>01:39 PM</td>
                  <td>3</td>
                  <td>2 </td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>parameterbulkupload.xlsx</td>
                  <td>19-03-2024</td>
                  <td>01:39 PM</td>
                  <td>3</td>
                  <td>2 </td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
            <h4 className="count">Total Count: 2</h4>
          </div>
        </div>
      </div>
      <BulkUploadModal />
    </>
  );
}

export default BulkUploadRecords;
