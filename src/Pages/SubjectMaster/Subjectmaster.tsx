/* eslint-disable no-sequences */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Pagination from "../../Components/ReUsableModels/ApplicationReqquired/Pagination";
import AddSubject from "../../Components/ReUsableModels/SubjectmasterComps/AddSubject";

 import DeleteModel from "../../Components/ReUsableModels/ApplicationReqquired/DeleteModel";
import EditSubject from "../../Components/ReUsableModels/SubjectmasterComps/EditSubject";
import { subjectservice } from "../../Services/SubjectService/subjectservice";
import subjectmasterentity from "../../Payloads/classmasterentity";

interface Subject {
  id: number;
  name: string;
  status: boolean;
}

function Subjectmaster() {
  const [subjects, setSubjects] = useState<subjectmasterentity[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;
  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(true);
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [subjectEditData, setEditData] = useState<Subject>();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<number[]>([]);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [searchname, setSearchName] = useState<string>("");
  const [test, settest] = useState(0);
  useEffect(() => {
    if (searchname === ""){fetchData();} 
    // console.log(numberOfElements);
    if (searchname !== "") {searchSubject();}

  }, [currentPage, isDeleteModalVisible,searchname,test]);

  function fetchData() {
 
    subjectservice.getsubjects(currentPage,5,'id').then((data)=>{
      setSubjects(data.data.content);
      setTotalItems(data.data.totalElements);
      setTotalPages(data.data.totalPages);
      setFirstPage(data.data.first);
      setLastPage(data.data.last);
      setNumberOfElements(data.data.numberOfElements);
    },(error:any)=>{
alert(error.message)
    })
  }

  const handlesearchInputChange = (e: any) => {
    const { value } = e.target;
    setSearchName(value);
  };

  const searchSubject = () => {
    if (searchname === "") {
      fetchData();
    } else {
      subjectservice.searchsubject(searchname).then(
        (data: any) => {
          setSubjects(data.data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  const handleClassStatusChange = (id: number, status: boolean) => {
    // Implement functionality to change subject status
    alert("Subject ID:"+ id+"Status:"+status)
    console.log("Subject ID:", id, "Status:", status);
  };

  const setEditSubjectData = (subject: any) => {
    setEditData(subject);
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      setSelectedCheckboxes(Array.from({ length: subjects.length }, (_, index) => index));
      setSelectedSubjectIds(subjects.map((subject) => subject.id));
    } else {
      setSelectedCheckboxes([]);
      setSelectedSubjectIds([]);
    }
  };

  const handleCheckboxChange = (index: number, subjectId: number) => {
    const updatedSelectedCheckboxes = [...selectedCheckboxes];
    if (updatedSelectedCheckboxes.includes(index)) {
      updatedSelectedCheckboxes.splice(updatedSelectedCheckboxes.indexOf(index), 1);
    } else {
      updatedSelectedCheckboxes.push(index);
    }
    setSelectedCheckboxes(updatedSelectedCheckboxes);

    const updatedSelectedSubjectIds = [...selectedSubjectIds];
    if (updatedSelectedCheckboxes.includes(index)) {
      updatedSelectedSubjectIds.push(subjectId);
    } else {
      const subjectIdIndex = updatedSelectedSubjectIds.indexOf(subjectId);
      if (subjectIdIndex !== -1) {
        updatedSelectedSubjectIds.splice(subjectIdIndex, 1);
      }
    }
    setSelectedSubjectIds(updatedSelectedSubjectIds);
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
    settest(1);
      document.getElementById(data)?.click();
 
  };
  

  return (
    <>
      <div className="content" data-number="2">
        <div className="mb-4 d-flex justify-content-between">
          <h1 className="fs-18 fw-600 mb-0">Subject Master</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="#">Dashboard</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Subject Master
              </li>
            </ol>
          </nav>
        </div>

        <div className="table_container table-responsive" style={{ display: "block" }}>
          <div className="table_title">
            <div className="table_headings">
              <h4 className="fs-20 fw-600 dark mb-0">Subjects list</h4>
              <div className="d-flex gap_30">
                <div className="position-relative">
                <input
                    type="search"
                    className="search_box search_bar"
                    placeholder="Search"
                    value={searchname}
                    onChange={handlesearchInputChange}
                  />
                  <i className="fi fi-br-search search_icon gray"></i>
                </div>
                <div className="select-btn">
                  <button
                    className="gap_6 primary_btn"
                    data-bs-target="#AddSubject"
                    data-bs-toggle="modal"
                  >
                    Add Subject
                  </button>
                  <img
                    src="assets/images/svg_img/plus.svg"
                    className="add_btn"
                    alt="Add"
                  />
                </div>
              </div>
            </div>
            <div
              className="table_delete_icon"
              onClick={() =>
                selectedSubjectIds.length > 0 && setDeleteModalVisible(true)
              }
              style={{
                backgroundColor: selectedSubjectIds.length > 0 ? "#ae0505" : "",
              }}
            >
              <img
                src="assets/images/svg2/delete2.svg"
                className={selectedSubjectIds.length > 0 ? "dark" : "light"}
              />
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
                <th scope="col" style={{ width: "20%" }}>
                    <label className="container">
                      <input
                        type="checkbox"
                        checked={selectedSubjectIds.length > 4}
                        onChange={toggleSelectAll}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    Sr No.
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    Subject Id.
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    Subject
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    Status
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg_light">
                {subjects.map((subject, index) => (
                  <tr key={subject.id}>
                    <td>
                      <label className="container">
                        <input
                          type="checkbox"
                          checked={selectedCheckboxes.includes(index)}
                          onChange={() => handleCheckboxChange(index, subject.id)}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </td>
                    <td>{index +1}</td>
                    <td>{subject.id}</td>
                    <td>{subject?.subjectName}</td>
                    <td>
                    <label className="switch">
                        <input
                          type="checkbox"
                          checked={subject.subjectStatus}
                          onChange={() =>
                            handleClassStatusChange(subject.id, subject.subjectStatus)
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
                          onClick={() => setEditSubjectData(subject)}
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
                            setDeleteModalVisible(true), setDeleteId(subject.id);
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
            isvisible={searchname===""}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              first={firstPage}
              last={lastPage}
              numberOfElements={numberOfElements}
            />
          </div>
        </div>
      </div>
      
      <AddSubject onClose={(e: any) => closeModel(e)} />
      <EditSubject subjectData={subjectEditData} onClose={(e: any) => closeModel(e)} />
      
      <DeleteModel
        isVisible={isDeleteModalVisible}
        onConfirm={handleDeleteConfirmation}
        onCancel={handleDeleteCancel}
      />
    </>
  );
}

export default Subjectmaster;
