import _ from 'lodash';
import { getFullBelgiumDate, getStatusDetail, getStepWorkflow, getProgress, getStatus, createDateMongo } from '../common/Utility';
import statusEmprunteur from '../data/statusEmprunteur';

export class ContractsEmprunteur {

    /**
     * constructor - Dans le profil afficher le(s) contrat(s) emprunter(s)
     *
     * @param  {Object} contractsEmprunteur      existing object
     * @param  {string} user_id  user_id du preteur afin de l'identifier
     * @param  {object} emprunteur   id de l'emprunteur pour l'emprunt
     * @param  {Date} creationDate    date de creation ou date de validite du contrat
     * @param  {number} status        status du contrat
     * @param  {decimal} progress        l'avancement du contrat
     * @param  {number} stepWorkflow    step du workflow pour le Stepper
     */
    constructor(contractsEmprunteur, user_id, emprunteur) {
		if (!_.isNil(contractsEmprunteur)) {
			this.id= contractsEmprunteur._id;
			this.user_id= contractsEmprunteur.user_id;
			this.emprunteur= contractsEmprunteur.emprunteur;
            this.creationDate = contractsEmprunteur.creationDate;
			this.status= contractsEmprunteur.status;
            const statusList = getStatusDetail(statusEmprunteur);
            this.progress= _.round(getProgress(statusList, this.status));

			this.stepWorkflow= getStepWorkflow(statusList, this.status);
		} else {
            const statusList = getStatusDetail(statusEmprunteur);
            const status = getStatus(statusList, 1);
            const progress =  getProgress(statusList, status);
            const stepWorkflow =  getStepWorkflow(statusList, status);

			this.user_id= user_id;
            this.emprunteur= emprunteur;
			this.creationDate= createDateMongo();
			this.status= status;
			this.progress= progress;
			this.stepWorkflow= stepWorkflow;
		}
    }

    toLog() {
        return 'id ' + this.id +' user_id ' + this.user_id +' emprunteur ' + this.emprunteur +
        ' creationDate ' + this.creationDate +' status ' + this.status +' progress ' + this.progress +' stepWorkflow ' + this.stepWorkflow;
    }
}
