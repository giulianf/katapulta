import { dispatch, dispatchAsync } from '../dispatcher/AppDispatcher';
import ProvideConstants from '../constants/ProvideConstants';
import ActionTypes from '../constants/ActionTypes';
import ProvideService from '../services/ProvideService';


export default {
    simulate: (simulateData) => {
        let promise = ProvideService.simulate(simulateData);

        dispatchAsync(promise, {
          request: ProvideConstants.SIMULATEUR_DATA,
          success: ProvideConstants.SIMULATEUR_DATA_SUCCESS,
          failure: ActionTypes.DATA_ERROR
        }, { });

    },
    updateSimulateur: (newValue) => {
        dispatch(ProvideConstants.UPDATE_SIMULATEUR, {newValue});
    },
    stepperDetail: (contractId) => {
        dispatch(ProvideConstants.OPEN_STEPPER_DETAIL, {contractId});
    },

    closeStepperDetail: () => {
        dispatch(ProvideConstants.CLOSE_STEPPER_DETAIL, {});
    },
    updateBasicInfo: newValue => {
        dispatch(ProvideConstants.UPDATE_BASIC_INFO, {newValue});
    },
    updateBasicInfoEmprunteur: newValue => {
        dispatch(ProvideConstants.UPDATE_BASIC_INFO_EMPRUNTEUR, {newValue});
    },
    favorisEmprunteur: dataSociete => {
        dispatch(ProvideConstants.FAVORIS_EMPRUNTEUR, { dataSociete });
    },

    getBasicInfo: (profile) => {
        let promise = ProvideService.getBasicInfo(profile);

        dispatchAsync(promise, {
          request: ProvideConstants.GET_BASIC_INFO,
          success: ProvideConstants.GET_BASIC_INFO_SUCCCESS,
          failure: ActionTypes.DATA_ERROR
        }, { });
    }
}
