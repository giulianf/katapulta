import { dispatch, dispatchAsync } from '../dispatcher/AppDispatcher';
import ProvideConstants from '../constants/ProvideConstants';
import ActionTypes from '../constants/ActionTypes';
import ProvideService from '../services/ProvideService';


export default {
    changeFreeText: (searchCriteria) => {
        dispatch(ProvideConstants.FREE_TEXT_EXPLORERS, { searchCriteria });
    },
    searchExplorer: (searchCriteria, activePage) => {
        dispatch(ProvideConstants.SEARCH_EXPLORERS, { searchCriteria, activePage });
    },
    getExplorer: (profile, pageKey) => {
        let promise = ProvideService.getExplorer(profile, pageKey);

        dispatchAsync(promise, {
          request: ProvideConstants.GET_EXPLORERS,
          success: ProvideConstants.GET_EXPLORERS_SUCCESS,
          failure: ActionTypes.DATA_ERROR
        }, { });

    },
    getExplorerByEmprunteurId: ( profile, emprunteurId ) => {
        const userId = profile ? profile.user_id : null;
        let promise = ProvideService.getExplorerByEmprunteurId(userId, emprunteurId);

        dispatchAsync(promise, {
          request: ProvideConstants.GET_EXPLORERS_BY_EMPR_ID,
          success: ProvideConstants.GET_EXPLORERS_BY_EMPR_ID_SUCCESS,
          failure: ActionTypes.DATA_ERROR
        }, { });

    },
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
    favorisEmprunteur: (profile, basicInfoEmprunteur) => {
        // dataSociete.isFavoris if it is true , user click to remove .
        let promise = ProvideService.favorisEmprunteur(profile.user_id, basicInfoEmprunteur.id , basicInfoEmprunteur.isFavoris);

        dispatchAsync(promise, {
          request: ProvideConstants.FAVORIS_EMPRUNTEUR,
          success: ProvideConstants.FAVORIS_EMPRUNTEUR_SUCCCESS,
          failure: ActionTypes.DATA_ERROR
        }, { basicInfoEmprunteur });
    },

    /**
     * get Basic profile within TAB basic
     */
    getBasicInfo: (profile) => {
        let promise = ProvideService.getBasicInfo(profile);

        dispatchAsync(promise, {
          request: ProvideConstants.GET_BASIC_INFO,
          success: ProvideConstants.GET_BASIC_INFO_SUCCCESS,
          failure: ActionTypes.DATA_ERROR
        }, { });
    },

    /**
     * get Basic emprunteur profile within TAB emprunteur
     */
    getEmprunteurBasicInfo: (profile) => {
        let promise = ProvideService.getEmprunteurBasicInfo(profile);

        dispatchAsync(promise, {
          request: ProvideConstants.GET_BASIC_INFO_EMPRUNTEUR,
          success: ProvideConstants.GET_BASIC_INFO_EMPRUNTEUR_SUCCCESS,
          failure: ActionTypes.DATA_ERROR
        }, { });
    },

    /**
     * Update profile Basic within TAB basic
     */
    updateSaveBasicInfo: (basicInfo) => {
        let promise = ProvideService.updateBasicInfo(basicInfo);

        dispatchAsync(promise, {
          request: ProvideConstants.SAVE_BASIC_INFO,
          success: ProvideConstants.SAVE_BASIC_INFO_SUCCCESS,
          failure: ActionTypes.DATA_ERROR
        }, { });
    },

    /**
     * Update profile Basic within TAB basic
     */
    updateSaveEmprunteurBasicInfo: (basicInfoEmprunteur) => {
        let promise = ProvideService.updateEmprunteurBasicInfo(basicInfoEmprunteur);

        dispatchAsync(promise, {
          request: ProvideConstants.SAVE_BASIC_INFO_EMPRUNTEUR,
          success: ProvideConstants.SAVE_BASIC_INFO_EMPRUNTEUR_SUCCCESS,
          failure: ActionTypes.DATA_ERROR
        }, { });
    },
    /**
     * get contracts emprunteur within TAB contract emprunteur
     */
    requestNewEmprunt: (profile) => {
        let promise = ProvideService.requestNewEmprunt(profile);

        dispatchAsync(promise, {
          request: ProvideConstants.NEW_CONTRACTS_EMPRUNTEUR,
          success: ProvideConstants.NEW_CONTRACTS_EMPRUNTEUR_SUCCESS,
          failure: ActionTypes.DATA_ERROR
        }, { });
    },
    /**
     * get contracts emprunteur within TAB contract emprunteur
     */
    requestNewPreteur: (profile) => {
        let promise = ProvideService.requestNewPreteur(profile);

        dispatchAsync(promise, {
          request: ProvideConstants.NEW_CONTRACTS_PRETEUR,
          success: ProvideConstants.NEW_CONTRACTS_PRETEUR_SUCCESS,
          failure: ActionTypes.DATA_ERROR
        }, { });
    },
    /**
     * get contracts emprunteur within TAB contract emprunteur
     */
    getContractEmprunteur: (profile) => {
        let promise = ProvideService.getContractEmprunteur(profile);

        dispatchAsync(promise, {
          request: ProvideConstants.CONTRACTS_EMPRUNTEUR,
          success: ProvideConstants.CONTRACTS_EMPRUNTEUR_SUCCCESS,
          failure: ActionTypes.DATA_ERROR
        }, { });
    },
    /**
     * get contracts preteur within TAB contract preteur
     */
    getContractPreteur: (profile) => {
        let promise = ProvideService.getContractPreteur(profile);

        dispatchAsync(promise, {
          request: ProvideConstants.CONTRACTS_PRETEUR,
          success: ProvideConstants.CONTRACTS_PRETEUR_SUCCCESS,
          failure: ActionTypes.DATA_ERROR
        }, { });
    },

    /**
     * get all conracts for preteur and emprunteur
     */
    getAdminContracts: () => {
        let promise = ProvideService.getAdminContracts();

        dispatchAsync(promise, {
          request: ProvideConstants.ADMIN_CONTRACTS,
          success: ProvideConstants.ADMIN_CONTRACTS_SUCCCESS,
          failure: ActionTypes.DATA_ERROR
        }, { });
    }
}
