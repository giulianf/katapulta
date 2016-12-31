import { getDateISO } from '../common/Utility';
import _ from 'lodash';

export class BasicInfoEmprunteur {

    /**
     * constructor - description
     *
     * @param  {type} user_id                     description
     * @param  {type} denominationSocial          description
     * @param  {type} formeJuridique              description
     * @param  {type} numEntreprise               description
     * @param  {type} adresseSiegeSocial          description
     * @param  {type} codePostalSiegeSocial       description
     * @param  {type} villeSiegeSocial            description
     * @param  {type} adresseSiegeExploitation    description
     * @param  {type} codePostalSiegeExploitation description
     * @param  {type} villeSiegeExploitation      description
     * @param  {type} representantLegal           description
     * @param  {type} email                       description
     * @param  {type} numTel                      description
     * @param  {type} dateConstitution            description
     * @param  {type} chiffreAffaire              description
     * @param  {type} nbEmploye                   description
     * @param  {type} capital                     description
     * @param  {type} actionnariat                description
     * @param  {type} destinationPret             description
     * @param  {type} montantSouhaite             description
     * @param  {type} dureeSouhaite               description
     * @param  {type} tauxInteretOffert           description
     * @param  {type} siteWeb                     description
     * @param  {type} image                       description
     * @return {type}                             description
     */
    constructor(emprunteur, user_id, denominationSocial, formeJuridique, numEntreprise,
        adresseSiegeSocial, codePostalSiegeSocial, villeSiegeSocial,
        adresseSiegeExploitation, codePostalSiegeExploitation, villeSiegeExploitation,
        representantLegal,email, numTel, dateConstitution, chiffreAffaire, nbEmploye,
        capital, actionnariat,destinationPret, montantSouhaite,dureeSouhaite, tauxInteretOffert, siteWeb, image) {
            if (!_.isNil(emprunteur)) {
                this.user_id= emprunteur.user_id;
                this.denominationSocial= emprunteur.denominationSocial;
                this.formeJuridique= emprunteur.formeJuridique ;
                this.numEntreprise= emprunteur.numEntreprise ;
                this.codePostalSiegeSocial= emprunteur.codePostalSiegeSocial ;
                this.adresseSiegeSocial= emprunteur.adresseSiegeSocial ;
                this.villeSiegeSocial= emprunteur.villeSiegeSocial ;
                this.adresseSiegeExploitation= emprunteur.adresseSiegeExploitation ;
                this.codePostalSiegeExploitation= emprunteur.codePostalSiegeExploitation ;
                this.villeSiegeExploitation= emprunteur.villeSiegeExploitation ;
                this.representantLegal= emprunteur.representantLegal;
                this.email= emprunteur.email ;
                this.numTel= emprunteur.numTel;
                this.dateConstitution= emprunteur.dateConstitution;
                this.chiffreAffaire= emprunteur.chiffreAffaire;
                this.nbEmploye= emprunteur.nbEmploye;
                this.capital= emprunteur.capital;
                this.actionnariat= emprunteur.actionnariat;
                this.destinationPret= emprunteur.destinationPret;
                this.montantSouhaite= emprunteur.montantSouhaite;
                this.dureeSouhaite= emprunteur.dureeSouhaite;
                this.tauxInteretOffert= emprunteur.tauxInteretOffert;
                this.siteWeb= emprunteur.siteWeb;
                this.image= emprunteur.image;
            } else {
                this.user_id= user_id;
                this.denominationSocial= denominationSocial;
                this.formeJuridique= formeJuridique ;
                this.numEntreprise= numEntreprise ;
                this.codePostalSiegeSocial= codePostalSiegeSocial ;
                this.adresseSiegeSocial= adresseSiegeSocial ;
                this.villeSiegeSocial= villeSiegeSocial ;
                this.adresseSiegeExploitation= adresseSiegeExploitation ;
                this.codePostalSiegeExploitation= codePostalSiegeExploitation ;
                this.villeSiegeExploitation= villeSiegeExploitation ;
                this.representantLegal= representantLegal;
                this.email= email ;
                this.numTel= numTel;
                this.dateConstitution= getDateISO(dateConstitution);
                this.chiffreAffaire= chiffreAffaire;
                this.nbEmploye= nbEmploye;
                this.capital= capital;
                this.actionnariat= actionnariat;
                this.destinationPret= destinationPret;
                this.montantSouhaite= montantSouhaite;
                this.dureeSouhaite= dureeSouhaite;
                this.tauxInteretOffert= tauxInteretOffert;
                this.siteWeb= siteWeb;
                this.image= image;
            }
    }
}
