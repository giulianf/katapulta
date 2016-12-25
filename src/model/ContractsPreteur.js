import moment from 'moment';


export class ContractsPreteur {

    /**
     * constructor - Dans le profil afficher le(s) contrat(s) preteur(s)
     *
     * @param  {number} contractId      le contrat id
     * @param  {string} user_idPreteur user_id du preteur afin de l'identifier
     * @param  {string} nomEmprunteur   nom de la societe pour l'emprunt
     * @param  {Date} creationDate    date de creation ou date de validite du contrat
     * @param  {number} status        status du contrat
     * @param  {decimal} progress        l'avancement du contrat
     * @param  {number} stepWorkflow    step du workflow pour le Stepper
     */
    constructor(contractId, user_idPreteur, nomEmprunteur, creationDate, status, progress, stepWorkflow) {
        this.contractId= contractId;
        this.user_idPreteur= user_idPreteur;
        this.nomEmprunteur= nomEmprunteur;
        this.creationDate= this.creationDate;
        this.status= status;
        this.progress= progress;
        this.stepWorkflow= stepWorkflow;
    }
}
