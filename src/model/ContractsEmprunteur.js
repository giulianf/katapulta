import _ from 'lodash';
import { getFullBelgiumDate } from '../common/Utility';

export class ContractsEmprunteur {

    /**
     * constructor - Dans le profil afficher le(s) contrat(s) emprunter(s)
     *
     * @param  {Object} contractsEmprunteur      existing object
     * @param  {string} user_id  user_id du preteur afin de l'identifier
     * @param  {string} user_idEmprunteur   id de l'emprunteur pour l'emprunt
     * @param  {string} nameCompany   nom de la societe pour l'emprunt
     * @param  {Date} creationDate    date de creation ou date de validite du contrat
     * @param  {number} status        status du contrat
     * @param  {decimal} progress        l'avancement du contrat
     * @param  {number} stepWorkflow    step du workflow pour le Stepper
     */
    constructor(contractsEmprunteur, user_id, user_idEmprunteur, nameCompany, creationDate, status, progress, stepWorkflow) {
		if (!_.isNil(contractsEmprunteur)) {
			this.id= contractsEmprunteur._id;
			this.user_id= contractsEmprunteur.user_id;
			this.user_idEmprunteur= contractsEmprunteur.user_idEmprunteur;
			this.nameCompany= contractsEmprunteur.nameCompany;
            this.creationDate = getFullBelgiumDate( contractsEmprunteur.creationDate);
			this.status= contractsEmprunteur.status;
			this.progress= contractsEmprunteur.progress;
			this.stepWorkflow= contractsEmprunteur.stepWorkflow;
		} else {
			this.user_id= user_id;
            this.user_idEmprunteur= user_idEmprunteur;
            this.nameCompany= nameCompany;
			this.creationDate= creationDate;
			this.status= status;
			this.progress= progress;
			this.stepWorkflow= stepWorkflow;
		}
    }

    toLog() {
        return 'id ' + this.id +' user_id ' + this.user_id +' user_idEmprunteur ' + this.user_idEmprunteur +' nameCompany ' + this.nameCompany +
        ' creationDate ' + this.creationDate +' status ' + this.status +' progress ' + this.progress +' stepWorkflow ' + this.stepWorkflow;
    }
}
