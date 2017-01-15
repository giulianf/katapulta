import { getDateISO , getCurrentDate } from '../common/Utility';
import _ from 'lodash';

export class BasicInfoEmprunteur {

    /**
     * constructor - description
     *
     * @param  {Object} emprunteur                     description
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
     * @param  {string} sectorActivite           description
     * @param  {type} email                       description
     * @param  {type} numTel                      description
     * @param  {Date} dateConstitution            description
     * @param  {Number} chiffreAffaire              description
     * @param  {Number} nbEmploye                   description
     * @param  {Number} capital                     description
     * @param  {List} actionnariat                description
     * @param  {type} destinationPret             description
     * @param  {Number} montantSouhaite             description
     * @param  {type} dureeSouhaite               description
     * @param  {Number} tauxInteretOffert           description
     * @param  {type} siteWeb                     description
     * @param  {Boolean} isFavoris                       is favoris for user connected
     * @param  {Date} createDate                       creation date
     * @param  {Date} endDate                       end date for the emprunt
     * @param  {Boolean} isOurSelection                      This entrepreneur is our selection
     * @param  {type} image                       description
     * @param  {type} logo                       description
     * @return {type}                             description
     */
    constructor(emprunteur, user_id, denominationSocial, formeJuridique, numEntreprise,
        adresseSiegeSocial, codePostalSiegeSocial, villeSiegeSocial,
        adresseSiegeExploitation, codePostalSiegeExploitation, villeSiegeExploitation,
        representantLegal, sectorActivite, email, numTel, dateConstitution, chiffreAffaire, nbEmploye,
        capital, actionnariat,destinationPret, montantSouhaite,dureeSouhaite, tauxInteretOffert, siteWeb,
        isFavoris, createDate, endDate, isOurSelection, image, logo) {
            if (!_.isNil(emprunteur)) {
                this.user_id= emprunteur.user_id;
                this.id= emprunteur._id;
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
                this.sectorActivite= emprunteur.sectorActivite ;
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
                this.isFavoris= emprunteur.isFavoris;
                this.endDate= emprunteur.endDate;
                this.isOurSelection= emprunteur.isOurSelection;
                this.image= emprunteur.image;
                this.logo= emprunteur.logo;
                this.createDate= emprunteur.createDate;
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
                this.sectorActivite= sectorActivite ;
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
                this.isFavoris= isFavoris;
                this.endDate= endDate;
                this.isOurSelection= isOurSelection;
                this.image= image;
                this.logo= logo;
                this.createDate= createDate;
            }
    }

    toLog() {
        return 'id: ' + this.id + ', user_id: ' + this.user_id + ', denominationSocial: ' +this.denominationSocial + ', formeJuridique: ' + this.formeJuridique +
        ', numEntreprise: ' + this.numEntreprise + ', codePostalSiegeSocial ' + this.codePostalSiegeSocial +', adresseSiegeSocial '+this.adresseSiegeSocial+
        ', villeSiegeSocial '+this.villeSiegeSocial +', adresseSiegeExploitation '+this.adresseSiegeExploitation +', codePostalSiegeExploitation '+ this.codePostalSiegeExploitation +
        ', villeSiegeExploitation '+this.villeSiegeExploitation + ', sectorActivite ' + this.sectorActivite +', representantLegal '+ this.representantLegal +', email '+ this.email +
        ', numTel '+this.numTel +', dateConstitution '+this.dateConstitution +', chiffreAffaire '+this.chiffreAffaire+', nbEmploye '+this.nbEmploye +
        ', capital '+this.capital+', actionnariat '+this.actionnariat +', destinationPret '+this.destinationPret +', montantSouhaite '+this.montantSouhaite+
        ', dureeSouhaite '+this.dureeSouhaite+', tauxInteretOffert '+this.tauxInteretOffert+', siteWeb '+this.siteWeb+', creation date '+this.createDate+', end date '+this.endDate;
    }
}
