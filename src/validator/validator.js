import _ from 'lodash';
import { validateEmail , validateDate } from '../common/Utility';
import belgium from '../data/zipcode-belgium.json';

export default {
  validateProfileTabBasic(basicInfo) {
      if (_.isNil(basicInfo)) {
          throw new Error("Impossible de valider le profil utilisateur.");
      }
      if (!this.validatePrenom(basicInfo.prenom)) {
          throw new Error("Le prénom n'est pas valid.");
      }
      if (!this.validateNom(basicInfo.nom)) {
          throw new Error("Le prénom n'est pas valid.");
      }
      if (!this.validateNaissance(basicInfo.dateNaissance)) {
          throw new Error("La date de naissance n'est pas valide.");
      }
      if (!this.validateNational(basicInfo.numNational)) {
          throw new Error("Le numéro national n'est pas valid.");
      }
      if (!this.validateEmailAddress(basicInfo.email)) {
          throw new Error("L'adresse email n'est pas valide.");
      }
      if (!this.validateAddress(basicInfo.address)) {
          throw new Error("L'adresse n'est pas valide.");
      }
      if (!this.validateCodePostal(basicInfo.codePostal)) {
          throw new Error("Le code postal n'est pas valid.");
      }
      if (!this.validateVille(basicInfo.ville)) {
          throw new Error("La ville n'est pas valide.");
      }
  },
  validatePrenom(prenom) {
      return !_.isNil(prenom) && !_.isEmpty(prenom) ? true : false;
  },
  validateNom(nom) {
      return !_.isNil(nom) && !_.isEmpty(nom) ? true : false;
  },
  validateNaissance(dateNaissance) {
      return !_.isNil(dateNaissance) && !_.isEmpty(dateNaissance) && validateDate(dateNaissance) ? true : false;
  },
  validateNational(numNational) {
      return !_.isNil(numNational) && !_.isEmpty(numNational) && _.size(numNational) == 11  ? true : false;
  },
  validateEmailAddress(email) {
      return !_.isNil(email) && validateEmail(email) ? true : false;
  },
  validateAddress(address) {
      return !_.isNil(address) && !_.isEmpty(address) ? true : false;
  },
  validateCodePostal(codePostal) {
      const zipObject = _.find(belgium, {'zip': codePostal});
      return !_.isNil(codePostal) && !_.isNil(zipObject) ? true : false;
  },
  validateVille(ville) {
      return !_.isNil(ville) && !_.isEmpty(ville) ? true : false;
  },
};
