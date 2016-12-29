export class BasicInfoEmprunteur {
    constructor(user_id, denominationSocial, formeJuridique, numEntreprise, siegeSocial, siegeExploitation, representantLegal,
         email, numTel, dateConstitution, chiffreAffaire, nbEmploye, capital, actionnariat,
         destinationPret, montantSouhaite, dureeSouhaite, tauxInteretOffert, siteWeb, image) {
        this.user_id= user_id;
        this.denominationSocial= denominationSocial;
        this.formeJuridique= formeJuridique ;
        this.numEntreprise= numEntreprise ;
        this.siegeSocial= siegeSocial ;
        this.siegeExploitation= siegeExploitation ;
        this.representantLegal= representantLegal;
        this.email= email ;
        this.numTel= numTel;
        this.dateConstitution= dateConstitution;
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
