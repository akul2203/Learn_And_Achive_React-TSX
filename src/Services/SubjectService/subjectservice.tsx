import axios from "axios";
import BaseUrl from "../BaseUrl";

export const subjectservice = {
  getsubjects(pageno: any, pagesize: any, sort: any) {
    const response = axios.get(
      `${BaseUrl}/api/subjects/all/${pageno}/${pagesize}/${sort}`
    );

    return response;
  },
  getAllsubjects() {
    const response = axios.get(
      `${BaseUrl}/api/subjects/all`
    );

    return response;
  },
  adddsubject(subjectdata: any) {
    const response = axios.post(
      `${BaseUrl}/api/subjects/add`,
      subjectdata
    );

    return response;
  },
    searchsubject(classname: string) {
    const response = axios.get(
      `${BaseUrl}/api/subjects/search/${classname}`
    );

    return response;
  },
  updatesubject(classdata: any, id: any) {
    return axios.put(`${BaseUrl}/api/subjects/update/${id}`,classdata);
  },
  Deletesubject(clsid: any) {
    return axios.delete(`${BaseUrl}/api/classMaster/deleteClass/${clsid}`);
  },
  DeleteSelectedSubject(classids: number[]) {
    console.log(classids);
    
    return axios.delete(`${BaseUrl}/api/classMaster/deleteClasses`,{
      data: classids
    })},

  render() {
    return <div>subjectservice</div>;
  },
};
