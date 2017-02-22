import _ from 'lodash';
import { getFullBelgiumDate, getStatus, getStatusDetail, getStepWorkflow, getProgress, createDateMongo } from '../common/Utility';
import statusPreteur from '../data/statusPreteur';

export class ContractsPreteur {

    /**
     * constructor - Dans le profil afficher le(s) contrat(s) preteur(s)
     *
     * @param  {type} contractsPreteur      description
     * @param  {type} user_id                preteur id
     * @param  {object} contractEmprunteurId   id de contract l'emprunteur pour l'emprunt
     * @param  {number} valuePret   montant du pret
     */

    constructor(contractsPreteur, user_id, contractEmprunteurId, valuePret) {
		if (!_.isNil(contractsPreteur)) {
			this.id= contractsPreteur._id;
			this.user_id= contractsPreteur.user_id;
			this.contractEmprunteurId= contractsPreteur.contractEmprunteurId;
            this.valuePret= contractsPreteur.valuePret;
			this.creationDate= getFullBelgiumDate(contractsPreteur.creationDate);
			this.status= contractsPreteur.status;
            const statusList = getStatusDetail(statusPreteur);
            this.progress= _.round(getProgress(statusList, this.status));

			this.stepWorkflow= getStepWorkflow(statusList, this.status);
		} else {
            const statusList = getStatusDetail(statusPreteur);
            const status = getStatus(statusList, 1);
            const progress =  getProgress(statusList, status);
            const stepWorkflow =  getStepWorkflow(statusList, status);

			this.user_id= user_id;
			this.contractEmprunteurId= contractEmprunteurId;
            this.valuePret= valuePret;
			this.creationDate= createDateMongo();
			this.status= status;
			this.progress= progress;
			this.stepWorkflow= stepWorkflow;
		}
    }

    toLog() {
        return 'id ' + this.id +' user_id ' + this.user_id +' contractEmprunteurId ' + this.contractEmprunteurId +
        ' valuePret ' + this.valuePret +
        ' creationDate ' + this.creationDate +' status ' + this.status +' progress ' + this.progress +' stepWorkflow ' + this.stepWorkflow;
    }
}
