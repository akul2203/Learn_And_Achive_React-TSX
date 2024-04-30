import classmaster from "./classmaster";
import subjectmasterentity from "./classmasterentity";
import ModulePayload from "./ModulePayload";

interface StudyMaterialPayload {
    id?: number; 
    medium: string;
    classMaster: classmaster;
    subjectMaster: subjectmasterentity;
    modules: ModulePayload[]; 
  }

  export default StudyMaterialPayload;