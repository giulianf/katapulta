import { SIMULATE_API, GET_BASIC_INFO_API , UPDATE_BASIC_INFO_API } from '../constants/WebServiceConstants';
import bluebird from 'bluebird';
import axios from 'axios';
import ApiService from './ApiService';

var _ = require('lodash');

class ProvideService {

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

}

export default new ProvideService()
