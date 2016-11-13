import axios from 'axios';
import _ from 'lodash';

// axios.defaults.baseURL = 'http://127.0.0.1:3000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// The custom header is required by the server in order to identify the request
// as AJAX and return the appropriate response when the auth cookie is not present
// or the session is expired (See ECAS documentation)
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
