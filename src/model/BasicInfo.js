import { getDateISO } from '../common/Utility';
import _ from 'lodash';

export class BasicInfo {
    /**
     * constructor - description
     *
     * @param  {Object} client      description
     * @param  {string} user_id      description
     * @param  {string} prenom        description
     * @param  {string} nom           description
     * @param  {Date} dateNaissance description
     * @param  {number} numNational   description
     * @param  {string} tva       description
     * @param  {string} address       description
     * @param  {string} codePostal    description
     * @param  {string} ville         description
     * @param  {Boolean} isEmprunteur         description
     */
    constructor(client, user_id, prenom, nom, dateNaissance, numNational, email, tva, address, codePostal, ville, isEmprunteur) {
        if (!_.isNil(client)) {
            this.user_id = client.user_id;
            this.prenom = client.prenom;
            this.nom = client. nom;
            // this.dateNaissance= client.new Date(2011, 2, 12, 5, 0, 0).toISOString();
            this.dateNaissance = client.dateNaissance;
            // this.dateNaissance= client.dateNaissance;
            this.numNational = client.numNational;
            this.email = client.email;
            this.tva = client.tva;
            this.address = client.address;
            this.codePostal = client.codePostal;
            this.ville = client.ville;
            this.isEmprunteur = client.isEmprunteur;
        } else {
            this.user_id= user_id;
            this.prenom=prenom;
            this.nom= nom;
            // this.dateNaissance= new Date(2011, 2, 12, 5, 0, 0).toISOString();
            this.dateNaissance = getDateISO(dateNaissance);
            // this.dateNaissance= dateNaissance;
            this.numNational= numNational;
            this.email= email;
            this.tva= tva;
            this.address= address;
            this.codePostal= codePostal;
            this.ville= ville;
            this.isEmprunteur= isEmprunteur;
        }
    }
}