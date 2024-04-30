import axios from "axios";
import BaseUrl from "../BaseUrl";

export const studymaterialservice = {
    submitformstudymaterial(form:any) {
      const response = axios.post(
        `${BaseUrl}/api/studyMaterials/add`,form
      );
  
      return response;
    },
  
    geallmodules(){
      const response = axios.get(
        `${BaseUrl}/api/studyMaterials/all/modules`
      );
  
      return response;
    },
  }