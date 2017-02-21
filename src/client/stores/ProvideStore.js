import AppDispatcher from '../dispatcher/AppDispatcher';
import ProvideConstants from '../constants/ProvideConstants';
import BaseStore from './BaseStore';
import LayoutStore from './LayoutStore';
import { ContractsPreteur } from '../../model/ContractsPreteur';
import { SimulateurInfo } from '../../model/SimulateurInfo';
import { getDate, getBelgiumDate, addDays, getDateISO } from '../../common/Utility';
import Validator from '../../validator/validatorEmprunteurBasic';
import Toastr from 'toastr';

var _ = require('lodash');
import moment from 'moment';

const simulator = new SimulateurInfo( moment(), 5000, 3, 2.25);

const stepIndex = 1;


class ProvideStore extends BaseStore {

   constructor() {
      super();
      this.subscribe(() => this._registerToActions.bind(this))
      this._simulateur = simulator;
      this._simulateurResult = null;

      this.resetTabContract();

      // profile
      this._tabBasic = null;

      // profile emprunteur
      this._tabBasicEmprunteur = {};

      // profile favoris
      this._favorisEmprunteur = [];

      // admin
      this._admin = { adminEmprunteur: { contracts: null }, adminPreteur: { contracts: null } };
      this._adminContractSelected =[];

      this._pdfPreteur={pdf: null, wait:false};
      this._pdfEmprunteur={pdf: null, wait:false};

      // explorer
      this._explorer = { activePage: 1, selectedExplorers: null };
      // page key within explorer search
      this._allExplorer = {};
      this._contractEmprunteur = {};
      this._searchCriteria = {freeText: null, codePostal: '', category: '', tabSelected: 'all'};
      this._nbAll = 0;
      this._nbOurSelection = 0;
      this._nbLatest = 0;
    }

    openStepperDetail(contractId) {
        if (!_.isNil(this._tabContracts) && !_.isEmpty(this._tabContracts.contracts)) {
            this._tabContracts.stepWorkflow.visible = true ;
            const contrat = _.find(this._tabContracts.contracts, {id: contractId}); ;
            this._tabContracts.stepWorkflow.user_idEmprunteur = contrat.user_idEmprunteur;
            this._tabContracts.stepWorkflow.stepIndex = contrat.stepWorkflow;
        } else if (!_.isNil(this._tabContractsEmprunteur) && !_.isEmpty(this._tabContractsEmprunteur.contracts)) {
            this._tabContractsEmprunteur.stepWorkflow.visible = true ;
            const contrat = _.find(this._tabContractsEmprunteur.contracts, {id: contractId}); ;
            this._tabContractsEmprunteur.stepWorkflow.user_idEmprunteur = contrat.user_idEmprunteur;
            this._tabContractsEmprunteur.stepWorkflow.stepIndex = contrat.stepWorkflow;
        }
    }

    resetTabContract() {
        const contract = {contracts: null ,stepWorkflow: {visible:false, stepIndex: stepIndex, user_idEmprunteur: null}};

        this._tabContracts = _.cloneDeep(contract);

        this._tabContractsEmprunteur = _.cloneDeep(contract);


    }

    closeStepperDetail() {
        this._tabContracts.stepWorkflow.visible = false ;
        this._tabContractsEmprunteur.stepWorkflow.visible = false ;
    }

    /**
     * populateBasicInfo - Populate Basic Info tab within Profile
     *
     * @param  {type} basicProfil description
     * @return {type}             description
     */
    populateBasicInfo(basicProfil) {
        this._tabBasic = basicProfil;
    }

    /**
     * populateEmprunteurBasicInfo - Populate Emprunteur Basic Info tab within Profile
     *
     * @param  {type} basicEmprunteurProfil description
     * @return {type}             description
     */
    populateEmprunteurBasicInfo(basicEmprunteurProfil) {
        this._tabBasicEmprunteur = basicEmprunteurProfil;
    }

    populateEmprunteurFavoris(favoris) {
        this._favorisEmprunteur = favoris;
    }

    /**
     * updateBasicInfo - To update Profile tab Basic info
     *
     * @param  {type} newValue Key/value in the Object tabBasic
     */
    updateBasicInfo(newValue) {
        _.assign(this._tabBasic, newValue);
    }

