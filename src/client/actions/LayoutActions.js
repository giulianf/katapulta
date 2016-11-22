import { dispatch, dispatchAsync } from '../dispatcher/AppDispatcher';
import SimulateurConstants from '../constants/SimulateurConstants';
import SimulateurService from '../services/SimulateurService';


export default {
    login: (userInfo) => {
        let promise = SimulateurService.simulate(simulateData);

        dispatchAsync(promise, {
        request: SimulateurConstants.SIMULATEUR_DATA,
        success: SimulateurConstants.SIMULATEUR_DATA_SUCCESS,
        failure: SimulateurConstants.DATA_ERROR
        }, { });

    },
    signUp: (userInfo) => {
        let promise = SimulateurService.simulate(simulateData);

        dispatchAsync(promise, {
        request: SimulateurConstants.SIMULATEUR_DATA,
        success: SimulateurConstants.SIMULATEUR_DATA_SUCCESS,
        failure: SimulateurConstants.DATA_ERROR
        }, { });

    }
}
