import { dispatch, dispatchAsync } from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

export default {
    logUserIn: (profile, token) => {
        dispatch({
          actionType: ActionTypes.LOGIN_USER,
          profile: profile,
          token: token
        });
    },

    logUserOut: () => {
        dispatch({
          actionType: ActionTypes.LOGOUT_USER
        });
    }

    // login: (userInfo) => {
    //     let promise = ProvideService.simulate(simulateData);
    //
    //     dispatchAsync(promise, {
    //     request: ProvideConstants.SIMULATEUR_DATA,
    //     success: ProvideConstants.SIMULATEUR_DATA_SUCCESS,
    //     failure: ProvideConstants.DATA_ERROR
    //     }, { });
    //
    // },
    // signUp: (userInfo) => {
    //     let promise = ProvideService.simulate(simulateData);
    //
    //     dispatchAsync(promise, {
    //     request: ProvideConstants.SIMULATEUR_DATA,
    //     success: ProvideConstants.SIMULATEUR_DATA_SUCCESS,
    //     failure: ProvideConstants.DATA_ERROR
    //     }, { });
    //
    // }
}
