import AppDispatcher from '../dispatcher/AppDispatcher';
import ProvideConstants from '../constants/ProvideConstants';
import BaseStore from './BaseStore';
import { ContractsPreteur } from '../../model/ContractsPreteur';
import { BasicInfo } from '../../model/BasicInfo';
import { BasicInfoEmprunteur } from '../../model/BasicInfoEmprunteur';
import { FavorisEmprunteur } from '../../model/FavorisEmprunteur';
import { getDateISO, getDateDetails } from '../../common/Utility';

var _ = require('lodash');
import moment from 'moment';

const contracts = [
new ContractsPreteur(1,  'fumanju', 'Coca Cola', '01/10/2016 22h30', 'PAIEMENT RECU', 55, 2),
new ContractsPreteur(3,  'fumanju', 'United-IT', '01/10/2016 22h30', 'CONTRAT ENVOYE', 100, 3),
new ContractsPreteur(2,  'fumanju', 'Facebook', '01/11/2016 22h30', 'START', 20, 1)];

const stepIndex = 1;

const basicProfil = new BasicInfo('butacni', 'Nicolas', 'Butacide', '24/03/1985',
 85032414555, 'nicolas.butacide@katapulta.be', 'BE0837.444.333' ,'Rue de Tamine 2', '5060', 'Tamines');

const basicEmprunteurProfil = new BasicInfoEmprunteur('butacni', 'KATAPULTA', 1600000, 'BE0837.444.333');
const favorisEmprunteur = [new FavorisEmprunteur(1, 'kata entreprise', 1600000, 'Boulanger', 'Meilleur artisan de la région', null, moment(), 'BON', true),
new FavorisEmprunteur(2, 'BEST entreprise', 110000, 'Numerisation informative', "Les Kaddors de l'IT", null, moment(), 'EXCELLENT', true)];

class ProvideStore extends BaseStore {

   constructor() {
      super();
      this.subscribe(() => this._registerToActions.bind(this))
      this._simulateur = {pret: null, year: 3, isLoading:false };

      // contracts list, stepIndex
       this._tabContracts = {};
      this._tabContracts.contracts = contracts ;
      this._tabContracts.stepWorkflow = {} ;
      this._tabContracts.stepWorkflow.visible = false ;
      this._tabContracts.stepWorkflow.stepIndex = stepIndex ;

      // profile
      this._tabBasic = {};
      this._tabBasic = basicProfil;

      // profile emprunteur
      this._tabBasicEmprunteur = {};
      this._tabBasicEmprunteur = basicEmprunteurProfil;

      // profile favoris
      this._favorisEmprunteur = [];
      this._favorisEmprunteur = favorisEmprunteur;
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
     * updateBasicInfo - To update Profile tab Basic info
     *
     * @param  {type} newValue Key/value in the Object tabBasic
     */
    updateBasicInfo(newValue) {
        _.assign(this._tabBasic, newValue);
    }

    updateBasicInfoEmprunteur(newValue) {
        _.assign(this._tabBasicEmprunteur, newValue);
    }

    favorisEmprunteur(dataSociete) {
        const favoris = _.find(this._favorisEmprunteur, dataSociete.emprunteurId);
        favoris.isFavoris = !favoris.isFavoris;
    }

    _registerToActions(action) {
    switch(action.type){
       // Respond to RECEIVE_DATA action
      case ProvideConstants.SIMULATEUR_DATA_SUCCESS:
        // this.loadLayoutUI(action.body);
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
         this.updateBasicInfo(action.newValue);
        // If action was responded to, emit change event
        this.emitChange();
        break;
      case ProvideConstants.FAVORIS_EMPRUNTEUR:
         this.favorisEmprunteur(action.dataSociete);
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

  get getStepWorkflow() {
      return this._tabContracts.stepWorkflow;
  }

}
export default new ProvideStore();
