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

      this._autoLogin();
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
        default:
            break;
    }

  }

  _autoLogin () {
    try {
        // let jwt = localStorage.getItem("jv_jwt");
        let jwt = {};

       this.populateLogin(jwt);
   } catch (e) {
    //    localStorage.removeItem("jv_jwt");

       this._jwt = null;
       this._isLoggedIn = false;

    //    console.debug("autologin failed user session expired ");
   }
 }

 populateLogin(jwt) {
    //  let decodeJwt = jwt_decode(jwt);

    //  let now = moment().unix();

     // jwt has expired
   //   if (now > decodeJwt.exp) {
   //       localStorage.removeItem("jv_jwt");
     //
   //       this._jwt = null;
   //       this._cashRegisterId = 0;
   //       this._isLoggedIn = false;
   //       this._isLoggedAdminIn = false;
   //   } else {
         this._jwt = jwt;

        //  this._user = decodeJwt.username;
        this._user='Julien Fumanti';
           //this._cashRegisterId = jwt_decode(this._cr);

         this._isLoggedIn = true;
        //  this._isLoggedAdminIn = decodeJwt.isAdmin;
   //   }
 }

  get state() {
    return {
        error : this.getError,
        user: this.getUser,
        loggedIn: this.isLoggedIn
    };
   }

  get getUser() {
      return this._user;
  }

  get getError() {
      return this._error;
  }

  get isLoggedIn() {
      return true;
  }

}
export default new LayoutStore();
