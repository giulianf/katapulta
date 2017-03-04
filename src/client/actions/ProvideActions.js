import { dispatch, dispatchAsync } from '../dispatcher/AppDispatcher';
import ProvideConstants from '../constants/ProvideConstants';
import ActionTypes from '../constants/ActionTypes';
import ProvideService from '../services/ProvideService';


export default {
    generateContractEmprunteur: ( ) => {
        let promise = ProvideService.generateContract();

        dispatchAsync(promise, {
          request: ProvideConstants.GENERATE_EMPRUNTEUR_CONTRACT,
          success: ProvideConstants.GENERATE_EMPRUNTEUR_CONTRACT_SUCCESS,
          failure: ActionTypes.DATA_ERROR
        }, { });

    },
    generateContract: ( contractId ) => {
        let promise = ProvideService.generateContract(contractId);
        dispatchAsync(promise, {
          request: ProvideConstants.GENERATE_CONTRACT,
          success: ProvideConstants.GENERATE_CONTRACT_SUCCESS,
          failure: ProvideConstants.GENERATE_EMPRUNTEUR_CONTRACT_ERROR
        }, { });

    },
    /**
     * refresh admin for popup
     */
    refreshAdmin: () => {
        dispatch(ProvideConstants.REFRESH_ADMIN, {});
    },
    changeStatus: ( selectedContracts, status, notifyUser, isEmprunteur ) => {
        let promise = ProvideService.changeStatus(selectedContracts, status, notifyUser, isEmprunteur);

        dispatchAsync(promise, {
          request: ProvideConstants.CHANGE_STATUS_ADMIN,
          success: ProvideConstants.CHANGE_STATUS_ADMIN_SUCCESS,
          failure: ActionTypes.DATA_ERROR
        }, { });

    },
    blockStatus: ( selectedContracts, isEmprunteur ) => {
        let promise = ProvideService.blockStatus(selectedContracts, isEmprunteur);

        dispatchAsync(promise, {
          request: ProvideConstants.BLOCK_STATUS_ADMIN,
          success: ProvideConstants.BLOCK_STATUS_ADMIN_SUCCESS,
          failure: ActionTypes.DATA_ERROR
        }, { });

    },
    rappelStatus: ( selectedContracts, isEmprunteur ) => {
        let promise = ProvideService.rappelStatus(selectedContracts, isEmprunteur);

        dispatchAsync(promise, {
          request: ProvideConstants.RAPPEL_STATUS_ADMIN,
          success: ProvideConstants.RAPPEL_STATUS_ADMIN_SUCCESS,
          failure: ActionTypes.DATA_ERROR
        }, { });

    },
    checkBoxAdminContract: ({id, user_id, nameCompany}, checked) => {
        dispatch(ProvideConstants.CHECKBOX_CONTRACT_SELECTED, { id, user_id, nameCompany , checked});
    },
    checkBoxAllAdminContract: ( isSelected, currentDisplayAndSelectedData ) => {
        dispatch(ProvideConstants.CHECKBOX_ALL_CONTRACT_SELECTED, { isSelected, currentDisplayAndSelectedData });
    },
    changeFreeText: (searchCriteria) => {
        dispatch(ProvideConstants.FREE_TEXT_EXPLORERS, { searchCriteria });
    },
    searchExplorer: (searchCriteria, activePage) => {
        dispatch(ProvideConstants.SEARCH_EXPLORERS, { searchCriteria, activePage });
    },
    resetExplorer: () => {
        dispatch(ProvideConstants.RESET_EXPLORERS, {  });
    },
    getExplorer: (profile, pageKey) => {
        let promise = ProvideService.getExplorer(profile, pageKey);

        dispatchAsync(promise, {
          request: ProvideConstants.GET_EXPLORERS,
          success: ProvideConstants.GET_EXPLORERS_SUCCESS,
          failure: ActionTypes.DATA_ERROR
        }, { });

    },
    getExplorerBycontractEmprunteurId: ( profile, contractEmprunteurId ) => {
        const userId = profile ? profile.user_id : null;
        let promise = ProvideService.getExplorerBycontractEmprunteurId(userId, contractEmprunteurId);

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
    favorisEmprunteur: (profile, contractEmprunteurId, isFavoris) => {
        // dataSociete.isFavoris if it is true , user click to remove .
        let promise = ProvideService.favorisEmprunteur(profile.user_id, contractEmprunteurId, isFavoris);

        dispatchAsync(promise, {
          request: ProvideConstants.FAVORIS_EMPRUNTEUR,
          success: ProvideConstants.FAVORIS_EMPRUNTEUR_SUCCCESS,
          failure: ActionTypes.DATA_ERROR
        }, {  });
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
    requestNewPreteur: (profile, contractEmprunteurId, valuePret) => {
        let promise = ProvideService.requestNewPreteur(profile, contractEmprunteurId, valuePret);

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
     * get favoris within TAB favoris emprunteur
     */
    getAdminFavoris: (favoris) => {
        let promise = ProvideService.getAdminFavoris(favoris);

        dispatchAsync(promise, {
          request: ProvideConstants.ADMIN_FAVORIS,
          success: ProvideConstants.ADMIN_FAVORIS_SUCCCESS,
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
    },

    /**
     * Newsletter
     */
    registerNewsLetter: (email) => {
        let promise = ProvideService.registerNewsLetter(email);

        dispatchAsync(promise, {
          request: ProvideConstants.NEWSLETTER,
          success: ProvideConstants.NEWSLETTER_SUCCCESS,
          failure: ActionTypes.DATA_ERROR
        }, { });
    }


}
