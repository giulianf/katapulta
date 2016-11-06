import {RECEIVE_ENVIRONMENT, CHANGE_ENVIRONMENT} from 'webServiceConstants';
import bluebird from 'bluebird';
import request from 'request';
import LoginStore from 'loginStore';

var _ = require('lodash');

class LayoutService {

    receiveLayout(cashRegisterId) {
      return new bluebird( (resolve, reject, test) => {
        request.get(
          {
            url: RECEIVE_ENVIRONMENT + cashRegisterId,
            body: {cashRegisterId},
            headers: {
               'Authorization': 'Bearer ' + LoginStore.jwt
           },
            json: true
          },
          (err, response, body) => {
            if(err){
              return reject(err);
            }
            if(response.statusCode == 401){
                localStorage.removeItem("jv_jwt");
              return reject(body);
            } else if(response.statusCode >= 400){
              return reject(body);
            }

            return resolve(body);
          }
        );
      });
    }
    changeEnvironment(cashRegisterId, envCode) {
      return new bluebird( (resolve, reject) => {
        request.put(
          {
            url: CHANGE_ENVIRONMENT,
            body: {cashRegisterId, envCode},
            headers: {
               'Authorization': 'Bearer ' + LoginStore.jwt
           },
            json: true
          },
          (err, response, body) => {
            if(err){
              return reject(err);
            }
            if(response.statusCode == 401){
                localStorage.removeItem("jv_jwt");
              return reject(body);
            } else if(response.statusCode >= 400){
              return reject(body);
            }

            return resolve(body);
          }
        );
      });
    }

}

export default new LayoutService()
