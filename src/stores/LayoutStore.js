var AppDispatcher = require('appDispatcher');
var LayoutConstants = require('layoutConstants');
import ActionTypes from 'actionTypes';
import BaseStore from 'baseStore';

var _ = require('lodash');


class LayoutStore extends BaseStore {

   constructor() {
      super();
      this.subscribe(() => this._registerToActions.bind(this))
      this._layoutUI = {};
    }

  _registerToActions(action) {
    switch(action.type){
       // Respond to RECEIVE_DATA action
      case LayoutConstants.MAIN_RECEIVE_DATA_SUCCESS:
        // this.loadLayoutUI(action.body);
        // If action was responded to, emit change event
        this.emitChange();
        break;
      default:
        break;
    }

  }

  get state() {
    return {
        layout : this.getLayout
    };
   }

  get getLayout() {
      return this._layoutUI;
  }

}
export default new LayoutStore();
