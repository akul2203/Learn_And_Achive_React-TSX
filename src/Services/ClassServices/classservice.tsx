import axios from "axios";
import BaseUrl from "../BaseUrl";

export const classservice = {
  getclasses(pageno: any, pagesize: any, sort: any) {
    const response = axios.get(
      `${BaseUrl}/api/classMaster/all/${pageno}/${5}/${sort}`
    );

    return response;
  },
  getallclasses() {
    const response = axios.get(
      `${BaseUrl}/api/classMaster/getAllClasses`
    );

    return response;
  },
  addclass(classdata: any) {
    const response = axios.post(
      `${BaseUrl}/api/classMaster/addClass`,
      classdata
    );

    return response;
  },
  searchclass(classname: string) {
    const response = axios.get(
      `${BaseUrl}/api/classMaster/classes/search/${classname}`
    );

    return response;
  },
  updateclass(classdata: any, id: any) {
    return axios.put(`${BaseUrl}/api/classMaster/updateClass/${id}`,classdata);
  },
  DeleteClass(clsid: any) {
    return axios.delete(`${BaseUrl}/api/classMaster/deleteClass/${clsid}`);
  },
  DeleteSelectedClassess(classids: number[]) {
    console.log(classids);
    
    return axios.delete(`${BaseUrl}/api/classMaster/deleteClasses`,{
      data: classids
    })},
    togglestatus(id:any){
return axios.get(`${BaseUrl}/api/classMaster/toggle/${id}`)
    },

  render() {
    return <div>classservice</div>;
  },
};
