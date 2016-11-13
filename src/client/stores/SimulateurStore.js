import AppDispatcher from '../dispatcher/AppDispatcher';
import SimulateurConstants from '../constants/SimulateurConstants';
import BaseStore from './BaseStore';

var _ = require('lodash');


class SimulateurStore extends BaseStore {

   constructor() {
      super();
      this.subscribe(() => this._registerToActions.bind(this))
      this._simulateur = {pret: null, year: 3, isLoading:false };
    }

  _registerToActions(action) {
    switch(action.type){
       // Respond to RECEIVE_DATA action
      case SimulateurConstants.SIMULATEUR_DATA_SUCCESS:
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
        simulateur : this.getSimulateur
    };
   }

  get getSimulateur() {
      return this._simulateur;
  }

}
export default new SimulateurStore();
