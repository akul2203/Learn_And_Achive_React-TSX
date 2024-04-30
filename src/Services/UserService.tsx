import axios from "axios";
import BaseUrl from "./BaseUrl";

export const UserService = {


    loginUser(email: string, password: string) {
    const response = axios.get(
      `${BaseUrl}/api/users/logins?email=${email}&password=${password}`
    );

    return response;
  },
  getuser(email:any){
    const response = axios.get(
      `${BaseUrl}/api/users/byEmail/${email}`
    );

    return response;

  },
  validateotp(user:any){
    return axios.post(  `${BaseUrl}/api/users/validateOtp`,user)
  },

  render() {
    return <div>UserService</div>;
  }, 
};
