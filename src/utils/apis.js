import axios from "axios";

export const getApi = (uri, data = {}) => {
  return axios.create({
    baseURL: "http://hn.algolia.com/"
  }).get(uri, { params: { ...data } });

}
