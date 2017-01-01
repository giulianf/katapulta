import _ from 'lodash';
import { validateEmail , validateDate, validateCodePostal, periodDate } from '../common/Utility';

export default {
    TAUX_MINIMUM : 1.125,
    TAUX_MAXIMUM : 2.25,
    PRET_MAX : 100000,
  validateProfileEmprunteurTab(basicInfoEmprunteur) {
      if (_.isNil(basicInfoEmprunteur)) {
          throw new Error("Impossible de valider le profil de l'emprunteur.");
      }
      if (!this.validateActionnariat(basicInfoEmprunteur.actionnariatList)) {
          throw new Error("Les actionnaires ne sont pas valids.");
      }
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

  validateFormeJuridique(formeJuridique) {
      return !_.isNil(formeJuridique) &&
      ( _.isEqual(formeJuridique, "SPRL") || _.isEqual(formeJuridique, "SPRL-S") ||  _.isEqual(formeJuridique, "SPRL") ||
        _.isEqual(formeJuridique, "SCRL") || _.isEqual(formeJuridique, "SCRI") || _.isEqual(formeJuridique, "SA") ||
        _.isEqual(formeJuridique, "SNC") || _.isEqual(formeJuridique, "SCS") || _.isEqual(formeJuridique, "SCA") ||
        _.isEqual(formeJuridique, "ASBL") || _.isEqual(formeJuridique, "FONDATION") ) ? true : false;
  },
};
