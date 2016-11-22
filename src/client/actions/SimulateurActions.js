import { dispatch, dispatchAsync } from '../dispatcher/AppDispatcher';
import SimulateurConstants from '../constants/SimulateurConstants';
import ActionTypes from '../constants/ActionTypes';
import SimulateurService from '../services/SimulateurService';


export default {
  simulate: (simulateData) => {
    let promise = SimulateurService.simulate(simulateData);

    dispatchAsync(promise, {
      request: SimulateurConstants.SIMULATEUR_DATA,
      success: SimulateurConstants.SIMULATEUR_DATA_SUCCESS,
      failure: ActionTypes.DATA_ERROR
    }, { });

  }
}
