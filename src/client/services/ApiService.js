import axios from 'axios';
import _ from 'lodash';

axios.defaults.baseURL = `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
/**
   Add an interceptor for error response to just transform it and return a unified object from all requests
   */
axios.interceptors.response.use(response => response, error => Promise.reject({
    data: !_.isNil(error.data) ? error.data : !_.isNil(error.response.data) ? error.response.data : null ,
    status: !_.isNil(error.status) ? error.status : !_.isNil(error.response.status) ? error.response.status : null ,
    statusText: !_.isNil(error.statusText) ? error.statusText : !_.isNil(error.response.statusText) ? error.response.statusText : null ,
}));


export default {

  get(url, params = {}) {
    return axios.get(url, {params});
  },

  post(url, payload = {}, params = {}) {
    return axios.post(url, payload, {params});
  },

  put(url, payload) {
    return axios.put(url, payload);
  },

  delete(url) {
    return axios.delete(url);
  },

  addResponseInterceptor(successHandler, errorHandler) {
    axios.interceptors.response.use(successHandler, errorHandler);
  },
};
