import _ from 'lodash';
import { validateEmail , validateDate, validateCodePostal, periodDate, validateWeb } from '../common/Utility';

export default {
    TAUX_MINIMUM : 1.125,
    TAUX_MAXIMUM : 2.25,
    PRET_MAX : 100000,
  validateProfileEmprunteurTab(basicInfoEmprunteur) {
      if (_.isNil(basicInfoEmprunteur)) {
          throw new Error("Impossible de valider le profil de l'emprunteur.");
      }

      if (!this.validateString(basicInfoEmprunteur.denominationSocial)) {
          throw new Error("La dénomination sociale n'est pas valide.");
      }

      if (!this.validateFormeJuridique(basicInfoEmprunteur.formeJuridique)) {
          throw new Error("La forme juridique n'est pas valide.");
      }

      if (!this.validateTva(basicInfoEmprunteur.numEntreprise)) {
          throw new Error("Le numéro d'entreprise n'est pas valid.");
      }

      if (!this.validateAddress(basicInfoEmprunteur.adresseSiegeSocial)) {
          throw new Error("L'adresse du siège social n'est pas valide.");
      }

      if (!this.validateCodePostal(basicInfoEmprunteur.codePostalSiegeSocial)) {
          throw new Error("Le code postal du siège social n'est pas valid.");
      }

      if (!this.validateString(basicInfoEmprunteur.villeSiegeSocial)) {
          throw new Error("La ville du siège social n'est pas valide.");
      }

      if (!this.validateAddress(basicInfoEmprunteur.adresseSiegeExploitation)) {
          throw new Error("L'adresse du siège d'exploitation n'est pas valide.");
      }

      if (!this.validateCodePostal(basicInfoEmprunteur.codePostalSiegeExploitation)) {
          throw new Error("Le code postal du siège d'exploitation n'est pas valid.");
      }

      if (!this.validateString(basicInfoEmprunteur.villeSiegeExploitation)) {
          throw new Error("La ville du siège d'exploitation n'est pas valid.");
      }

      if (!this.validateString(basicInfoEmprunteur.representantLegal)) {
          throw new Error("Le représentant légal n'est pas valid.");
      }

        if (!this.validateEmailAddress(basicInfoEmprunteur.email)) {
            throw new Error("L'email n'est pas valid.");
        }

      if (!this.validateString(basicInfoEmprunteur.numTel)) {
          throw new Error("Le numéro de téléphone n'est pas valid.");
      }

      if (!this.validateDateConstitution(basicInfoEmprunteur.dateConstitution)) {
          throw new Error("La date de constitution n'est pas valide.");
      }

      if (!this.validateChiffreAffaire(basicInfoEmprunteur.chiffreAffaire)) {
          throw new Error("Le chiffre d'affaire n'est pas valid.");
      }

      if (!this.validateNbEmploye(basicInfoEmprunteur.nbEmploye)) {
          throw new Error("Le nombre d'employé n'est pas valid.");
      }

      if (!this.validateNumber(basicInfoEmprunteur.capital)) {
          throw new Error("Le capital n'est pas valid.");
      }

      if (!this.validateActionnariat(basicInfoEmprunteur.actionnariat)) {
          throw new Error("Les actionnaires ne sont pas valids.");
      }

      if (!this.validateString(basicInfoEmprunteur.destinationPret)) {
          throw new Error("La destination du prêt n'est pas valid.");
      }

      if (!this.validatePretSouhaite(basicInfoEmprunteur.montantSouhaite)) {
          throw new Error("Le montant souhaité n'est pas valid.");
      }

      if (!this.validateYearSouhaite(basicInfoEmprunteur.dureeSouhaite)) {
          throw new Error("La durée souhaitée n'est pas valid.");
      }

      if (!this.validateTauxInteret(basicInfoEmprunteur.tauxInteretOffert)) {
          throw new Error("Le taux intérêt offert n'est pas valid.");
      }

      if (!this.validateSiteWeb(basicInfoEmprunteur.siteWeb)) {
          throw new Error("Le site web n'est pas valid.");
      }

  },

  validateFormeJuridique(formeJuridique) {
      return !_.isNil(formeJuridique) &&
      ( _.isEqual(formeJuridique, "SPRL") || _.isEqual(formeJuridique, "SPRL-S") ||  _.isEqual(formeJuridique, "SPRL") ||
        _.isEqual(formeJuridique, "SCRL") || _.isEqual(formeJuridique, "SCRI") || _.isEqual(formeJuridique, "SA") ||
        _.isEqual(formeJuridique, "SNC") || _.isEqual(formeJuridique, "SCS") || _.isEqual(formeJuridique, "SCA") ||
        _.isEqual(formeJuridique, "ASBL") || _.isEqual(formeJuridique, "FONDATION") ) ? true : false;
  },

  validateUniqActionnariat(actionnariatList, newNameActionnaire) {
      if ( !_.isEmpty(actionnariatList) ) {
          for(let i = 0; i < actionnariatList.length; i++) {
              const actionnaire = actionnariatList[i];
              if (_.isEqual(actionnaire.nomComplet, _.trimStart(newNameActionnaire))) {
                  return false;
              }
          }
      }

      return true;
  },
  validateNewActionnariat(actionnariatList, newPartActionnaire) {
      if (newPartActionnaire.nbPart <= 0) {
          return false;
      }

      if (this.validateUniqActionnariat(actionnariatList, newPartActionnaire.nomComplet)) {
          return true;
      } else {
          return false;
      }
  },

  /**
   * validatePartActionnariat - Sum of parts must be 100
   *
   * @param  {type} actionnariatList description
   * @return {type}                  description
   */
  validatePartActionnariat(actionnariatList) {
      if ( !_.isEmpty(actionnariatList) ) {
          const nbParts = _.reduce(_.map(actionnariatList, (actionnaire) => {
             return actionnaire.nbPart;
         }), (total , part )=> {
             return total += part;
         });

         if (nbParts == 100) {
             return true;
         }
      }

      return false;
  },

  validateTva(tva) {
      return !_.isNil(tva) && (_.size(tva) == 12) ? true : false;
  },

  validatePretSouhaite(pret) {
      return !_.isNil(pret) && pret > 1000 && pret < this.PRET_MAX ? true : false;
  },

  validateYearSouhaite(year) {
      return year == 4 || year == 6  || year == 8 ? true : false;
  },

  validateTauxInteret(taux) {
      if (!_.isNil(taux)) {
          if (taux <= this.TAUX_MAXIMUM && taux >= this.TAUX_MINIMUM) {
              return true;
          }
      }

      return false;
  },

  validateActionnariat(actionnariat) {
      if (!_.isNil(actionnariat) && !_.isEmpty(actionnariat) && this.validatePartActionnariat(actionnariat)) {
          return true;
      }

      return false;
  },

  validateEmailAddress(email) {
      return !_.isNil(email) && validateEmail(email) ? true : false;
  },

  validateAddress(address) {
      return !_.isNil(address) && !_.isEmpty(address) ? true : false;
  },

  validateString(text) {
      return !_.isNil(text) && !_.isEmpty(text) ? true : false;
  },

  validateNumber(chiffre) {
      return !_.isNil(chiffre) && _.isNumber(chiffre) ? true : false;
  },

  validateCodePostal(codePostal) {
      return validateCodePostal(codePostal) ? true : false;
  },

  validateDateConstitution(date) {
      return !_.isNil(date) && !_.isEmpty(date) && validateDate(date) && periodDate(date, 5) ? true : false;
  },

  validateChiffreAffaire(chiffreAffaire) {
      return !_.isNil(chiffreAffaire) && _.isNumber(chiffreAffaire) && chiffreAffaire <= 50000000 ? true : false;
  },

  validateNbEmploye(nbEmploye) {
      return !_.isNil(nbEmploye) && _.isNumber(nbEmploye) && nbEmploye <= 250 ? true : false;
  },

  validateSiteWeb(siteWeb) {
      return !_.isNil(siteWeb) && validateWeb(siteWeb) ? true : false;
  },


};
