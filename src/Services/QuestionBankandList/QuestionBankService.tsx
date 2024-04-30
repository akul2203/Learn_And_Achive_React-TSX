import axios from 'axios';

import BaseUrl from '../BaseUrl';

export const QuestionBankService = {
  submitQuestionBank(form:any) {
    const response = axios.post(
      `${BaseUrl}/api/questionBanks/add`,form
    );

    return response;
  },

  geallmodules(){
    const response = axios.get(
      `${BaseUrl}/api/studyMaterials/all/modules`
    );

    return response;
  },  getQbanks(pageno: any, pagesize: any, sort: any) {
    const response = axios.get(
      `${BaseUrl}/api/questionBanks/all/${pageno}/${5}/${sort}`
    );

    return response;
  },
}