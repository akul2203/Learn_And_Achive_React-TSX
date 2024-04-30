/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useState } from "react";

import AddModuleModel from "../../Components/ReUsableModels/Moduless/AddModuleModel";
import ModulePayload from "../../Payloads/ModulePayload";
import TopicPayload from "../../Payloads/TopicPayload";
import StudyMaterialPayload from "../../Payloads/StudyMaterialPayload";
import { classservice } from "../../Services/ClassServices/classservice";
import classmaster from "../../Payloads/classmaster";
import { subjectservice } from "../../Services/SubjectService/subjectservice";
import subjectmasterentity from "../../Payloads/classmasterentity";
import { studymaterialservice } from "../../Services/studymaterial/studymaterialservice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AddStudyMaterial() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [classlist, setclasslist] = useState<classmaster[]>([]);
  const [selectedClass, setSelectedClass] = useState<classmaster>();
  const [selectedSubject, setSelectedSubject] = useState<subjectmasterentity>();
  const [subjectlist, setsubjectList] = useState<subjectmasterentity[]>([]);
  const [showModuleForm, setShowModuleForm] = useState(true);
  const [showTopicForm, setShowTopicForm] = useState(false);
  const [moduleList, setModuleList] = useState<ModulePayload[]>([]);
  const [studymaterials, setstudymaterials] = useState<StudyMaterialPayload>();
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
  const [topicName, setTopicName] = useState("");
  const [details, setDetails] = useState("");
  const [link, setLink] = useState("");

  const navigate = useNavigate();
  // methods for  get data for selection in form
  useEffect(() => {
    getallclasses();
    getallsubject();
  }, []);

  const defaultSubject: subjectmasterentity = {
    id: 0,
    subjectName: "",
    subjectStatus: false,
  };
  const defaultClass: classmaster = {
    id: 0,
    className: "",
    classEndDate: "",
    classStatus: false,
  };

  //build finalm form for submission
  function finalformsubmission() {
    const studymaterial: StudyMaterialPayload = {
      medium: selectedLanguage,
      classMaster: selectedClass || defaultClass,
      subjectMaster: selectedSubject || defaultSubject,
      modules: moduleList,
    };
    if (
      studymaterial.classMaster !== null ||
      studymaterial.subjectMaster !== null ||
      studymaterial.medium !== null ||
      studymaterial.modules !== null
    ) {
      studymaterialservice.submitformstudymaterial(studymaterial).then(
        (data: any) => {
          console.log(data);
          Swal.fire('Saved Successfully','Study Material Saved Successfully','success').then((data:any)=>{
       
            navigate('/studymaterial')
            window.location.reload();
          })
         
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      Swal.fire("incomplete   ", "first complete form", "warning");
    }

    console.log(studymaterial);
  }

  // get all classes
  function getallclasses() {
    classservice.getallclasses().then(
      (data: any) => {
        console.log(data.data);
        setclasslist(data.data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //get all Subjects

  function getallsubject() {
    subjectservice.getAllsubjects().then(
      (data: any) => {
        setsubjectList(data.data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // const moduleindex:number;
  ///prepare modules here

  const handleAddTopic = () => {
    if (selectedModuleIndex !== null) {
      const newTopic: TopicPayload = {
        topicName: topicName,
        details: details,
        link: link,
      };

      const updatedModuleList = [...moduleList];
      updatedModuleList[selectedModuleIndex].topics.push(newTopic);

      // Update the moduleList state with the new topic
      // setModuleList(updatedModuleList);

      // Clear input fields after adding topic
      setTopicName("");
      setDetails("");
      setLink("");
    }
  };

  // const addTopicToModule = (moduleIndex: number, topic: TopicPayload) => {
  //   setModuleList((prevModuleList) =>
  //     prevModuleList.map((module, index) =>
  //       index === moduleIndex
  //         ? { ...module, topics: [...module.topics, topic] }
  //         : module
  //     )
  //   );
  // };

  const handleCallback = (modulename: any) => {
    const newModule: ModulePayload = {
      moduleName: modulename,
      topics: [],
    };
    addModule(newModule);
    document.getElementById("abcd")?.click();
  };

  const addModule = (moduleToAdd: ModulePayload) => {
    setModuleList((prevModuleList) => {
      const updatedModuleList = [...prevModuleList, moduleToAdd];
      console.log("MODULES ::", updatedModuleList);
      return updatedModuleList;
    });
  };

  const handleShowModuleForm = () => {
    setShowModuleForm(true);
    setShowTopicForm(false);
  };

  const handleShowTopicForm = (ind: any) => {
    console.log("INDEX :: ", ind);

    setSelectedModuleIndex(ind);
    setShowModuleForm(false);
    setShowTopicForm(true);
  };

  const languages = [
    { id: 1, name: "English" },
    { id: 2, name: "Hindi" },
    { id: 3, name: "Nimadi" },
  ];

  const handleSelectChangesubject = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedsubjectid = parseInt(event.target.value); // Convert the value to a number if needed
    const selectedsubject = subjectlist.find(
      (subjectitem) => subjectitem.id === selectedsubjectid
    );
    setSelectedSubject(selectedsubject);
  };
  const handleSelectChangelanguage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSelectChangeclass = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedClassId = parseInt(event.target.value); // Convert the value to a number if needed
    const selectedClass = classlist.find(
      (classItem) => classItem.id === selectedClassId
    );
    setSelectedClass(selectedClass);
  };
  function checksubmission() {
    finalformsubmission();
  }
  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
    console.log("STEP", currentStep);
    if (currentStep === 2) {
      checksubmission();
    }
  };

  const handlePrevStep = () => {
    setSelectedModuleIndex(0);
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      <div className="content" data-number="3">
        <div className="mb-4 d-flex justify-content-between">
          <h1 className="fs-18 fw-600 mb-0">STUDY MATERIAL</h1>
          <nav>
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="#">Dashboard</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Study Material
              </li>
            </ol>
          </nav>
        </div>
        <div className="main_content_box position-relative">
          <div className="table_headings">
            <h4 className="fs-20 fw-600 dark mb-0">Add Study Material</h4>
          </div>

          {/* <!-- progress bar start --> */}
          <div className="progress_bar">
            <div
              className={`step-1 ${currentStep === 1 ? "active" : ""}`}
              id="checkout-progress"
              data-current-step="1"
            >
              <div className="progress-bar">
                <div
                  className={`step step-1 ${currentStep >= 1 ? "active" : ""}`}
                >
                  <span> 01</span>
                  <div
                    className={`fa fa-check ${currentStep > 1 ? "" : "opaque"}`}
                  ></div>
                </div>
                <div
                  className={`step step-2 ${currentStep >= 2 ? "active" : ""}`}
                >
                  <span> 02</span>
                  <div
                    className={`fa fa-check ${currentStep > 2 ? "" : "opaque"}`}
                  ></div>
                </div>
                <div
                  className={`step step-3 ${currentStep === 3 ? "active" : ""}`}
                >
                  <span> 03</span>
                  <div
                    className={`fa fa-check ${currentStep > 3 ? "" : "opaque"}`}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* <!--  Study Material section--> */}
          <div className="scrollbar_section">
            {/* <!-- Add Study Material   progressbar-1 --> */}
            <section
              id="section1"
              className="sections1"
              style={{ display: currentStep === 1 ? "block" : "none" }}
            >
              <div className="col-md-11 m-auto progress_bar_form">
                <div className="row">
                  <div className="col-md-6 mb-3 ps-0 px-2">
                    <label htmlFor="" className="modal_input_heading">
                      Select Class<span className="danger">*</span>
                    </label>
                    <select
                      className="form-select profile_edit"
                      aria-label="Default select example"
                      value={selectedClass?.id || ""} // Assuming id is a unique identifier for each class
                      onChange={handleSelectChangeclass}
                    >
                      <option value="">Select Class</option>
                      {classlist.map((classItem: classmaster) => (
                        <option key={classItem.id} value={classItem.id}>
                          {classItem.className}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3 ps-0 px-2">
                    <label htmlFor="" className="modal_input_heading">
                      Select Medium<span className="danger">*</span>
                    </label>
                    <select
                      className="form-select profile_edit"
                      aria-label="Default select example"
                      value={selectedLanguage}
                      onChange={handleSelectChangelanguage}
                    >
                      <option value="">Select Language</option>
                      {languages.map((language) => (
                        <option key={language.id} value={language.name}>
                          {language.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3 ps-0 px-2">
                    <label htmlFor="" className="modal_input_heading">
                      Select Subject<span className="danger">*</span>
                    </label>
                    <select
                      className="form-select profile_edit"
                      aria-label="Default select example"
                      value={selectedSubject?.id || ""}
                      onChange={handleSelectChangesubject}
                    >
                      <option value="">Select Subject</option>
                      {subjectlist.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.subjectName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- Add Modules progressbar-2 --> */}
            <section
              id="section2"
              className="sections2"
              style={{ display: currentStep === 2 ? "block" : "none" }}
            >
              {/* add module */}
              {/* Module Form */}
              <div
                id="btn1"
                style={{ display: showModuleForm ? "block" : "none" }}
              >
                <div className="table_headings justify-content-end">
                  <div className="d-flex gap_30">
                    <div className="position-relative">
                      <input
                        type="search"
                        className="search_box search_bar"
                        placeholder="Search module"
                      />
                      <i className="fi fi-br-search search_icon gray"></i>
                    </div>
                    <div className="select-btn ">
                      <button
                        className="gap_6 primary_btn"
                        data-bs-target="#AddModule"
                        data-bs-toggle="modal"
                      >
                        Add Module
                      </button>
                      <img
                        src="assets/images/svg_img/plus.svg"
                        className="add_btn"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4 Chapter_cards">
                  {moduleList.map((module, ind) => (
                    <div className="col-md-2 position-relative">
                      <div className="Chapter_img">
                        {ind % 2 === 0 ? (
                          <img
                            src="assets/images/temp_img/note3.png"
                            alt="First Image"
                          />
                        ) : (
                          <img
                            src="assets/images/temp_img/note1.png"
                            alt="Second Image"
                          />
                        )}
                      </div>
                      <div className="Chapter">
                        <h2>
                          {module.moduleName}
                          <br /> {module.id} <br />
                          <img
                            src="assets/images/svg2/edit-text.svg"
                            data-bs-target="#EditModule"
                            data-bs-toggle="modal"
                            className="chapteredit_img"
                          />
                        </h2>
                        <button
                          type="button"
                          className="add_topic_btn test1"
                          onClick={() => {
                            handleShowTopicForm(ind);
                          }}
                        >
                          Add Topic
                          <img
                            src="assets/images/svg2/test-arrow.svg"
                            className="mx-0 ms-1"
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {currentStep > 1 && (
                  <div onClick={handlePrevStep}>
                    <button className="topic_back_login btn-prev disabled">
                      <img
                        src="assets/images/svg2/backarrow.svg"
                        className="mx-2 ms-0"
                      />
                      Back
                    </button>
                  </div>
                )}
              </div>

              {/* Topic Form */}
              <div
                id="btn2"
                style={{ display: showTopicForm ? "block" : "none" }}
              >
                <div>
                  <div className="add_Chapter">
                    <div className="Chapter_heading">
                      <h3 className="mb-0">History Chapter 2</h3>
                      <img
                        src="assets/images/svg2/edit-text.svg"
                        data-bs-target="#EditModule"
                        data-bs-toggle="modal"
                        className="chapteredit_img"
                      />
                    </div>
                    <div className="topic_add_btn">
                      <img src="assets/images/svg2/plus.svg" />
                    </div>
                  </div>

                  <div className="row AddTopic_cards mt-5">
                    {/* Your topic form content goes here */}
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label htmlFor="" className="modal_input_heading">
                          Topic Name<span className="danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control profile_edit"
                          placeholder="Enter Topic Name"
                          value={topicName}
                          onChange={(e) => setTopicName(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="" className="modal_input_heading">
                          Details
                        </label>
                        <textarea
                          className="form-control profile_edit"
                          placeholder="Enter Details"
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="" className="modal_input_heading">
                          Link
                        </label>
                        <input
                          type="text"
                          className="form-control profile_edit"
                          placeholder="Enter Link"
                          value={link}
                          onChange={(e) => setLink(e.target.value)}
                        />
                      </div>

                      {/* Assuming you have a button to add a topic to a specific module */}

                      <button
                        className="gap_6 primary_btn"
                        onClick={() => handleAddTopic()}
                      >
                        Add Topic to Module
                      </button>
                    </div>
                    <div className="col-md-6">
                      <div className="topic_card">
                        <h2>Topics</h2>
                        <div className="row topics_cards_row">
                          {/* Loop through each module */}
                          {moduleList[selectedModuleIndex]?.topics?.map(
                            (topic, topicIndex) => (
                              <div className="col-md-3" key={topicIndex}>
                                {/* <h3>Module {moduleIndex + 1}: {module.moduleName}</h3> */}
                                {/* Loop through each topic in the current module */}

                                <div
                                  className="topics_cards position-relative"
                                  style={{
                                    width: "130px",
                                    height: "200px",
                                    overflow: "hidden",
                                  }}
                                  key={topicIndex}
                                >
                                  <div>
                                    <h3>{topic.topicName}</h3>
                                    {/* Render details and link if available */}
                                    {topic.details && <p>{topic.details}</p>}
                                    {topic.link && (
                                      <a
                                        href={topic.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {topic.link}
                                      </a>
                                    )}
                                  </div>

                                  <img
                                    src="assets/images/svg2/edit-back.svg"
                                    className="chapter_edit"
                                  />
                                  <div></div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                        <div className="topic_details">
                          <img src="assets/images/temp_img/topic-img.png" />
                          <h3>No Topics Found</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className="topic_back_login btn-prev disabled"
                  onClick={handleShowModuleForm}
                >
                  {" "}
                  <img
                    src="assets/images/svg2/backarrow.svg"
                    className="mx-2 ms-0"
                  />
                  Back
                </button>
              </div>
            </section>
            {/* <!-- Study Material progressbar-3 --> */}
            <section
              id="section3"
              className="sections3"
              style={{ display: currentStep === 3 ? "block" : "none" }}
            >
              <div className="submit_cards">
                <img src="assets/images/temp_img/submit-task.png" />
                <div className="task_submit">
                  <h2>Well Done !</h2>
                  <h3>You have successfully added Study Material</h3>
                </div>
              </div>

              {currentStep > 1 && (
                <div onClick={handlePrevStep}>
                  <button className="topic_back_login btn-prev disabled">
                    <img
                      src="assets/images/svg2/backarrow.svg"
                      className="mx-2 ms-0"
                    />
                    Back
                  </button>
                </div>
              )}
            </section>
          </div>

          <div className="button-container">
            {currentStep < 3 ? (
              <div className="select-btn btn-next">
                <button
                  className="gap_6 primary_btn"
                  onClick={handleNextStep}
                  disabled={
                    !selectedClass ||
                    selectedLanguage === "" ||
                    !selectedSubject
                  }
                >
                  Next Step
                </button>
                <img
                  src="assets/images/svg2/rightarrow.svg"
                  className="add_btn"
                />
              </div>
            ) : (
              <div className="select-btn btn-submit">
                <button className="gap_6 primary_btn">
                  Add Study Material
                </button>
                <img src="assets/images/svg2/plus.svg" className="add_btn" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MoDELS REQUIRED IN STUDY MATERIAL */}
      <AddModuleModel parentCallback={handleCallback} />
    </>
  );
}

export default AddStudyMaterial;
