import _ from 'lodash';
import { getDateISO } from '../common/Utility';

export class ContractsEmprunteur {

    /**
     * constructor - Dans le profil afficher le(s) contrat(s) emprunter(s)
     *
     * @param  {Object} contractsEmprunteur      existing object
     * @param  {string} user_id  user_id du preteur afin de l'identifier
     * @param  {string} user_idEmprunteur   id de l'emprunteur pour l'emprunt
     * @param  {Date} creationDate    date de creation ou date de validite du contrat
     * @param  {number} status        status du contrat
     * @param  {decimal} progress        l'avancement du contrat
     * @param  {number} stepWorkflow    step du workflow pour le Stepper
     */
    constructor(contractsEmprunteur, user_id, user_idEmprunteur, creationDate, status, progress, stepWorkflow) {
		if (!_.isNil(contractsEmprunteur)) {
			this.id= contractsEmprunteur._id;
			this.user_id= contractsEmprunteur.user_id;
			this.user_idEmprunteur= contractsEmprunteur.user_idEmprunteur;
			this.creationDate= contractsEmprunteur.creationDate;
			this.status= contractsEmprunteur.status;
			this.progress= contractsEmprunteur.progress;
			this.stepWorkflow= contractsEmprunteur.stepWorkflow;
		} else {
			this.user_id= user_id;
            this.user_idEmprunteur= user_idEmprunteur;
			this.creationDate= getDateISO(creationDate);
			this.status= status;
			this.progress= progress;
			this.stepWorkflow= stepWorkflow;
		}
    }
}
