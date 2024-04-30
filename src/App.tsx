
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./Pages/DashBoard";
import Login from "./Pages/Login";
import PathProtector from "./Services/SecurityServices/PathProtector";
import Classmaster from "./Pages/ClassMaster/Classmaster";
import Subjectmaster from "./Pages/SubjectMaster/Subjectmaster";
import WrongUrl from "./Pages/WrongUrl";
import profilepage from "./Pages/Profile/profilepage";
import AddStudyMaterial from "./Pages/StudyMaterial/AddStudyMaterial";
import StudyMaterial from "./Pages/StudyMaterial/StudyMaterial";
import AddQuestion from "./Pages/QuestionBank/AddQuestion";
import Questionbank from "./Pages/QuestionBank/Questionbank";
import BulkUploadRecords from "./Pages/QuestionBank/BulkUploadRecords";
import OtpValidation from "./Pages/OtpValidation";

function App() {
  return (
    <>

    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/otp" element={<OtpValidation/>}/>
          <Route path="" element={<PathProtector />}>
            <Route path="" element={<Dashboard />}>
              <Route path="/dashboard" element={<Classmaster />} />
              <Route path="/subjectmaster" element={<Subjectmaster />} />
              <Route path="/profilepage" Component={profilepage}/>
              <Route path="/addstudymaterial" element={<AddStudyMaterial/>}/>
              <Route path="/studymaterial" element={<StudyMaterial/>}/>
              <Route path="/addquestion" element={<AddQuestion/>}/>
              <Route path="/question" element={<Questionbank/>}/>
              <Route path="/bulkupload" element={<BulkUploadRecords/>}/>
            </Route>
          </Route>
          <Route path="*" element={<WrongUrl />} />
        </Routes>
      </BrowserRouter>   
    </>
  );
}
  
export default App;
