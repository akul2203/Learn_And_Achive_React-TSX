import TopicPayload from "./TopicPayload";

interface ModulePayload {
    id?: number; 
    moduleName: string;
    topics: TopicPayload[]; 
  }

  export default ModulePayload