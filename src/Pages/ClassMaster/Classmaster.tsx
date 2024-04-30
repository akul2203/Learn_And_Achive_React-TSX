/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-sequences */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect, ChangeEvent } from "react";
import ChangePasswordModel from "../../Components/ReUsableModels/ApplicationReqquired/ChangePasswordModel";
import classmaster from "../../Payloads/classmaster";
import { classservice } from "../../Services/ClassServices/classservice";
import Pagination from "../../Components/ReUsableModels/ApplicationReqquired/Pagination";
import AddClss from "../../Components/ReUsableModels/ClassmasterComps/AddClss";
import EditClass from "../../Components/ReUsableModels/ClassmasterComps/EditClass";
import DeleteModel from "../../Components/ReUsableModels/ApplicationReqquired/DeleteModel";

declare var butterup: any;
function Classmaster() {
  const [classes, setClasses] = useState<classmaster[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalpages, setTotalpages] = useState(0);
  const itemsPerPage = 5;
  const [firstpage, setfirstpage] = useState(true);
  const [lastpage, setlastpage] = useState(true);
  const [numberOfElements, setnumberOfElements] = useState(0);
  const [classEditData, setEditState] = useState<classmaster>();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);
  const [selectedClassIds, setSelectedClassIds] = useState<number[]>([]);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteid, setdeleteid] = useState(0);
  let debounceTimeout: NodeJS.Timeout;
  const [test, settest] = useState(0);

  const [searchname, setSearchName] = useState<string>("");

  useEffect(() => {
    if (searchname === "") {
      fetchData();
    }
    // console.log(numberOfElements);
    if (searchname !== "") {
      searchClasses();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isDeleteModalVisible, searchname,test]);

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setSearchName(value);
  };

  const closeModel = (data: any) => {
    setSearchName("");
    settest(1);
    document.getElementById(data)?.click();
  };

  function fetchData() {
    classservice.getclasses(currentPage, 5, "id").then(
      (data: any) => {
        setClasses(data.data.content);
        setTotalItems(data.data.totalElements);
        setTotalpages(data.data.totalPages);
        setfirstpage(data.data.first);
        setlastpage(data.data.last);
        setnumberOfElements(data.data.numberOfElements);
      },
      (error: any) => {
        console.log("error at fetching classes");
        alert("server error");
      }
    );
    const totalPages: number = Math.ceil(totalItems / 5);
  }

  const searchClasses = () => {
    if (searchname === "") {
      fetchData();
    } else {
      classservice.searchclass(searchname).then(
        (data: any) => {
          setClasses(data.data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  function handleClassStatusChange(id: number, status: any): void {
    classservice.togglestatus(id).then(
      (data: any) => {
        butterup.toast({
          title: "Status!",
          message: "Status Changed.",
          location: "top-right",
          dismissable: true,
          type: "success",
          toastLife: 200,
        });
        const updatedClasses = classes.map((cls) =>
          cls.id === id ? { ...cls, classStatus: !status } : cls
        );
        setClasses(updatedClasses);
      },
      (error: any) => {
        alert(error.message);
      }
    );
  }

  function setEditData(cls: any): void {
    setEditState(cls);
  }

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      setSelectedCheckboxes(
        Array.from({ length: classes.length }, (_, index) => index)
      );
      setSelectedClassIds(classes.map((cls) => cls.id));
    } else {
      setSelectedCheckboxes([]);
      setSelectedClassIds([]);
    }
  };

  const handleCheckboxChange = (index: number, classId: number) => {
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

    const updatedSelectedClassIds = [...selectedClassIds];
    if (updatedSelectedCheckboxes.includes(index)) {
      updatedSelectedClassIds.push(classId);
    } else {
      const classIdIndex = updatedSelectedClassIds.indexOf(classId);
      if (classIdIndex !== -1) {
        updatedSelectedClassIds.splice(classIdIndex, 1);
      }
    }
    setSelectedClassIds(updatedSelectedClassIds);
  };

  const deletebysingleidimpl = (id: any) => {
    classservice.DeleteClass(deleteid).then(
      (data: any) => {
        fetchData();
        setdeleteid(0);
        butterup.toast({
          title: "Deleted!",
          message: "Delete Succcessfully.",
          location: "top-right",
          dismissable: false,
          type: "success",
        });
      },
      (error: any) => {
        alert(error.message);
        setdeleteid(0);
      }
    );
  };
  const deletebyListofclasses = () => {
    classservice.DeleteSelectedClassess(selectedClassIds).then(
      (data: any) => {
        fetchData();
        butterup.toast({
          title: "Deleted!",
          message: "Deleted Successfully.",
          location: "top-right",
          dismissable: true,
          type: "success",
        });
        setdeleteid(0);
      },
      (error: any) => {
        alert(error.message);
        setdeleteid(0);
      }
    );
  };

  const handleDeleteConfirmation = (id?: any) => {
    if (deleteid === 0) {
      deletebyListofclasses();
    } else {
      deletebysingleidimpl(id);
    }
    setDeleteModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
    setdeleteid(0);
  };

  return (
    <>
      <div className="content" data-number={1}>
        <div className="mb-4 d-flex justify-content-between">
          <h1 className="fs-18 fw-600 mb-0">Class Master</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="#">Dashboard</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Class Master
              </li>
            </ol>
          </nav>
        </div>

        <div className="table_container table-responsive">
          <div className="Officer_table">
            <div className="table_headings">
              <h4 className="fs-20 fw-600 dark mb-0">Class List</h4>
              <div className="d-flex gap_30">
                <div className="position-relative">
                  <input
                    type="search"
                    className="search_box search_bar"
                    placeholder="Search"
                    value={searchname}
                    onChange={handleInputChange}
                  />
                  <i className="fi fi-br-search search_icon gray"></i>
                </div>
                <div className="select-btn">
                  <button
                    className="gap_6 primary_btn"
                    data-bs-target="#addclass"
                    data-bs-toggle="modal"
                  >
                    Add Class{" "}
                  </button>
                  <img
                    src="assets/images/svg_img/plus.svg"
                    className="add_btn"
                    alt="Add Button"
                  />
                </div>
              </div>
            </div>
            <div
              className="table_delete_icon"
              onClick={() =>
                selectedClassIds.length > 0 && setDeleteModalVisible(true)
              }
              style={{
                backgroundColor: selectedClassIds.length > 0 ? "#ae0505" : "",
              }}
            >
              <img
                src="assets/images/svg2/delete2.svg"
                className={selectedClassIds.length > 0 ? "dark" : "light"}
              />
            </div>
          </div>
          <div style={{ overflowX: "auto", marginTop: 20 }}>
            <table
              className="table mb-0"
              id="dtHorizontalExample"
              cellSpacing={0}
              width="100%"
            >
              <thead>
                <tr className="table_heading">
                  <th scope="col">
                    <label className="container">
                      <input
                        type="checkbox"
                        checked={selectedClassIds.length >= numberOfElements}
                        onChange={toggleSelectAll}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </th>
                  <th scope="col">Sr No.</th>
                  <th scope="col">Class Id</th>
                  <th scope="col">Class</th>
                  <th scope="col">Class End Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="bg_light">
                {classes.map((cls, ind) => (
                  <tr key={cls.id}>
                    <td>
                      <label className="container">
                        <input
                          type="checkbox"
                          checked={selectedCheckboxes.includes(ind)}
                          onChange={() => handleCheckboxChange(ind, cls.id)}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </td>
                    <td>{ind + 1}</td>
                    <td>{cls.id}</td>
                    <td>{cls.className}</td>
                    <td>{cls.classEndDate}</td>

                    <td>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={cls.classStatus}
                          onChange={() =>
                            handleClassStatusChange(cls.id, cls.classStatus)
                          }
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td>
                      <div className="d-flex gap_8">
                        <a
                          href="user-details.html"
                          className="edit_icons"
                          data-bs-target="#editclass"
                          data-bs-toggle="modal"
                          onClick={() => {
                            setEditData(cls);
                          }}
                        >
                          <img
                            src="assets/images/svg2/edit.svg"
                            className="add_icons"
                          />
                        </a>
                        <a
                          className="delete_icons"
                          onClick={() => {
                            setDeleteModalVisible(true), setdeleteid(cls.id);
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
              totalPages={totalpages}
              first={firstpage}
              last={lastpage}
              numberOfElements={numberOfElements}
              isvisible={searchname === ""}
            />
          </div>
        </div>
      </div>

      <AddClss onClose={(e: any) => closeModel(e)} />
      <EditClass
        classData={classEditData}
        onClose={(e: any) => closeModel(e)}
      />

      <ChangePasswordModel />
      <DeleteModel
        isVisible={isDeleteModalVisible}
        onConfirm={handleDeleteConfirmation}
        onCancel={handleDeleteCancel}
      />
    </>
  );
}

export default Classmaster;
