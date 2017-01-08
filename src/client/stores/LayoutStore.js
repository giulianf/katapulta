import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';
import Toastr from 'toastr';
// import Auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock'
import { isTokenExpired } from './jwtHelper'
import _ from 'lodash';


class LayoutStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this))
        this._user = {username: '', pass:''};
        this._signUser = {username: '', email:'', pass:'', confirmPass: ''};
        this._passForget = {user_id: null,username: '', pass: '', passConfirm:''};

        this._error = null;
        this._isLoggin = false;
        this._isAdmin = false;
        this._profile = {};

        // Configure Auth0
        // this.auth0 = new Auth0({
        //   clientID: process.env.AUTH_CLIENT_ID,
        //   domain: process.env.AUTH_AUDIENCE,
        //   responseType: 'token'
        // });
        const options = {
            closable: false,
            language: 'fr',
            auth: {
               responseType: "token",
           },
            // forgotPasswordLink: 'https://test.com',
            allowForgotPassword: true,
            theme: {
               logo: '/img/logo_login.png',
               primaryColor: '#8BC34A',
           },
           languageDictionary: {
               title: "Katapulta",
           },
           options
            };
        this.lock = new Auth0Lock(process.env.AUTH_CLIENT_ID, process.env.AUTH_AUDIENCE, options);

        // Add callback for lock `authenticated` event
        this.lock.on('authenticated', this._doAuthentication.bind(this));
        // this.lock.on('authorization_error', this._showError.bind(this) );

    }

    _doAuthentication(authResult) {
        this.setAccessToken(authResult.accessToken)
        this.setToken(authResult.idToken );
        this.lock.getUserInfo(authResult.accessToken, (error, userDetail) => {
            if (error) {
                // callback(error);
            } else {
                let isAdmin = false;
                _.map(userDetail.app_metadata.roles, role => {
                        if (_.isEqual(role, 'admin')) {
                            isAdmin = true;
                        }
                });
                this.setUser(userDetail, isAdmin);
                // in order to emit the profile
                this.emitChange();
            }
        });
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
                this.setUser(action.profile, action.isAdmin);

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
            userId: this.getUserId,
            passForget: this.getPassForget,
            token: this.getToken,
            signUser: this.getSignUser,
            loggedIn: this.loggedIn,
            // auth: this.getAuth,
            oublipwd: false,
            lock: this.getLock,
        };
    }

    get stateLayout() {
        return {
            profile: this.getProfile,
            token: this.getToken,
            loggedIn: this.loggedIn,
            lock: this.getLock,
        };
    }

    get getUser() {
        return this._user;
    }

    get getUserId() {
        return this.getProfile.user_id;
    }

    get getPassForget() {
        return this._passForget;
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

    get loggedIn() {
        // Checks if there is a saved token and it's still valid
      const token = this.getToken;
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

    setAccessToken(accessToken) {
      // Saves user token to local storage
      localStorage.setItem('accessToken', accessToken);
    }

    get getToken() {
      // Retrieves the user token from local storage
      return localStorage.getItem('id_token');
    }

    get getAccessToken() {
      // Retrieves the user token from local storage
      return localStorage.getItem('accessToken');
    }

    setUser(profile, isAdmin) {
        localStorage.setItem('_profile', JSON.stringify(profile));
        this._isAdmin = isAdmin;
    }

    removeUser() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('id_token');
        localStorage.removeItem('_profile');
    }

    parseHash(hash) {
      // uses auth0 parseHash method to extract data from url hash
      const authResult = this.auth0.parseHash(hash);
      this._doAuthentication(authResult);
    }

    // get getAuth() {
    //     return this.auth0;
    // }

    get getLock() {
        return this.lock ;
    }

    get isAdmin() {
        return this._isAdmin;
    }

}
export default new LayoutStore();