    updateBasicInfoEmprunteur(newValue) {
        if (!_.isNil(newValue.tauxInteretOffert)) {
            if (newValue.tauxInteretOffert > Validator.TAUX_MAXIMUM) {
                newValue.tauxInteretOffert = Validator.TAUX_MAXIMUM;
            } else if (newValue.tauxInteretOffert < 0) {
                newValue.tauxInteretOffert = 0;
            }
        } else if (!_.isNil(newValue.numEntreprise) ) {
            // last entered digit is a number
            const lastDigit = newValue.numEntreprise.substr(newValue.numEntreprise.length - 1, newValue.numEntreprise.length );
            if ( Number( lastDigit ) || parseInt(lastDigit) == 0 ) {
                // tva : 0833.444.333
                if (_.size(newValue.numEntreprise) == 4) {
                    newValue.numEntreprise = _.padEnd(newValue.numEntreprise, 5, '.');
                } else if (_.size(newValue.numEntreprise) == 8) {
                    newValue.numEntreprise = _.padEnd(newValue.numEntreprise, 9, '.');
                } else if (_.size(newValue.numEntreprise) > 12 ) {
                    newValue.numEntreprise = newValue.numEntreprise.substr(0, 12);
                }
            } else if (!_.isEqual(lastDigit, '.') ) {
                newValue.numEntreprise = newValue.numEntreprise.substr(0, newValue.numEntreprise.length - 1);
            } else if ( _.isEqual(lastDigit, '.') &&  (_.size(newValue.numEntreprise) == 5 || _.size(newValue.numEntreprise) == 9) )  {
                newValue.numEntreprise = newValue.numEntreprise.substr(0, (newValue.numEntreprise.length >= 2 ? newValue.numEntreprise.length: 2)  - 2);
            }
        }
        _.assign(this._tabBasicEmprunteur, newValue);
    }


    /**
     * getContractPreteur - to show contracts preteur tab within profile
     *
     * @param  {type} contractsPreteur description
     * @return {type}                  description
     */
    populateContractsPreteur(contractsPreteur) {
        this.resetTabContract();
        this._tabContracts.contracts = contractsPreteur ;
    }

    /**
     * populateContractsEmprunteur - to show contracts emprunteur tab within profile
     *
     * @param  {type} contractsEmprunteur description
     * @return {type}                     description
     */
    populateContractsEmprunteur(contractsEmprunteur) {
        this.resetTabContract();
        this._tabContractsEmprunteur.contracts = contractsEmprunteur ;
    }

    favorisEmprunteur(dataSociete) {
        // explorers is an Array
        const favoris = _.find(this._explorer.selectedExplorers, {"id" : dataSociete.id});
        // emprunteur is an Object
        const favorisEmprunteur = _.isEqual(this._contractEmprunteur.id, dataSociete.id) ? this._contractEmprunteur : null;

        if (!_.isNil(favoris)) {
            favoris.isFavoris = !favoris.isFavoris;
        }
        if (!_.isNil(favorisEmprunteur)) {
            favorisEmprunteur.isFavoris = !favorisEmprunteur.isFavoris;
        }
    }

    populateAdminContracts(adminContracts) {
        this._admin.adminEmprunteur.contracts = adminContracts.adminEmprunteur.contracts;
        this._admin.adminPreteur.contracts = adminContracts.adminPreteur.contracts;
        this._adminContractSelected =[];
    }

    refreshAdmin() {
        this._adminContractSelected =[];
    }

    populateAdminContractsSelected(contractId, user_id, nameCompany, checked) {
        if (!_.isNil(contractId) && !_.isNil(checked)) {
            if (checked) {
                this._adminContractSelected.push({contractId, user_id, nameCompany});
            } else {
                this._adminContractSelected = _.remove(this._adminContractSelected, item => {
                  return item.contractId === contractId;
                });
            }
        }
    }

    populateAdminAllContractsSelected( isSelected, currentDisplayAndSelectedData ) {
        if ( isSelected ) {
            // this._adminContractSelected = [];

            this._adminContractSelected.push(_.map(currentDisplayAndSelectedData, contract => {
                return {contractId: contract.id, nameCompany: contract.nameCompany};
            }) );
            // this._adminContractSelected.push({contractId, nameCompany});
        } else {
            this._adminContractSelected = _.map(this._adminContractSelected, contract => {
                return _.remove(currentDisplayAndSelectedData, item => {
                  return item.id === contract.contractId;
                })
            });
        }
    }

