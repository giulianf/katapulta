import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';
import Toastr from 'toastr';
import Auth0 from 'auth0-js';

import _ from 'lodash';


class LayoutStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this))
        this._user = {username: '', pass:''};
        this._error = null;
        this._isLoggin = false;

        // Configure Auth0
        this.auth0 = new Auth0({
          clientID: 'uwy5HE63Wy6vezc1Kzq1W0ls64LYX2oi',
          domain: 'fumanju.eu.auth0.com',
          responseType: 'token'
        });

    }

  _registerToActions(action) {
      this._error = null;

        switch(action.type){
            // Respond to RECEIVE_DATA action
            case ActionTypes.DATA_ERROR:
                // If action was responded to, emit change event
                this._error = action.error.data;
                Toastr.error(this.state.error);

                this.emitChange();
                break;
            case ActionTypes.LOGIN_USER:
                this.setUser(action.profile, action.token);

                this.emitChange();
                break;

            case ActionTypes.LOGOUT_USER:
                this.removeUser();

                this.emitChange();
                break;

            default:
                break;
        }

  }

    get state() {
        return {
            user: this.getUser,
            loggedIn: this.loggedIn,
            auth: this.getAuth
        };
    }

    get getUser() {
        return this._user;
    }

    isAuthenticated() {
        // if (localStorage.getItem('id_token')) {
        //     return true;
        // }

        return false;
    }

    get loggedIn() {
      // Checks if there is a saved token and it's still valid
      return !!this.getToken();
    }

    setToken(idToken) {
      // Saves user token to local storage
      localStorage.setItem('id_token', idToken);
    }

    getToken() {
      // Retrieves the user token from local storage
      return localStorage.getItem('id_token');
    }

    removeUser() {
        localStorage.removeItem('id_token');
    }

    parseHash(hash) {
      // uses auth0 parseHash method to extract data from url hash
      const authResult = this.auth0.parseHash(hash);
      if (authResult && authResult.idToken) {
        this.setToken(authResult.idToken)
      }
    }

    get getAuth() {
        return this.auth0;
    }

}
export default new LayoutStore();
