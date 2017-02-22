import { SIMULATE_API, GET_BASIC_INFO_API , UPDATE_BASIC_INFO_API , GET_EMPRUNTEUR_BASIC_INFO_API,
     UPDATE_EMPRUNTEUR_BASIC_INFO_API, FORGET_USER, GET_CONTRACTS_PRETEUR_API, GET_EXPLORERS_API,
     GET_EXPLORERS_BY_EMPR_ID_API , UPDATE_FAVORI_API, GET_CONTRACTS_EMPRUNTEUR_API, REQUEST_EMPRUNT_API,
     REQUEST_PRETEUR_API, ADMIN_CONTRACTS_API, ADMIN_CHANGE_STATUS, ADMIN_BLOCK_STATUS, ADMIN_RAPPEL_STATUS ,
    GENERATE_CONTRACT } from '../constants/WebServiceConstants';
import bluebird from 'bluebird';
import axios from 'axios';
import ApiService from './ApiService';

var _ = require('lodash');

class ProvideService {
    generateContract ( contractId ) {
        return new bluebird( (resolve, reject) => {
            ApiService.post(
               GENERATE_CONTRACT,
               { contractId }
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
     * changeStatus - Admin change contract status
     *
     * @param  {type} selectedContracts      description
     * @param  {type} isEmprunteur : boolean description
     * @return {type}                        description
     */
    changeStatus ( selectedContracts, status, notifyUser, isEmprunteur : boolean) {
        return new bluebird( (resolve, reject) => {
            ApiService.put(
               ADMIN_CHANGE_STATUS ,
               {selectedContracts, status, notifyUser, isEmprunteur}
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
     * blockStatus - Admin block contract status
     *
     * @param  {type} selectedContracts description
     * @param  {type} isEmprunteur      description
     * @return {type}                   description
     */
    blockStatus ( selectedContracts, isEmprunteur ) {
        return new bluebird( (resolve, reject) => {
            ApiService.put(
               ADMIN_BLOCK_STATUS ,
               {selectedContracts, isEmprunteur}
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
     * rappelStatus - Admin rappel contract status
     *
     * @param  {type} selectedContracts description
     * @param  {type} isEmprunteur      description
     * @return {type}                   description
     */
    rappelStatus ( selectedContracts, isEmprunteur ) {
        return new bluebird( (resolve, reject) => {
            ApiService.put(
               ADMIN_RAPPEL_STATUS ,
               {selectedContracts, isEmprunteur}
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

    requestNewEmprunt(profile) {
      return new bluebird( (resolve, reject) => {
          ApiService.post(
              `${REQUEST_EMPRUNT_API}`,
              {user_id: profile.user_id }
          ).then(response => {
            if (!_.isNil(response)) {
                return resolve(response.data);
            }
          }).catch( err => {
            return reject(err);
          });
      });
    }

    requestNewPreteur(profile, contractEmprunteurId, valuePret) {
      return new bluebird( (resolve, reject) => {
          ApiService.post(
              `${REQUEST_PRETEUR_API}`,
              {user_id: profile.user_id, emprunteurContractId: contractEmprunteurId, valuePret: valuePret }
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
        const userId = profile ? profile.user_id : null;
      return new bluebird( (resolve, reject) => {
          ApiService.get(
              `${GET_EXPLORERS_API}${ userId }/${pageKey}`
          ).then(response => {
            if (!_.isNil(response)) {
                return resolve(response.data);
            }
          }).catch( err => {
            return reject(err);
          });
      });
    }

    getExplorerBycontractEmprunteurId(userId, contractEmprunteurId) {
      return new bluebird( (resolve, reject) => {
          ApiService.get(
              `${GET_EXPLORERS_BY_EMPR_ID_API}${userId}/${ contractEmprunteurId }`
          ).then(response => {
            if (!_.isNil(response)) {
                return resolve(response.data);
            }
          }).catch( err => {
            return reject(err);
          });
      });
    }

    favorisEmprunteur(user_id, contractEmprunteurId, removed) {
      return new bluebird( (resolve, reject) => {
          ApiService.post(
             UPDATE_FAVORI_API ,
             {user_id: user_id, contractEmprunteurId:contractEmprunteurId, removed: removed}
          ).then(response => {
            if (!_.isNil(response)) {
                return resolve(response.data);
            }
          }).catch( err => {
            return reject(err);
          });
      });
    }

    getAdminContracts() {
      return new bluebird( (resolve, reject) => {
          ApiService.get(
             ADMIN_CONTRACTS_API
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
