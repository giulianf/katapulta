var BASE_URL = 'http://localhost:8081/';
export default {
  BASE_URL: BASE_URL,
  LOGIN_URL: BASE_URL + 'login',
  RECEIVE_ENVIRONMENT: BASE_URL + 'getEnvironmentCode/',
  CHANGE_ENVIRONMENT: BASE_URL + 'changeEnvironment',
  ADD_PERSONNEL_SERVICE: BASE_URL + 'addPersonnelsToServices',
  GET_ALL_PERSONNEL: BASE_URL + 'getAllPersonnels',
  ADD_PERSONNEL: BASE_URL + 'addPersonnel',
  DELETE_PERSONNEL: BASE_URL + 'deletePersonnel',
  DELETE_SERVICE: BASE_URL + 'deleteService',
  GET_SERVICE_REFERENCE: BASE_URL + 'getServicesReference',
  CREATE_SERVICE_REFERENCE: BASE_URL + 'createServiceReference',
  DELETE_SERVICE_REFERENCE: BASE_URL + 'deleteServiceReference',

}
