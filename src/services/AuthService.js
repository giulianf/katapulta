import {LOGIN_URL} from 'webServiceConstants';
import LoginActions from 'loginActions';
import request from 'request';
import bluebird from 'bluebird';

class AuthService {

  logout() {
    LoginActions.logoutUser();
  }
    handleAuth(username, password) {
        var promise = false;
        if (username == 'julien') {
            var jwt='jwtest';
            LoginActions.loginUser(jwt);
            promise = true;
        }
        console.log('promise: ' + username);
        return promise;
  }

    login(username, password) {
    return new bluebird( (resolve, reject) => {
      request.post(
        {
          url: LOGIN_URL,
          body: {username, password},
          json: true
        },
        (err, response, body) => {
          if(err){
            return reject(err);
          }
          if(response.statusCode >= 400){
            return reject(body);
          }
          return resolve(body);
        }
      );
    });
  }

  signup(username, password, extra) {
    return new bluebird( (resolve, reject) => {
      request.post(
        {
          url: SIGNUP_URL,
          body: {username, password, extra},
          json: true
        },
        (err, response, body) => {
          if(err){
            return reject(err);
          }
          if(response.statusCode >= 400){
            return reject(body);
          }
          return resolve(body);
        }
      );
    });
  }

}

export default new AuthService()
