import keyMirror from 'keymirror';

export default keyMirror({
    // Explorer
    GET_EXPLORERS : null,
    GET_EXPLORERS_SUCCESS : null,
    SEARCH_EXPLORERS: null,
    RESET_EXPLORERS: null,
    FREE_TEXT_EXPLORERS: null,
        // EMPRUNTEUR ID
        GET_EXPLORERS_BY_EMPR_ID : null,
        GET_EXPLORERS_BY_EMPR_ID_SUCCESS : null,
        // CONTRACT EMPRUNTEUR ID
        NEW_CONTRACTS_EMPRUNTEUR : null,
        NEW_CONTRACTS_EMPRUNTEUR_SUCCESS : null,
        // new request preteur
        NEW_CONTRACTS_PRETEUR : null,
        NEW_CONTRACTS_PRETEUR_SUCCESS : null,

    // Simulateur
    SIMULATEUR_DATA : null,
    SIMULATEUR_DATA_SUCCESS : null,
    UPDATE_SIMULATEUR : null,

    // profile
        // BASIC PROFILE
        GET_BASIC_INFO: null,
        GET_BASIC_INFO_SUCCCESS: null,
        UPDATE_BASIC_INFO: null,
        SAVE_BASIC_INFO: null,
        SAVE_BASIC_INFO_SUCCCESS: null,
        // BASIC emprunteur
        GET_BASIC_INFO_EMPRUNTEUR: null,
        GET_BASIC_INFO_EMPRUNTEUR_SUCCCESS: null,
        UPDATE_BASIC_INFO_EMPRUNTEUR: null,
        SAVE_BASIC_INFO_EMPRUNTEUR: null,
        SAVE_BASIC_INFO_EMPRUNTEUR_SUCCCESS: null,
        // CONTRACT emprunteur
        CONTRACTS_EMPRUNTEUR: null,
        CONTRACTS_EMPRUNTEUR_SUCCCESS: null,
        // CONTRACT Preteur
        CONTRACTS_PRETEUR: null,
        CONTRACTS_PRETEUR_SUCCCESS: null,
        // FAVORIS tab
        ADMIN_FAVORIS:null,
        ADMIN_FAVORIS_SUCCCESS:null,
        // ADMIMN CONTRACT Preteur emprunteur
        ADMIN_CONTRACTS: null,
        ADMIN_CONTRACTS_SUCCCESS: null,
        CHECKBOX_CONTRACT_SELECTED: null,
        CHECKBOX_ALL_CONTRACT_SELECTED: null,
        CHANGE_STATUS_ADMIN: null,
        CHANGE_STATUS_ADMIN_SUCCESS: null,
        BLOCK_STATUS_ADMIN: null,
        BLOCK_STATUS_ADMIN_SUCCESS: null,
        RAPPEL_STATUS_ADMIN: null,
        RAPPEL_STATUS_ADMIN_SUCCESS: null,
        REFRESH_ADMIN:null,
    GENERATE_CONTRACT:null,
    GENERATE_CONTRACT_SUCCESS:null,
    GENERATE_EMPRUNTEUR_CONTRACT:null,
    GENERATE_EMPRUNTEUR_CONTRACT_SUCCESS:null,
    GENERATE_EMPRUNTEUR_CONTRACT_ERROR:null,

    // Pop up Workflow Stepper
    OPEN_STEPPER_DETAIL : null,
    CLOSE_STEPPER_DETAIL : null,

    FAVORIS_EMPRUNTEUR : null,
    FAVORIS_EMPRUNTEUR_SUCCCESS : null,

    LOGIN_DATA : null,
    LOGIN_DATA_SUCCESS : null,
    FORGET_USER: null,
    FORGET_USER_SUCCCESS: null,
    LOGIN_USER_AUTH: null,

    // NEWSLETTER
    NEWSLETTER:null,
    NEWSLETTER_SUCCCESS:null

});
