import _ from 'lodash';
import { getFullBelgiumDate, getStatusDetail, getStepWorkflow, getProgress } from '../common/Utility';
import statusPreteur from '../data/statusPreteur';

export class ContractsPreteur {

    /**
     * constructor - Dans le profil afficher le(s) contrat(s) preteur(s)
     *
     * @param  {type} contractsPreteur      description
     * @param  {type} user_id                description
     * @param  {number} contractId      le contrat id
     * @param  {string} user_clientId   id du preteur pour l'emprunt
     * @param  {string} basicInfoEmprunteurId   id de l'emprunteur pour l'emprunt
     * @param  {string} nameCompany   nom de la societe pour l'emprunt
     * @param  {Date} creationDate    date de creation ou date de validite du contrat
     * @param  {number} status        status du contrat
     * @param  {decimal} progress        l'avancement du contrat
     * @param  {number} stepWorkflow    step du workflow pour le Stepper
     */

    constructor(contractsPreteur, user_id, contractId, user_clientId, basicInfoEmprunteurId, nameCompany, creationDate, status, progress, stepWorkflow) {
		if (!_.isNil(contractsPreteur)) {
			this.id= contractsPreteur._id;
			this.user_id= contractsPreteur.user_id;
			this.contractId= contractsPreteur.contractId;
			this.user_clientId= contractsPreteur.user_clientId;
			this.basicInfoEmprunteurId= contractsPreteur.basicInfoEmprunteurId;
            this.nameCompany= contractsPreteur.nameCompany;
			this.creationDate= getFullBelgiumDate(contractsPreteur.creationDate);
			this.status= contractsPreteur.status;
            const statusList = getStatusDetail(statusPreteur);
            this.progress= _.round(getProgress(statusList, this.status));

			this.stepWorkflow= getStepWorkflow(statusList, this.status);
		} else {
			this.user_id= user_id;
			this.contractId= contractId;
			this.user_clientId= user_clientId;
			this.basicInfoEmprunteurId= basicInfoEmprunteurId;
            this.nameCompany= nameCompany;
			this.creationDate= creationDate;
			this.status= status;
			this.progress= progress;
			this.stepWorkflow= stepWorkflow;
		}
    }

    toLog() {
        return 'id ' + this.id +' user_id ' + this.user_id +' contractId ' + this.contractId +' basicInfoEmprunteurId ' + this.basicInfoEmprunteurId +
        ' nameCompany ' + this.nameCompany +
        ' creationDate ' + this.creationDate +' status ' + this.status +' progress ' + this.progress +' stepWorkflow ' + this.stepWorkflow;
    }
}
