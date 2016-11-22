import { SIMULATE_API } from '../constants/WebServiceConstants';
import bluebird from 'bluebird';
import axios from 'axios';
import ApiService from './ApiService';

var _ = require('lodash');

class SimulateurService {

    simulate(simulateData) {
      return new bluebird( (resolve, reject) => {
          ApiService.get(
             SIMULATE_API,
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

export default new SimulateurService()
