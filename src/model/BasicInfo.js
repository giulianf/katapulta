import { getDateISO, createDateMongo } from '../common/Utility';
import _ from 'lodash';

export class BasicInfo {
    /**
     * constructor - description
     *
     * @param  {Object} client      description
     * @param  {string} id      description
     * @param  {string} user_id      description
     * @param  {string} prenom        description
     * @param  {string} nom           description
     * @param  {Date} dateNaissance description
     * @param  {number} numNational   description
     * @param  {string} address       description
     * @param  {string} codePostal    description
     * @param  {string} ville         description
     * @param  {Boolean} isEmprunteur         description
     * @param  {Boolean} bankAccount                compte bancaire
     * @param  {Boolean} bankName                nom de la banque
     * @param  {List} favoris         list of emprunteurs favoris
     * @param  {Date} createDate                       creation date
     */
    constructor(client, user_id, email) {
        if (!_.isNil(client)) {
            this.id = client._id;
            this.user_id = client.user_id;
            this.prenom = client.prenom;
            this.nom = client. nom;
            // this.dateNaissance= client.new Date(2011, 2, 12, 5, 0, 0).toISOString();
            this.dateNaissance = client.dateNaissance;
            this.numNational = client.numNational;
            this.email = client.email;
            this.address = client.address;
            this.codePostal = client.codePostal;
            this.ville = client.ville;
            this.isEmprunteur = client.isEmprunteur;
            this.bankAccount = client.bankAccount;
            this.bankName = client.bankName;
            this.favoris = client.favoris;
            this.creationDate= client.creationDate;
        } else {
            // if null init all
            this.user_id= user_id;
            this.prenom= '' ;
            this.nom= '';
            // this.dateNaissance= new Date(2011, 2, 12, 5, 0, 0).toISOString();
            this.dateNaissance = getDateISO('01/09/1939');
            this.numNational= '';
            this.email= email;
            this.address= '';
            this.codePostal= '';
            this.ville= '';
            this.isEmprunteur= false;
            this.bankAccount= 'BE';
            this.bankName= '';
            this.favoris = [];
        }
    }

    toLog() {
        return 'id: ' + this.id + ' user_id: ' + this.user_id + ' prenom: ' +this.prenom + ' nom: ' + this.nom +
        ' dateNaissance: ' + this.dateNaissance + ' numNational ' + this.numNational +' email '+this.email +
        ' address '+this.address +' codePostal '+this.codePostal +' ville '+ this.ville +
        ' bankAccount '+this.bankAccount +' codePostal '+this.bankName +
        ' isEmprunteur '+this.isEmprunteur + ' creationDate ' + this.creationDate ;
    }
}
