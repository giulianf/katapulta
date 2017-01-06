
import _ from 'lodash';
import { getDateISO } from '../common/Utility';

export class ContractsEmprunteur {

    /**
     * constructor - Dans le profil afficher le(s) contrat(s) preteur(s)
     *
     * @param  {Object} contractsEmprunteur      existing object 
     * @param  {number} contractId      le contrat id
     * @param  {string} basicInfo  basicInfo du preteur afin de l'identifier
     * @param  {string} basicInfoEmprunteur   id de l'emprunteur pour l'emprunt
     * @param  {Date} creationDate    date de creation ou date de validite du contrat
     * @param  {number} status        status du contrat
     * @param  {decimal} progress        l'avancement du contrat
     * @param  {number} stepWorkflow    step du workflow pour le Stepper
     */
    constructor(contractsEmprunteur, contractId, basicInfo, basicInfoEmprunteur, creationDate, status, progress, stepWorkflow) {
		if (!_.isNil(contractsEmprunteur)) {
			this.contractId= contractsEmprunteur.contractId;
			this.basicInfo= contractsEmprunteur.basicInfo;
			this.basicInfoEmprunteur= contractsEmprunteur.basicInfoEmprunteur;
			this.creationDate= contractsEmprunteur.creationDate;
			this.status= contractsEmprunteur.status;
			this.progress= contractsEmprunteur.progress;
			this.stepWorkflow= contractsEmprunteur.stepWorkflow;
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
