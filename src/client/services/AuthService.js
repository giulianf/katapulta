import { LOGIN_API } from '../constants/WebServiceConstants';
import bluebird from 'bluebird';
import axios from 'axios';

class AuthService {
    logout() {
        // LoginActions.logoutUser();
    }

    login(username, password) {
        return new bluebird( (resolve, reject) => {
            ApiService.get(
               LOGIN_API,
            ).then(response => {
              if (!_.isNil(response)) {
                  return resolve(response.data);
              }
            }).catch( err => {
              return reject(err);
            });
        });
    }

    signup(username, password, extra) {
        // return new bluebird( (resolve, reject) => {
        //     request.post(
        //         {
        //             url: SIGNUP_URL,
        //             body: {username, password, extra},
        //             json: true
        //         },
        //         (err, response, body) => {
        //             if(err){
        //                 return reject(err);
        //             }
        //             if(response.statusCode >= 400){
        //                 return reject(body);
        //             }
        //             return resolve(body);
        //         }
        //     );
        // });
    }

}

export default new AuthService()
