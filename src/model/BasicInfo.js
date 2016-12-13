import { getDateISO } from '../common/Utility';
import moment from 'moment';

export class BasicInfo {
    /**
     * constructor - description
     *
     * @param  {string} username      description
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
    constructor(username, prenom, nom, dateNaissance, numNational, email, tva, address, codePostal, ville, isEmprunteur) {
        this.username= username;
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
