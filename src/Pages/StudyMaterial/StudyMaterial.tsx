/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useNavigate } from 'react-router-dom';

function StudyMaterial() {

  const navigate = useNavigate();
  return (
    <>
      <div className="content" data-number="4">
        <div className="mb-4 d-flex justify-content-between">
          <h1 className="fs-18 fw-600 mb-0">STUDY MATERIAL</h1>
          <nav
            
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
              <li className="breadcrumb-item active" aria-current="page">Study Material</li>
            </ol>
          </nav>
        </div>

        {/* table list */}
        <div className="table_container table-responsive" style={{ display: 'block' }}>
          <div className="table_title">
            <div className="table_headings">
              <h4 className="fs-20 fw-600 dark mb-0">Add Study Material</h4>
              <div className="d-flex gap_30">
                <div className="position-relative">
                  <input type="search" className="search_box search_bar" placeholder="Search subject" />
                  <i className="fi fi-br-search search_icon gray"></i>
                </div>
                <div className="select-btn">
                  <button className="gap_6 primary_btn"   onClick={() => {
                    navigate("/addstudymaterial");
                  }}>Add Study Material</button>
                  <img src="assets/images/svg_img/plus.svg" className="add_btn" alt="Add Button" />
                </div>
              </div>
            </div>
            <div className="table_delete_icon">
              <img src="assets/images/svg2/delete2.svg" alt="Delete Icon" />
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="table mb-0" id="dtHorizontalExample" cellSpacing="0" width="100%">
              <thead>
                <tr className="table_heading">
                  <th scope="col" style={{ width: '10%' }}>
                    <label className="container">
                      <input type="checkbox" checked />
                      <span className="checkmark"></span>
                    </label>
                  </th>
                  <th scope="col" style={{ width: '15%' }}>Sr No.</th>
                  <th scope="col" style={{ width: '15%' }}>Class</th>
                  <th scope="col" style={{ width: '15%' }}>Medium</th>
                  <th scope="col" style={{ width: '15%' }}>Subject</th>
                  <th scope="col" style={{ width: '15%' }}>Status</th>
                  <th scope="col" style={{ width: '15%' }}>Action</th>
                </tr>
              </thead>
              <tbody className="bg_light">
                {/* Tables rows right  here */}
              </tbody>
            </table>
            <nav aria-label="Page navigation example" className="table-pagination">
              <p className="text_dark fs-16 fw-600 mb-0">Showing 1 to 1 of 1 entries</p>
              <ul className="pagination mb-0">
                <li className="p-2 mx-2 ms-0"><a className="fs-16 fw-500 secondary" href="#">Previous</a></li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">4</a></li>
                <li className="page-item"><a className="page-link" href="#">5</a></li>
                <li className="p-2 mx-0 ms-2"><a className="fs-16 fw-500 secondary" href="#">Next</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudyMaterial;
