import AppDispatcher from '../dispatcher/AppDispatcher';
import SimulateurConstants from '../constants/SimulateurConstants';
import BaseStore from './BaseStore';

var _ = require('lodash');


class LayoutStore extends BaseStore {

   constructor() {
      super();
      this.subscribe(() => this._registerToActions.bind(this))
      this._error = null;
    }

  _registerToActions(action) {
      this._error = null;

    switch(action.type){
    // Respond to RECEIVE_DATA action
    case SimulateurConstants.DATA_ERROR:
        // If action was responded to, emit change event
        this._error = action.error.data;
        this.emitChange();
        break;
    default:
        break;
    }

  }

  get state() {
    return {
        error : this.getError
    };
   }

  get getError() {
      return this._error;
  }

}
export default new LayoutStore();
