/* eslint-disable no-sequences */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import BulkUploadModal from "../../Components/ReUsableModels/ApplicationReqquired/BulkUploadModel";
import { useNavigate } from "react-router-dom";
import subjectmasterentity from "../../Payloads/classmasterentity";
import { QuestionBankRequest } from "../../Payloads/QuestionBankRequest";

import DeleteModel from "../../Components/ReUsableModels/ApplicationReqquired/DeleteModel";
import Pagination from "../../Components/ReUsableModels/ApplicationReqquired/Pagination";
import { subjectservice } from "../../Services/SubjectService/subjectservice";
import { QuestionBankService } from "../../Services/QuestionBankandList/QuestionBankService";

function Questionbank() {
  const [Qbank, setQbank] = useState<QuestionBankRequest[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;
  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(true);
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);
  const [selectedbankids, setSelectedbankIds] = useState<number[]>([]);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  const handleClassStatusChange = (id: number, status: boolean) => {
    // Implement functionality to change subject status
    alert("Subject ID:" + id + "Status:" + status);
    console.log("Subject ID:", id, "Status:", status);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isDeleteModalVisible]);

  function fetchData() {
    QuestionBankService.getQbanks(currentPage, 5, "id").then(
      (data) => {
        setQbank(data.data.content);
        setTotalItems(data.data.totalElements);
        setTotalPages(data.data.totalPages);
        setFirstPage(data.data.first);
        setLastPage(data.data.last);
        setNumberOfElements(data.data.numberOfElements);
      },
      (error: any) => {
        alert(error.message);
      }
    );
  }

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      setSelectedCheckboxes(
        Array.from({ length: Qbank.length }, (_, index) => index)
      );
      setSelectedbankIds(Qbank.map((bank) => bank.id));
    } else {
      setSelectedCheckboxes([]);
      setSelectedbankIds([]);
    }
  };

  const handleCheckboxChange = (index: number, subjectId: number) => {
    const updatedSelectedCheckboxes = [...selectedCheckboxes];
    if (updatedSelectedCheckboxes.includes(index)) {
      updatedSelectedCheckboxes.splice(
        updatedSelectedCheckboxes.indexOf(index),
        1
      );
    } else {
      updatedSelectedCheckboxes.push(index);
    }
    setSelectedCheckboxes(updatedSelectedCheckboxes);

    const updatedSelectedSubjectIds = [...selectedbankids];
    if (updatedSelectedCheckboxes.includes(index)) {
      updatedSelectedSubjectIds.push(subjectId);
    } else {
      const subjectIdIndex = updatedSelectedSubjectIds.indexOf(subjectId);
      if (subjectIdIndex !== -1) {
        updatedSelectedSubjectIds.splice(subjectIdIndex, 1);
      }
    }
    setSelectedbankIds(updatedSelectedSubjectIds);
  };

  const handleDeleteConfirmation = (id?: number) => {
    // Implement delete functionality
    console.log("Deleting Subject with ID:", id);
    setDeleteModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
    setDeleteId(0);
  };
  const closeModel = async (data: any) => {
    try {
      //   await fetchData();
      document.getElementById(data)?.click();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const navigate = useNavigate();
  return (
    <div className="content" data-number="6">
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

      <div
        className="table_container table-responsive"
        style={{ display: "block" }}
      >
        <div className="table_title">
          <h4 className="fs-20 fw-600 dark mb-4">View Question Banks </h4>

          <div className="table_headings">
          <div
              className="table_delete_icon"
              onClick={() =>
                selectedbankids.length > 0 && setDeleteModalVisible(true)
              }
              style={{
                backgroundColor: selectedbankids.length > 0 ? "#ae0505" : "",
              }}
            >
              <img
                src="assets/images/svg2/delete2.svg"
                className={selectedbankids.length > 0 ? "dark" : "light"}
              />
            </div>
            <div className="d-flex gap_30">
              <div className="position-relative">
                <input
                  type="search"
                  className="search_box search_bar"
                  placeholder="Search class, language, subject"
                />
                <i className="fi fi-br-search search_icon gray"></i>
              </div>
              <div className="select-btn ">
                <button
                  className="gap_6 primary_btn"
                  onClick={() => {
                    navigate("/addquestion");
                  }}
                >
                  Add Question Bank
                </button>
                <img
                  src="assets/images/svg_img/plus.svg"
                  className="add_btn"
                  alt="add"
                />
              </div>
          
            </div>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            className="table mb-0"
            id="dtHorizontalExample"
            cellSpacing="0"
            width="100%"
          >
            <thead>
              <tr className="table_heading">
                <th scope="col">
                  <label className="container">
                    <input
                      type="checkbox"
                      checked={selectedbankids.length > 4}
                      onChange={toggleSelectAll}
                    />
                    <span className="checkmark"></span>
                  </label>
                </th>
                <th scope="col" style={{ width: "10%" }}>
                  Sr No.
                </th>
                <th scope="col" style={{ width: "10%" }}>
                  bank id.
                </th>
                <th scope="col" style={{ width: "10%" }}>
                  Class
                </th>
                <th scope="col" style={{ width: "15%" }}>
                  Medium/type
                </th>
                <th scope="col" style={{ width: "15%" }}>
                  Subject
                </th>
                <th scope="col" style={{ width: "10%" }}>
                  Status
                </th>
                <th scope="col" style={{ width: "10%" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg_light">
              {Qbank.map((bank, index) => (
                <tr key={bank.id}>
                  <td>
                    <label className="container">
                      <input
                        type="checkbox"
                        checked={selectedCheckboxes.includes(index)}
                        onChange={() => handleCheckboxChange(index, bank.id)}
                      />
                 
                    </label>
                  </td>
                  <td>{index + 1}</td>
                  <td>{bank.id}</td>
                  <td>{bank?.classMaster.className}</td>
                  <td>{bank.questionType}</td>
                  <td>{bank?.subjectMaster.subjectName}</td>

                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={bank.status}
                        onChange={() =>
                          handleClassStatusChange(bank.id, bank.status)
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                  <td>
                    <div className="d-flex gap_8">
                   
                      <a
                        href="#"
                        className="edit_icons"
                        data-bs-target="#EditSubject"
                        data-bs-toggle="modal"
                        //    onClick={() => setEditSubjectData(bank)}
                      >
                        <img
                          src="assets/images/temp_img/back.png"
                          className="add_icons"
                          alt="Edit"
                        />
                      </a>
                      <a
                        href="#"
                        className="edit_icons"
                        data-bs-target="#EditSubject"
                        data-bs-toggle="modal"
                        //   onClick={() => setEditSubjectData(bank)}
                      >
                        <img
                          src="assets/images/svg2/edit.svg"
                          className="add_icons"
                          alt="Edit"
                        />
                      </a>
                      <a
                        className="delete_icons"
                        onClick={() => {
                          setDeleteModalVisible(true), setDeleteId(bank.id);
                        }}
                      >
                        <img
                          src="assets/images/svg2/delete.svg"
                          data-bs-target="#delete-modal"
                        />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            first={firstPage}
            last={lastPage}
            numberOfElements={numberOfElements} isvisible={false}          />
          <DeleteModel
            isVisible={isDeleteModalVisible}
            onConfirm={handleDeleteConfirmation}
            onCancel={handleDeleteCancel}
          />
        </div>
      </div>
    
    </div>
  );
}

export default Questionbank;
