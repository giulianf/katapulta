import { getDateISO } from '../common/Utility';
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
     * @param  {List} favoris         list of emprunteurs favoris
     * @param  {Date} createDate                       creation date
     */
    constructor(client, user_id, prenom, nom, dateNaissance, numNational, email, address, codePostal, ville, isEmprunteur, favoris, createDate) {
        if (!_.isNil(client)) {
            this.id = client._id;
            this.user_id = client.user_id;
            this.prenom = client.prenom;
            this.nom = client. nom;
            // this.dateNaissance= client.new Date(2011, 2, 12, 5, 0, 0).toISOString();
            this.dateNaissance = client.dateNaissance;
            // this.dateNaissance= client.dateNaissance;
            this.numNational = client.numNational;
            this.email = client.email;
            this.address = client.address;
            this.codePostal = client.codePostal;
            this.ville = client.ville;
            this.isEmprunteur = client.isEmprunteur;
            this.favoris = client.favoris;
            this.createDate= client.createDate;
        } else {
            this.user_id= user_id;
            this.prenom=prenom;
            this.nom= nom;
            // this.dateNaissance= new Date(2011, 2, 12, 5, 0, 0).toISOString();
            this.dateNaissance = getDateISO(dateNaissance);
            // this.dateNaissance= dateNaissance;
            this.numNational= numNational;
            this.email= email;
            this.address= address;
            this.codePostal= codePostal;
            this.ville= ville;
            this.isEmprunteur= isEmprunteur;
            this.favoris = [];
            this.createDate = createDate;
        }
    }

    toLog() {
        return 'id: ' + this.id + ' user_id: ' + this.user_id + ' prenom: ' +this.prenom + ' nom: ' + this.nom +
        ' dateNaissance: ' + this.dateNaissance + ' numNational ' + this.numNational +' email '+this.email +
        ' address '+this.address +' codePostal '+this.codePostal +' ville '+ this.ville +
        ' isEmprunteur '+this.isEmprunteur + ' createDate ' + this.createDate ;
    }
}
