import { SIMULATE_API } from '../constants/WebServiceConstants';
import bluebird from 'bluebird';
// import request from 'request';
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
            //   this.setState({sidebarSecurity: response.data });
            }
          }).catch( err => {
            return reject(err);
          });
        // request.get(
        //   {
        //     url: SIMULATE,
        //     body: {},
        //     headers: {
        //         'User-Agent': 'request'
        //     },
        // //     headers: {
        // //        'Authorization': 'Bearer ' + LoginStore.jwt
        // //    },
        //     json: true
        //   },
        //   (err, response, body) => {
        //     if(err){
        //       return reject(err);
        //     }
        //     if(response.statusCode == 401){
        //       return reject(body);
        //     } else if(response.statusCode >= 400){
        //       return reject(body);
        //     }
        //
        //     return resolve(body);
        //   }
        // );
      });
    }

}

export default new SimulateurService()
