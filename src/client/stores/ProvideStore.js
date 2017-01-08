import AppDispatcher from '../dispatcher/AppDispatcher';
import ProvideConstants from '../constants/ProvideConstants';
import BaseStore from './BaseStore';
import LayoutStore from './LayoutStore';
import { ContractsPreteur } from '../../model/ContractsPreteur';
import { SimulateurInfo } from '../../model/SimulateurInfo';
import { BasicInfoEmprunteur } from '../../model/BasicInfoEmprunteur';
import { getDateISO, getDateDetails } from '../../common/Utility';
import Validator from '../../validator/validatorEmprunteurBasic';
import Toastr from 'toastr';

var _ = require('lodash');
import moment from 'moment';

const simulator = new SimulateurInfo( moment(), 5000, 3, 2.25);

const contracts = [
new ContractsPreteur(1,  'fumanju', 'Coca Cola', '01/10/2016 22h30', 'PAIEMENT RECU', 55, 2),
new ContractsPreteur(3,  'fumanju', 'United-IT', '01/10/2016 22h30', 'CONTRAT ENVOYE', 100, 3),
new ContractsPreteur(2,  'fumanju', 'Facebook', '01/11/2016 22h30', 'START', 20, 1)];

const stepIndex = 1;

// const basicEmprunteurProfil = new BasicInfoEmprunteur(null,'butacni', 'KATAPULTA', 'SPRL', '', '', '', '', '', '','', '', 'julien.fumanti@g.vom', '0456/55.66.33',
//     '01/09/1989', 100000, '', 1234567, 3, 12600, [], '', 2.25,
//     'siteWeb', null);


class ProvideStore extends BaseStore {

   constructor() {
      super();
      this.subscribe(() => this._registerToActions.bind(this))
      this._simulateur = simulator;
      this._simulateurResult = null;

      // contracts list, stepIndex
      this._tabContracts = {};
      this._tabContracts.stepWorkflow = {} ;
      this._tabContracts.stepWorkflow.visible = false ;
      this._tabContracts.stepWorkflow.stepIndex = stepIndex ;

      // profile
      this._tabBasic = {};

      // profile emprunteur
      this._tabBasicEmprunteur = {};

      // profile favoris
      this._favorisEmprunteur = [];
    //   this._favorisEmprunteur = favorisEmprunteur;

      // explorer
      this._explorer = {};
    }

    openStepperDetail(contractId) {
        this._tabContracts.stepWorkflow.visible = true ;
        const contrat = _.find(this._tabContracts.contracts, {contractId: contractId}); ;
        this._tabContracts.stepWorkflow.nomEmprunteur = contrat.nomEmprunteur;
        this._tabContracts.stepWorkflow.stepIndex = contrat.stepWorkflow;
    }

    closeStepperDetail() {
        this._tabContracts.stepWorkflow.visible = false ;
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
        this._tabContracts.contracts = contractsPreteur ;

    }

    favorisEmprunteur(dataSociete) {
        const favoris = _.find(this._favorisEmprunteur, dataSociete.emprunteurId);
        favoris.isFavoris = !favoris.isFavoris;
    }

    /**************************/
    /***** START EXPLORER ****/
    /*************************/

    populateExplorer(explorers) {
        this._explorer = {explorer : explorers, activePage: 1};
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
         this.populateContractsPreteur(action.contractsPreteur);

        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.FAVORIS_EMPRUNTEUR:
         this.favorisEmprunteur(action.dataSociete);
        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.GET_EXPLORERS_SUCCESS:
         this.populateExplorer(action.body);
        // If action was responded to, emit change event
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
   * get - explorer page
   *
   * @return {type}  description
   */
  get getExplorer() {
      return this._explorer;
  }

  get getStepWorkflow() {
      return this._tabContracts.stepWorkflow;
  }

  get isAdmin() {
      return LayoutStore.isAdmin;
  }

  get getProfile() {
      return LayoutStore.getProfile;
  }

}
export default new ProvideStore();