    populatePdfPreteur(pdf) {
        this._pdfPreteur.pdf= pdf;
        this._pdfPreteur.wait= false;
    }
    waitingPdfPreteur() {
        this._pdfPreteur.wait= true;
    }
    populatePdfEmprunteur(pdf) {
        this._pdfEmprunteur.pdf= pdf;
        this._pdfEmprunteur.wait= false;
    }

    waitingPdfemprunteur() {
        this._pdfEmprunteur.wait= true;
    }

    errorResponse() {
        this._pdfPreteur.wait= false;
    }

    /**************************/
    /***** START EXPLORER ****/
    /*************************/

    populateExplorer(explorers) {
        this._allExplorer = explorers;

        this.populateSelectedExplorer(explorers, this._explorer.activePage);
        this.countTab(explorers);
    }

    populateSelectedExplorer(explorers, activePage) {
        const skip = (activePage - 1) * 8;
        const limit = ((activePage) * 8) ;
        this._explorer.selectedExplorers = _.slice(explorers, skip, limit);
    }

    countTab(explorers) {
        this._nbAll = _.size(this._allExplorer);
        this._nbOurSelection = _.size(_.filter(this._allExplorer, (c) => {
            return c.emprunteur.isOurSelection;
        }));
        this._nbLatest = _.size(_.filter(this._allExplorer, (c) => {
            const current = addDays(moment(), -7);
            const createDate = getDate( c.emprunteur.createDate );
            return current.isBefore( createDate );
        }));
    }

    changeFreeText(criteria) {
        _.assign(this._searchCriteria, criteria);
    }

    searchExplorer(criteria, activePage) {
        if (!_.isNil(criteria)) {
            _.assign(this._searchCriteria, criteria);
        }

        this._explorer.activePage = activePage;

        let searchResults = _.cloneDeep(this._allExplorer);
        // First select in the tab
        if (_.isEqual(this._searchCriteria.tabSelected , 'all')) {
            // nothing to do with 'all'

        } else if (_.isEqual(this._searchCriteria.tabSelected , 'ourSelection')) {
            searchResults = _.filter(searchResults, (c) => {
                return c.emprunteur.isOurSelection
            });
        } else if (_.isEqual(this._searchCriteria.tabSelected , 'latest')) {
            // Represent last week
            // Current date - 7 days < Creation date
            searchResults = _.filter(searchResults, (c) => {
                const current = addDays(moment(), -7);
                const createDate = getDate( c.creationDate );
                return current.isBefore( createDate );
            });
        }

        if (!_.isEmpty(this._searchCriteria.freeText )) {
            searchResults = _.filter(searchResults, (c) => {
                 return _.includes(_.toUpper(c.denominationSocial), _.toUpper( this._searchCriteria.freeText )) || _.includes( _.toUpper(c.sectorActivite ), _.toUpper( this._searchCriteria.freeText ) ) });
        }

        if (!_.isEmpty(this._searchCriteria.codePostal )) {
            searchResults = _.filter(searchResults, (c) => {
                return _.isEqual(c.codePostalSiegeExploitation, this._searchCriteria.codePostal) });
        }

        if (!_.isEmpty(this._searchCriteria.category )) {
            searchResults = _.filter(searchResults, (c) => {
                return _.includes(c.sectorActivite, this._searchCriteria.category) });
        }

        this.countTab(searchResults);

        this.populateSelectedExplorer(searchResults, activePage);

    }

    populateContractEmprunteur(contractEmprunteur) {
        this._contractEmprunteur = contractEmprunteur;
    }

    /**************************/
    /***** END EXPLORER ****/
    /*************************/


    /**************************/
    /***** START SIMULATOR ****/
    /*************************/

