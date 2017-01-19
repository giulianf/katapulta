import { SIMULATE_API, GET_BASIC_INFO_API , UPDATE_BASIC_INFO_API , GET_EMPRUNTEUR_BASIC_INFO_API,
     UPDATE_EMPRUNTEUR_BASIC_INFO_API, FORGET_USER, GET_CONTRACTS_PRETEUR_API, GET_EXPLORERS_API,
     GET_EXPLORERS_BY_EMPR_ID_API , UPDATE_FAVORI_API, GET_CONTRACTS_EMPRUNTEUR_API } from '../constants/WebServiceConstants';
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

    getContractEmprunteur(profile) {
      return new bluebird( (resolve, reject) => {
          ApiService.get(
              `${GET_CONTRACTS_EMPRUNTEUR_API}${ profile.user_id }`
          ).then(response => {
            if (!_.isNil(response)) {
                return resolve(response.data);
            }
          }).catch( err => {
            return reject(err);
          });
      });
    }

    getContractPreteur(profile) {
      return new bluebird( (resolve, reject) => {
          ApiService.get(
              `${GET_CONTRACTS_PRETEUR_API}${ profile.user_id }`
          ).then(response => {
            if (!_.isNil(response)) {
                return resolve(response.data);
            }
          }).catch( err => {
            return reject(err);
          });
      });
    }

    getExplorer(profile, pageKey) {
      return new bluebird( (resolve, reject) => {
          ApiService.get(
              `${GET_EXPLORERS_API}${ profile.user_id }/${pageKey}`
          ).then(response => {
            if (!_.isNil(response)) {
                return resolve(response.data);
            }
          }).catch( err => {
            return reject(err);
          });
      });
    }

    getExplorerByEmprunteurId(userId, emprunteurId) {
      return new bluebird( (resolve, reject) => {
          ApiService.get(
              `${GET_EXPLORERS_BY_EMPR_ID_API}${userId}/${ emprunteurId }`
          ).then(response => {
            if (!_.isNil(response)) {
                return resolve(response.data);
            }
          }).catch( err => {
            return reject(err);
          });
      });
    }

    favorisEmprunteur(user_id, emprunteurId, removed) {
      return new bluebird( (resolve, reject) => {
          ApiService.post(
             UPDATE_FAVORI_API ,
             {user_id: user_id, emprunteurId:emprunteurId, removed: removed}
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
