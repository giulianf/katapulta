import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';
import Toastr from 'toastr';
import Auth0 from 'auth0-js';
import { isTokenExpired } from './jwtHelper'
import _ from 'lodash';


class LayoutStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this))
        this._user = {username: '', pass:''};
        this._signUser = {username: '', email:'', pass:'', confirmPass: ''};

        this._error = null;
        this._isLoggin = false;
        this._isAdmin = false;
        this._profile = {};

        // Configure Auth0
        this.auth0 = new Auth0({
          clientID: process.env.AUTH_CLIENT_ID,
          domain: process.env.AUTH_AUDIENCE,
          responseType: 'token'
        });

        if (this.loggedIn) {
            this.auth0.getProfile(this.getToken(), (error, profile) => {
                if (error) {
                    console.log('Error loading the Profile', error)
                } else {
                    this._profile = profile;
                    localStorage.setItem('_profile', JSON.stringify(profile));

                    _.map(profile.app_metadata.roles, role => {
                            if (_.isEqual(role, 'admin')) {
                                this._isAdmin = true;
                            }
                    });
                // this.setProfile(profile)
                }
            });
        }
    }

  _registerToActions(action) {
      this._error = null;

        switch(action.type){
            // Respond to RECEIVE_DATA action
            case ActionTypes.DATA_ERROR:
                // If action was responded to, emit change event
                if ( !_.isNil(action.error.response) ) {
                    this._error = action.error.data;
                } else if ( !_.isNil(action.error.data) ) {
                    this._error = action.error.data;
                } else {
                    this._error = action.error.message;
                }

                Toastr.error(this._error);

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
            token: this.getToken,
            signUser: this.getSignUser,
            loggedIn: this.loggedIn,
            auth: this.getAuth
        };
    }

    get stateLayout() {
        return {
            profile: this.getProfile,
            token: this.getToken,
            loggedIn: this.loggedIn
        };
    }

    get getUser() {
        return this._user;
    }

    get getSignUser() {
        return this._signUser;
    }

    get getProfile() {
        if ( localStorage.getItem('_profile') ) {
            return JSON.parse(localStorage.getItem('_profile') );
        } else {
            return this._profile;
        }
    }

    isAuthenticated() {
        // if (localStorage.getItem('id_token')) {
        //     return true;
        // }

        return false;
    }

    get loggedIn() {
        // Checks if there is a saved token and it's still valid
      const token = this.getToken();
      const isTokenExp= isTokenExpired(token);

      if (isTokenExp) {
          this.removeUser();
      }
      return !!token && !isTokenExp;
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
        localStorage.removeItem('_profile');
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

    get isAdmin() {
        return this._isAdmin;
    }

}
export default new LayoutStore();
