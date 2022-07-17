import axios from "axios";

export const getApi = (uri, data = {}) => {
  return axios.create({
    baseURL: "https://hn.algolia.com/"
  }).get(uri, { params: { ...data } });

}
