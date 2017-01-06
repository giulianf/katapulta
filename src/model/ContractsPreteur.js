import _ from 'lodash';
import { getDateISO } from '../common/Utility';

export class ContractsPreteur {

    /**
     * constructor - Dans le profil afficher le(s) contrat(s) preteur(s)
     *
     * @param  {Object} contractsPreteur      existing object 
     * @param  {number} contractId      le contrat id
     * @param  {string} basicInfo  basicInfo du preteur afin de l'identifier
     * @param  {string} basicInfoEmprunteurId   id de l'emprunteur pour l'emprunt
     * @param  {Date} creationDate    date de creation ou date de validite du contrat
     * @param  {number} status        status du contrat
     * @param  {decimal} progress        l'avancement du contrat
     * @param  {number} stepWorkflow    step du workflow pour le Stepper
     */
    constructor(contractsPreteur, contractId, basicInfo, basicInfoEmprunteurId, creationDate, status, progress, stepWorkflow) {
		if (!_.isNil(contractsPreteur)) {
			this.contractId= contractsPreteur.contractId;
			this.basicInfo= contractsPreteur.basicInfo;
			this.basicInfoEmprunteurId= contractsPreteur.basicInfoEmprunteurId;
			this.creationDate= contractsPreteur.creationDate;
			this.status= contractsPreteur.status;
			this.progress= contractsPreteur.progress;
			this.stepWorkflow= contractsPreteur.stepWorkflow;
		} else {
			this.contractId= contractId;
			this.basicInfo= basicInfo;
			this.basicInfoEmprunteurId= basicInfoEmprunteurId;
			this.creationDate= getDateISO(creationDate);
			this.status= status;
			this.progress= progress;
			this.stepWorkflow= stepWorkflow;	
		}
    }
}
