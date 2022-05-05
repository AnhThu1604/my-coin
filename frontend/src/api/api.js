import axios from "axios";
import queryString from 'query-string';

const Api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  paramsSerializer: params => queryString.stringify(params),
});
export default Api;
