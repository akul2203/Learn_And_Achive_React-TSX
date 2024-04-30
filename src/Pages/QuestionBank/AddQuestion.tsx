/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import classmaster from "../../Payloads/classmaster";
import subjectmasterentity from "../../Payloads/classmasterentity";
import ModulePayload from "../../Payloads/ModulePayload";
import { classservice } from "../../Services/ClassServices/classservice";
import { subjectservice } from "../../Services/SubjectService/subjectservice";
import { studymaterialservice } from "../../Services/studymaterial/studymaterialservice";
import { QuestionBankRequest } from "../../Payloads/QuestionBankRequest";
import { QuestionBankService } from "../../Services/QuestionBankandList/QuestionBankService";
import TinymceEditor from "../../Components/ReUsableModels/ApplicationReqquired/tinymceEditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Editor } from "@ckeditor/ckeditor5-core";

declare var butterup: any;
function AddQuestion() {
  const [currentStep, setCurrentStep] = useState(1);
  const [classlist, setclasslist] = useState<classmaster[]>([]);
  const [selectedClass, setSelectedClass] = useState<classmaster>();
  const [selectedSubject, setSelectedSubject] = useState<subjectmasterentity>();
  const [subjectlist, setsubjectList] = useState<subjectmasterentity[]>([]);
  const [moduleList, setModuleList] = useState<ModulePayload[]>([]); 
  
  const [selectedModule, setSelectedModule] = useState<ModulePayload>();
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  // const [questionbak, setquestionbank] = useState<QuestionBankRequest>();
  const [questionType, setQuestionType] = useState<string>("study material");
const [richText, setRichText] = useState('');

  const handleRichTextChange = (content: string) => {
    setRichText(content);
  };
  const languages = [
    { id: 1, name: "English" },
    { id: 2, name: "Hindi" },
    { id: 3, name: "Nimadi" },
  ];
  //::--- functions Area ---:://

  useEffect(() => {
    getallclasses();
    getallsubject();
    getallmodules();
  }, []);

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

  // get all modules and topics

  function getallmodules() {
    studymaterialservice.geallmodules().then(
      (data: any) => {
        setModuleList(data.data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //set data functions

  //select class
  const handleSelectChangeclass = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedClassId = parseInt(event.target.value); 
    const selectedClass = classlist.find(
      (classItem) => classItem.id === selectedClassId
    );
    setSelectedClass(selectedClass);
  };

  // select language

  const handleSelectChangelanguage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value);
  };

  //select subject

  const handleSelectChangesubject = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedsubjectid = parseInt(event.target.value); // Convert the value to a number if needed
    const selectedsubject = subjectlist.find(
      (subjectitem) => subjectitem.id === selectedsubjectid
    );
    setSelectedSubject(selectedsubject);
  };

  // module selection
  const handleModuleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const moduleId = parseInt(event.target.value);
    const module = moduleList.find((module) => module.id === moduleId);
    setSelectedModule(module);
    setSelectedTopic("");
  };

  // topic selection
  const handleTopicSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(event.target.value);
  };

  //selection of question type
  const handleQuestionTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestionType(event.target.value);
  };

  //functions for buttons

  const handleNextStep = () => {
    if (!selectedClass || selectedLanguage === "" || !selectedSubject) {
      butterup.toast({
        title: "Not Permit!",
        message: "select all mandetory field .",
        location: "top-right",
        dismissable: false,
        type: "error",
      });
    
    } else {
      const initialModule: ModulePayload = { id: selectedModule?.id, moduleName: "", topics: [] };
      const questionabk: QuestionBankRequest = {
        medium: selectedLanguage,
        topic: selectedTopic,
        questionType: questionType,
        classMaster: selectedClass,
        subjectMaster: selectedSubject,
        modules: initialModule,
        status: true,
        id: undefined
      };
      QuestionBankService.submitQuestionBank(questionabk).then((data:any)=>{
        console.log(data.data);
        butterup.toast({
          title: "Added!",
          message: "Question Bank Added Successfully .",
          location: "top-right",
          dismissable: false,
          type: "success",
        });
      },(error:any)=>{
        console.log(error);
        alert(error.message)
        
      })
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  return (
    <>
      {" "}

      <div className="content" data-number="5">
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
        <div className="main_content_box position-relative">
          <div className="table_headings">
            <h4 className="fs-20 fw-600 dark mb-0">Add Question Bank</h4>
          </div>
          {/* progress bar start */}
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
              id="sectionAdd1"
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
                  <div className="col-md-6 mb-3 ps-0 px-2">
                    <label htmlFor="" className="modal_input_heading">
                      Module<span className="danger"></span>
                    </label>
                    <select 
                      className="form-select profile_edit"
                      aria-label="Select Module"
                      onChange={handleModuleSelect}
                      value={selectedModule ? selectedModule.id : ""}
                    >
                      <option value="">Select</option>
                      {moduleList.map((module) => (
                        <option key={module.id} value={module.id}>
                          {module.moduleName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3 ps-0 px-2">
                    <label htmlFor="" className="modal_input_heading">
                      Topic Name<span className="danger"></span>
                    </label>
                    <select
                      className="form-select profile_edit"
                      aria-label="Select Topic" 
                      onChange={handleTopicSelect}
                      value={selectedTopic}
                      disabled={!selectedModule} // Disable if no module is selected
                    >
                      <option value="">Select</option>
                      {selectedModule &&
                        selectedModule.topics.map((topic) => (
                          <option key={topic.topicName} value={topic.topicName}>
                            {topic.topicName}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3 ps-0 px-2">
                    <label htmlFor="" className="modal_input_heading">
                      Question Type<span className="danger"></span>
                    </label>
                    <div className="d-flex gap_30 m-2">  
                      <div className="d-flex gap_12"> 
                        <input
                          type="radio"
                          id="studyMaterial"
                          name="questionType"
                          value="Study Material"
                          checked={questionType === "Study Material"}
                          onChange={handleQuestionTypeChange}
                        />
                        <label htmlFor="studyMaterial" className="radio_text">
                          Study Material
                        </label>
                      </div>
                      <div className="d-flex gap_12">
                        <input
                          type="radio"
                          id="otherQuestions"
                          name="questionType"
                          value="Other Questions"
                          checked={questionType === "Other Questions"}
                          onChange={handleQuestionTypeChange}
                        />
                        <label htmlFor="otherQuestions" className="radio_text">
                          Other Questions
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- Add Modules progressbar-2 --> */}
            <section
              id="sectionAdd2"
              className="sections2"
              style={{ display: currentStep === 2 ? "block" : "none" }}
            >
              {/* <!-- text editor --> */}
              <div className="mb-5">
                <label htmlFor="" className="modal_input_heading">
                  Question
                </label>
                {/* <!-- editor add --> */}
                <div id="editor1">     <TinymceEditor/>
       </div>
              </div>
              <div className="mb-5">
                <label htmlFor="" className="modal_input_heading">
                  Option 1
                </label>
                {/* <!-- editor add --> */}
                <div id="editor1">     <TinymceEditor/>
       </div>
              </div>
              <div className="mb-5">
                <label htmlFor="" className="modal_input_heading">
                  Option 2
                </label>
                {/* <!-- editor add --> */}
                <div id="editor2"> <TinymceEditor/></div>
              </div>

              <div className="mb-5">
                <label htmlFor="" className="modal_input_heading">
                  Option 3
                </label>
                {/* <!-- editor add --> */}
                <div id="editor3"> <TinymceEditor/></div>
              </div>

              <div className="mb-5">
                <label htmlFor="" className="modal_input_heading">
                  Option 4
                </label>
                {/* <!-- editor add --> */}
                <div id="editor4"> <TinymceEditor/></div>
              </div>

              <button
                className="topic_back_login"
                style={{ position: "static" }}
              >
                <img
                  src="assets/images/svg2/addmore.svg"
                  className="mx-2 ms-0"
                />
                Add More
              </button>

              {/* <!-- Correct Option --> */}
              <div className="Correct_box">
                <div className="col-md-12 ps-0 px-2">
                  <label htmlFor="" className="modal_input_heading blue">
                    Correct Option
                  </label>
                  <select
                    className="form-select profile_edit"
                    aria-label="Default select example"
                  >
                    <option selected>Class</option>
                    <option value="1">Class 1</option>
                    <option value="2">Class 2</option>
                    <option value="3">Class 3</option>
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="" className="modal_input_heading">
                  Solution  
                </label>
                {/* <!-- editor add --> */}
                <div id="editor5"> <TinymceEditor/></div>
              </div>
              {/* <button
                className="topic_back_login2 btn-prev disabled"
                onClick={handlePrevStep}
              >
                <img
                  src="assets/images/svg2/backarrow.svg"
                  className="mx-2 ms-0"
                />
                Back
              </button> */}
            </section>
            {/* <!-- Study Material progressbar-3 --> */}
            <section
              id="sectionAdd3"
              className="sections3"
              style={{ display: currentStep === 3 ? "block" : "none" }}
            >
              <div className="submit_cards">
                <img src="assets/images/temp_img/submit-task.png" />
                <div className="task_submit">
                  <h2>Well Done !</h2>
                  <h3>You have successfully added question</h3>
                </div>
              </div>
              {/* {currentStep > 1 && (
                <div onClick={handlePrevStep}>
                  <button className="topic_back_login btn-prev disabled" disabled={true}>
                    <img
                      src="assets/images/svg2/backarrow.svg"
                      className="mx-2 ms-0"
                    />
                    Back
                  </button>
                </div>
              )} */}
            </section>
          </div>
          {/* buttons */}

          <div className="button-container">
            {currentStep < 3 ? (
              <div className="select-btn btn-next">
                <button className="gap_6 primary_btn" onClick={handleNextStep}>
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
    </>
  );
}

export default AddQuestion;