    /**
     * updateSimulateur - Change the simulator form
     *
     * @param  {type} newValue description
     * @return {type}          description
     */
    updateSimulateur(newValue) {
        if (!_.isNil(newValue.taux)) {
            if (newValue.taux > Validator.TAUX_MAXIMUM) {
                newValue.taux = Validator.TAUX_MAXIMUM;
            } else if (newValue.taux < 0) {
                newValue.taux = 0;
            }

        }
        _.assign(this._simulateur, newValue);
        this._simulateurResult = null;
    }


    /**
     * calculateSimulator - To get Result from Server
     *
     * @param  {simulateurResultInfo} simulatorResult description
     * @return {type}             description
     */
    calculateSimulator(simulatorResult) {
        this._simulateurResult = simulatorResult;
    }

    /**************************/
    /***** END SIMULATOR ****/
    /*************************/

    _registerToActions(action) {
    switch(action.type){
       // Respond to RECEIVE_DATA action
      case ProvideConstants.SIMULATEUR_DATA_SUCCESS:
        this.calculateSimulator(action.body);
        // If action was responded to, emit change event
        this.emitChange();
        break;
       // Respond to RECEIVE_DATA action
      case ProvideConstants.GET_BASIC_INFO_SUCCCESS:
        this.populateBasicInfo(action.body);
        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.GET_BASIC_INFO_EMPRUNTEUR_SUCCCESS:
        this.populateEmprunteurBasicInfo(action.body);

        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.SAVE_BASIC_INFO_SUCCCESS:
        this.populateBasicInfo(action.body);
        Toastr.info( "Les informations utilisateur ont été enregistrées.");

        // If action was responded to, emit change event
        // this.emitChange();
        break;
      case ProvideConstants.SAVE_BASIC_INFO_EMPRUNTEUR_SUCCCESS:
        this.populateEmprunteurBasicInfo(action.body);
        Toastr.info( "Les informations emprunteur ont été enregistrées.");

        // If action was responded to, emit change event
        // this.emitChange();
        break;
      case ProvideConstants.UPDATE_SIMULATEUR:
        this.updateSimulateur(action.newValue);
        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.OPEN_STEPPER_DETAIL:
         this.openStepperDetail(action.contractId);
        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.CLOSE_STEPPER_DETAIL:
         this.closeStepperDetail();
        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.UPDATE_BASIC_INFO:
         this.updateBasicInfo(action.newValue);
        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.UPDATE_BASIC_INFO_EMPRUNTEUR:
         this.updateBasicInfoEmprunteur(action.newValue);

        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.CONTRACTS_PRETEUR_SUCCCESS:
         this.populateContractsPreteur(action.body);

        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.FAVORIS_EMPRUNTEUR_SUCCCESS:
         this.favorisEmprunteur(action.basicInfoEmprunteur);
        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.GET_EXPLORERS_SUCCESS:
         this.populateExplorer(action.body);
        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.GET_EXPLORERS_BY_EMPR_ID_SUCCESS:
         this.populateContractEmprunteur(action.body);
        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.SEARCH_EXPLORERS:
         this.searchExplorer(action.searchCriteria, action.activePage);
        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.FREE_TEXT_EXPLORERS:
         this.changeFreeText(action.searchCriteria);
        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.NEW_CONTRACTS_EMPRUNTEUR_SUCCESS:
         this.populateContractsEmprunteur(action.body);
        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.NEW_CONTRACTS_PRETEUR_SUCCESS:
         this.populateContractsPreteur(action.body);
        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.CONTRACTS_EMPRUNTEUR_SUCCCESS:
         this.populateContractsEmprunteur(action.body);
        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.ADMIN_CONTRACTS_SUCCCESS:
         this.populateAdminContracts(action.body);
        // If action was responded to, emit change event
        this.emitChange();
      case ProvideConstants.CHECKBOX_CONTRACT_SELECTED:
         this.populateAdminContractsSelected(action.id, action.nameCompany, action.checked);
        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.CHECKBOX_ALL_CONTRACT_SELECTED:
         this.populateAdminAllContractsSelected(action.isSelected, action.currentDisplayAndSelectedData );
        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.CHANGE_STATUS_ADMIN_SUCCESS:
         this.populateAdminContracts(action.body);
        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.REFRESH_ADMIN:
         this.refreshAdmin();
        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.GENERATE_CONTRACT:
        // If action was responded to, emit change event
        this.waitingPdfPreteur();
        this.emitChange();
        break;
      case ProvideConstants.GENERATE_CONTRACT_SUCCESS:
        // If action was responded to, emit change event
        this.populatePdfPreteur(action.body);
        this.emitChange();
        break;
      case ProvideConstants.GENERATE_EMPRUNTEUR_CONTRACT:
        // If action was responded to, emit change event
        this.waitingPdfemprunteur();
        this.emitChange();
        break;
      case ProvideConstants.GENERATE_EMPRUNTEUR_CONTRACT_SUCCESS:
        // If action was responded to, emit change event
        this.populatePdfEmprunteur(action.body);
        this.emitChange();
        break;
      case ProvideConstants.GENERATE_EMPRUNTEUR_CONTRACT_ERROR:
        // If action was responded to, emit change event
        this.errorResponse();
        this.emitChange();
        break;
      default:
        break;
    }

  }

