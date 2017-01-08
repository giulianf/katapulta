import _ from 'lodash';


export class ThumbEmprunteur {

    /**
     * constructor - Dans le profil afficher les favoris selectionner dans l'explorer
     *
     * @param  {number} emprunteurId   description
     * @param  {string} nomSociete     description
     * @param  {number} chiffreAffaire description
     * @param  {string} activite activite de la societe
     * @param  {string} description description de la societe
     * @param  {type} imageHeader    description
     * @param  {Date} creationDate   description
     * @param  {string} niveau   niveau de la societe
     * @param  {boolean} isFavoris   to know if it's favoris
     * @return {type}                description
     */
    constructor(emprunteur, emprunteurO, nomSociete, chiffreAffaire, activite, description, imageHeader, creationDate, niveau, isFavoris, location) {
        if (!_.isNil(emprunteur)) {
            this.id= emprunteur._id;
            this.nomSociete= nomSociete;
            this.chiffreAffaire= chiffreAffaire;
            this.activite= activite;
            this.description= description;
            this.creationDate= creationDate;
            this.imageHeader= imageHeader;
            this.niveau= niveau;
            this.isFavoris= isFavoris;
            this.location= location;
        }
        this.emprunteurId= emprunteurId;
        this.nomSociete= nomSociete;
        this.chiffreAffaire= chiffreAffaire;
        this.activite= activite;
        this.description= description;
        this.creationDate= creationDate;
        this.imageHeader= imageHeader;
        this.niveau= niveau;
        this.isFavoris= isFavoris;
        this.location= location;
    }
}
