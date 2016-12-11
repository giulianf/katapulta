import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';
import Toastr from 'toastr';

import _ from 'lodash';


class LayoutStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this))
        this._user = null;
        this._error = null;
        this._isLoggin = false;

        // Configure Auth0
        // this.lock = new Auth0Lock('IdQLehW9Ui8hxtVDwSDLbiiXtjSgMiNA', 'fumanju.eu.auth0.com');
        // Add callback for lock `authenticated` event
        // this.lock.on('authenticated', this._doAuthentication.bind(this));

        // this._autoLogin();
    }

    // _doAuthentication(authResult) {
    //    // Saves the user token
    //    this.setToken(authResult.idToken)
    //    // navigate to the home route
    // //    browserHistory.replace('/home')
    //  }

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
            authenticated: this.isAuthenticated(),
            lock: this.getLock
        };
    }

    isAuthenticated() {
        // if (localStorage.getItem('id_token')) {
        //     return true;
        // }

        return false;
    }

    getUser() {
        return localStorage.getItem('profile');
    }

    getJwt() {
        return localStorage.getItem('id_token');
    }

    setUser(profile, token) {
        if (!localStorage.getItem('id_token')) {
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', token);
        }
    }

    get getLock() {
        return this.lock;
    }

    removeUser() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
    }

}
export default new LayoutStore();
