import { SIMULATE_API, GET_BASIC_INFO_API , UPDATE_BASIC_INFO_API , GET_EMPRUNTEUR_BASIC_INFO_API, UPDATE_EMPRUNTEUR_BASIC_INFO_API, FORGET_USER} from '../constants/WebServiceConstants';
import bluebird from 'bluebird';
import axios from 'axios';
import ApiService from './ApiService';

var _ = require('lodash');

class ProvideService {

    /**
     * forgetUser - description
     *
     * @param  {type} email       description
     * @param  {type} pass        description
     * @param  {type} passConfirm description
     * @return {type}             description
     */
    forgetUser(newUser, token ) {
        return new bluebird( (resolve, reject) => {
            ApiService.post(
               FORGET_USER , {newUser :newUser ,
                    token: token}
            ).then(response => {
              if (!_.isNil(response)) {
                  return resolve(response.data);
              }
            }).catch( err => {
              return reject(err);
            });
        });
    }

    /**
     * simulate - CALCULATE simulator
     *
     * @param  {type} simulateData description
     * @return {type}              description
     */
    simulate(simulateData) {
      return new bluebird( (resolve, reject) => {
          ApiService.get(
             SIMULATE_API + JSON.stringify(simulateData),
          ).then(response => {
            if (!_.isNil(response)) {
                return resolve(response.data);
            }
          }).catch( err => {
            return reject(err);
          });
      });
    }


    /**
     * getBasicInfo - Get Basic Info by user
     *
     * @param  {Object} profile description
     * @return {type}      description
     */
    getBasicInfo(profile) {
      return new bluebird( (resolve, reject) => {
          ApiService.get(
              `${GET_BASIC_INFO_API}${profile.user_id }/${profile.email }`,
          ).then(response => {
            if (!_.isNil(response)) {
                return resolve(response.data);
            }
          }).catch( err => {
            return reject(err);
          });
      });
    }

    /**
     * getEmprunteurBasicInfo - Get Emprunteur Basic Info by client id
     *
     * @param  {Object} profile description
     * @return {type}      description
     */
    getEmprunteurBasicInfo(profile) {
      return new bluebird( (resolve, reject) => {
          ApiService.get(
              `${GET_EMPRUNTEUR_BASIC_INFO_API}${ profile.user_id }`,
          ).then(response => {
            if (!_.isNil(response)) {
                return resolve(response.data);
            }
          }).catch( err => {
            return reject(err);
          });
      });
    }

    updateBasicInfo(basicInfo) {
      return new bluebird( (resolve, reject) => {
          ApiService.post(
             UPDATE_BASIC_INFO_API ,
             {basicInfo: basicInfo}
          ).then(response => {
            if (!_.isNil(response)) {
                return resolve(response.data);
            }
          }).catch( err => {
            return reject(err);
          });
      });
    }

    updateEmprunteurBasicInfo(basicInfoEmprunteur) {
      return new bluebird( (resolve, reject) => {
          ApiService.post(
             UPDATE_EMPRUNTEUR_BASIC_INFO_API ,
             {basicInfoEmprunteur: basicInfoEmprunteur}
          ).then(response => {
            if (!_.isNil(response)) {
                return resolve(response.data);
            }
          }).catch( err => {
            return reject(err);
          });
      });
    }

}

export default new ProvideService()