  get stateSimulateur() {
    return {
        simulateur : this.getSimulateur,
        simulateurResult : this.getSimulateurResult
    };
   }


  /**
   * get - Object to display simulateur information
   *
   * @return {type}  description
   */
  get getSimulateur() {
      return this._simulateur;
  }


  /**
   * get - Resultat de la simulation
   *
   * @return {type}  description
   */
  get getSimulateurResult() {
      return this._simulateurResult;
  }

  /**
   * get - Basic tab within profile
   *
   * @return {Object}  object basic info
   */
  get getBasicInfo() {
      return this._tabBasic;
  }


  /**
   * get - Basic Emprunteur tab within profile
   *
   * @return {type}  description
   */
  get getBasicInfoEmprunteur() {
      return this._tabBasicEmprunteur;
  }

  get getFavorisEmprunteur() {
      return this._favorisEmprunteur;
  }
  /**
   * get - Contract tab within profile
   *
   * @return {type}  description
   */
  get getTabContract() {
      return this._tabContracts;
  }

  /**
   * get - Contract emprunteur tab within profile
   *
   * @return {type}  description
   */
  get getTabEmprunteurContract() {
      return this._tabContractsEmprunteur;
  }


  /**
   * get - explorer page
   *
   * @return {type}  description
   */
  get getExplorer() {
      return this._explorer;
  }

  get getAllExplorer() {
      return this._allExplorer;
  }

  get getContractEmprunteur() {
      return this._contractEmprunteur;
  }

  get getEmprunteur() {
      return this._contractEmprunteur ? this._contractEmprunteur.emprunteur : null;
  }

  get explorerState() {
      return {
          explorer: this.getExplorer,
          allExplorer: this.getAllExplorer,
          loggedIn: LayoutStore.loggedIn,
          profile: this.getProfile,
          searchCriteria: this.getSearchCriteria,
          nbAll: this.getNbAll,
          nbOurSelection: this.getNbOurSelection,
          nbLatest: this.getNbLatest,
      };
  }

  get emprunteurState() {
      return {
          contractEmprunteur: this.getContractEmprunteur,
          emprunteur: this.getEmprunteur,
          profile: this.getProfile,
          loggedIn: LayoutStore.loggedIn,
          openRequest: false
      };
  }

  get getNbAll() {
      return this._nbAll;
  }

  get getNbOurSelection() {
      return this._nbOurSelection;
  }

  get getNbLatest() {
      return this._nbLatest;
  }

  get getStepWorkflow() {
      if (!_.isNil(this._tabContracts) && !_.isEmpty(this._tabContracts.contracts)) {
          return this._tabContracts.stepWorkflow;
      } else if (!_.isNil(this._tabContractsEmprunteur) && !_.isEmpty(this._tabContractsEmprunteur.contracts)) {
          return this._tabContractsEmprunteur.stepWorkflow;
      }
  }

  get isAdmin() {
      return LayoutStore.isAdmin;
  }

  get getProfile() {
      return LayoutStore.getProfile;
  }

  get getSearchCriteria() {
      return this._searchCriteria;
  }

  get getAdmin() {
      return this._admin;
  }

  get getAdminContractSelected() {
      return this._adminContractSelected;
  }

  get getPdfPreteur() {
      return this._pdfPreteur;
  }

  get getPdfEmprunteur() {
      return this._pdfEmprunteur;
  }

}
export default new ProvideStore();
