import classmaster from "./classmaster";
import subjectmasterentity from "./classmasterentity";
import ModulePayload from "./ModulePayload";

export interface QuestionBankRequest {
    id: any;
    medium: string;
    topic: string;
    status: boolean;
    questionType: string;
    classMaster: classmaster;
    subjectMaster: subjectmasterentity;
    modules: ModulePayload ;
}