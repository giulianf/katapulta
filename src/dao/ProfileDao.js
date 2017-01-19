import _ from 'lodash';
import { error, debug, info } from '../common/UtilityLog';
import { createDateMongo, getBelgiumDate, getYear, getBelgiumDateDetails, addDays, getCurrentMomentDate, getDateISO } from '../common/Utility';
import { BasicInfo } from '../model/BasicInfo';
import { BasicInfoEmprunteur } from '../model/BasicInfoEmprunteur';
import { ContractsPreteur } from '../model/ContractsPreteur';
import { ContractsEmprunteur } from '../model/ContractsEmprunteur';
import async from 'async';
import ValidatorBasic from '../validator/validatorBasicInfo';
import ValidatorEmprunteur from '../validator/validatorEmprunteurBasic';
let soap = require('soap');

export class ProfileDao {
    constructor(_mongodb) {
        this._mongodb = _mongodb;
    }


    /**
     * getBasicInfo - Get Basic Info by User id
     *
     * @param  {type} res  description
     * @param  {type} user description
     * @return {type}      description
     */
    getBasicInfo(res, user, email) {
        info('Entering getBasicInfo() data: ' + JSON.stringify( user ) + ' email: ' + email);

         try {
             const userId = user;
             let basicProfil = null;

             if (_.isNil(this._mongodb)) {
                 throw new Error("La base de données n'est pas connectée.");
             }

            async.series([
                (callback) => {
                    this.getClientByUserId( userId, email, (profile, err) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        basicProfil = profile;
                        callback();
                    });
                },
                (callback) => {
                    debug("****  BasicProfil: " + JSON.stringify( basicProfil ) );

                    res.end( JSON.stringify( basicProfil ) );
                }
            ], (err) => {
                error("Unable to getBasicInfo. " , err);
                //   When it's done
                if (err) {
                    res.status(500).json(err);
                    return;
                }
            });
        } catch( e ) {
            error('error: ' + e);
            res.status(500).send('Problème pendant la récupération des infos. ' + e.message);
        }
    }


    /**
     * getClientByUserId - get client by user id
     *
     * @param  {type} userId   description
     * @param  {type} callback description
     * @return {type}          description
     */
    getClientByUserId( userId, email, callback) {
        try {
            const clients = this._mongodb.collection('clients');
            let basicProfil = null;
            // Find some documents
            clients.findOne({'user_id': userId}, function(err, client) {
              debug("*****  Client found: " + JSON.stringify( client ));

              if (!_.isNil(client)) {
                  basicProfil = new BasicInfo(client);
              } else {
                  basicProfil = new BasicInfo(null, userId, '' , '', '01/09/1939',
                    null, email, '', '', '', false, null, createDateMongo());
              }
              callback(basicProfil);
          });
        } catch (e) {
            callback(null, e);
        }
    }


    /**
     * updateBasicInfo - Update basic info
     *
     * @param  {type} res       description
     * @param  {type} basicInfo description
     * @return {type}           description
     */
    updateBasicInfo(res, basicInfo) {
        info('Entering updateBasicInfo() basic info: ' + basicInfo.user_id);
        let clients;
         try {
             async.series([
                (callback) => {
                    // Validate basic Info
                    ValidatorBasic.validateProfileTabBasic(basicInfo);

                    // Find some documents
                    clients = this._mongodb.collection('clients');

                    if (_.isNil(basicInfo.id)) {
                        basicInfo.createDate = createDateMongo();
                    }

                    // this._mongodb.collection('clients').insert( basicInfo, function(err, r) {
                    clients.findOneAndUpdate({'user_id': basicInfo.user_id}, basicInfo, {
                        returnOriginal: false
                      , upsert: true
                    }, (err, clientResult) => {
                        if(err) {
                            callback(err);
                        }
                        const basicProfil = new BasicInfo(clientResult.value);
                        debug('Result findOneAndUpdate client: ' + basicProfil.toLog() );

                        res.end( JSON.stringify(basicProfil) );
                    });
                }
            ], (err) => {
                error("Unable to updateBasicInfo " , err);
                //   When it's done
                if (err) {
                    res.status(500).json(err);
                    return;
                }
            });
        } catch( e ) {
            error('error: ' + e);
            res.status(500).send("Problème pendant l'enregistrement du profil. " + e.message);
        }
    }


        /**
         * getBasicInfo - Get Basic Info by User id
         *
         * @param  {type} res      response
         * @param  {type} user     user id from auth0
         * @param  {type} email    email from auth profile
         */
        getEmprunteurBasicInfo(res, user) {
            info('Entering getEmprunteurBasicInfo() data: ' + JSON.stringify( user ) );

             try {
                 const userId = user;
                 let basicInfoEmprunteur = null;

                 const emprunteurs = this._mongodb.collection('emprunteurs');

                async.series([
                    (callback) => {
                        // Find some documents
                        emprunteurs.findOne({'user_id': userId}, function(err, emprunteur) {
                          debug("*****  emprunteur found: " + _.isEmpty( emprunteur ));

                          if (!_.isNil(emprunteur)) {
                              basicInfoEmprunteur = new BasicInfoEmprunteur(emprunteur);
                          } else {
                              basicInfoEmprunteur = new BasicInfoEmprunteur(null, userId, '', '', '', '', '', '', '', '','', '', '', '', '','01/09/1989',
                               0, 0, 0, [], '', 0, 4, 2.25, 'http://www.', false, false, [], null);
                          }

                          callback();
                        });
                    },
                    (callback) => {
                        debug("****  BasicInfoEmprunteur: " + JSON.stringify( basicInfoEmprunteur.toLog() ) );

                        res.end( JSON.stringify( basicInfoEmprunteur ) );
                    }
                ], (err) => {
                    error("Unable to getEmprunteurBasicInfo " , err);
                    //   When it's done
                    if (err) {
                        res.status(500).json(err);
                        return;
                    }
                });
            } catch( e ) {
                error('error: ' + e);
                res.status(500).send('Problème pendant la récupération des infos. ' + e.message);
            }
        }


    /**
     * updateEmprunteurInfo - Update emprunteur basic info profile tab
     *
     * @param  {type} res                   response
     * @param  {Object} basicEmprunteurProfil description
     */
    updateEmprunteurInfo (res, basicEmprunteurProfil) {
        try {
            let emprunteur = _.cloneDeep(basicEmprunteurProfil);
            emprunteur.image = [];
            emprunteur.logo = {};
            info('Entering updateEmprunteurInfo() emprunteur info: ' + JSON.stringify(emprunteur));

            const urlSoap = process.env.SOAP_VAT_URL;
            let clientSoap;
            debug("VAT is: " + _.replace(basicEmprunteurProfil.numEntreprise, /\./g, '') );
            const args = {countryCode: 'BE', vatNumber:  _.replace(basicEmprunteurProfil.numEntreprise, /\./g, '')};

            async.series([
                (callback) => {
                    // Validate basic Info
                    ValidatorEmprunteur.validateProfileEmprunteurTab(basicEmprunteurProfil);

                    soap.createClient(urlSoap, function(err, client) {
                        if (err) {
                            error("Error during connection of VAT SOAP. ", err);
                            callback("Error during connection of VAT SOAP. ");
                        }
                        info("info SOAP VAT connected");

                        clientSoap = client;
                        callback();
                    });
                },
                (callback) => {
                    clientSoap.checkVat(args, function(err, result) {
                         if (err) {
                             error("Error during VAT. " , err);
                             callback("Problème durant la validation de la tva. Réessayer plus tard, merci.");
                             return;
                         }
                         debug("Result of VAT: " + JSON.stringify(result));
                         // VAT is valid
                         if (result.valid == true) {
                             callback();
                         } else {
                             debug("user " +basicEmprunteurProfil.user_id +" la tva " + basicEmprunteurProfil.numEntreprise + " n'est pas valid.");
                             callback("Le numéro d'entreprise " + basicEmprunteurProfil.numEntreprise + " n'est pas valid.");
                         }
                    });
                },
                (callback) => {
                    // Find some documents
                    let emprunteurs = this._mongodb.collection('emprunteurs');
                    debug('test emprunteurs')

                    if ( _.isNil(basicEmprunteurProfil.id) ) {
                        basicEmprunteurProfil.createDate = createDateMongo();
                        debug('creation date ' + basicEmprunteurProfil.createDate);

                        let endDate = getBelgiumDate( getCurrentMomentDate() );
                        endDate = addDays( getDateISO(endDate), 10);
                        endDate = getBelgiumDateDetails(endDate);
                        debug('end date ' + endDate);

                        basicEmprunteurProfil.endDate = endDate;
                    }

                    emprunteurs.findOneAndUpdate({'user_id': basicEmprunteurProfil.user_id}, basicEmprunteurProfil, {
                        returnOriginal: false
                      , upsert: true
                    }, (err, emprunteurResult) => {
                        if(err) {
                            callback(' error async ' , err);
                        }
                        const basicEmprunteur = new BasicInfoEmprunteur(emprunteurResult.value);
                        debug('Result findOneAndUpdate emprunteur: ' + basicEmprunteur.toLog() );

                        res.end( JSON.stringify(basicEmprunteur) );
                    });
                }
            ], (err) => {
                error("Unable to updateEmprunteurInfo " , err);
                //   When it's done
                if (err) {
                    res.status(500).send(err.message);
                    return;
                }
            });
        } catch( e ) {
            error('error: ' + e);
            res.status(500).send("Problème pendant l'enregistrement du profil. " + e.message);
        }
    }

    updateFavoris(res, user_id, emprunteurId, removed) {
        info('Entering updateFavoris() user: ' + user_id);

        let clients;
         try {

             if (_.isNil(user_id)) {
                throw new Error("Cet utilisateur ne peut sauvegarder de favoris.");
             }

             let basicProfil = null;
             async.series([
                 (callback) => {
                     this.getClientByUserId(user_id, null, (profile, err) => {
                         if (err) {
                             callback(err);
                             return;
                         }
                         basicProfil = profile;
                         if (!_.isNil(basicProfil) && !_.isNil(basicProfil.id) ) {
                             callback();
                         } else {
                             callback("L'utilisateur n'existe pas");
                         }
                     });
                 },
                (callback) => {
                    // Validate basic Info
                    // ValidatorBasic.validateProfileTabBasic(basicInfo);

                    // Find some documents
                    clients = this._mongodb.collection('clients');

                    if (removed) {
                        debug('Favoris to remove: '+ emprunteurId );
                        _.remove(basicProfil.favoris, f => {
                            return _.isEqual(f.emprunteurId, emprunteurId);
                        });
                    } else {
                        debug('Favoris to add: '+ emprunteurId );

                        basicProfil.favoris.push({emprunteurId: emprunteurId});
                        basicProfil.favoris = _.sortedUniq(basicProfil.favoris);
                    }
                    // this._mongodb.collection('clients').insert( basicInfo, function(err, r) {
                    clients.findOneAndUpdate({'user_id': basicProfil.user_id}, basicProfil, {
                        returnOriginal: false
                      , upsert: true
                    }, (err, clientResult) => {
                        if(err) {
                            callback(err);
                        }
                        const basicProfil = new BasicInfo(clientResult.value);
                        debug('Result findOneAndUpdate client: ' + JSON.stringify( basicProfil.toLog() ) );

                        res.end( JSON.stringify(basicProfil) );
                    });
                }
            ], (err) => {
                error("Unable to updateBasicInfo " , err);
                //   When it's done
                if (err) {
                    res.status(500).json(err);
                    return;
                }
            });
        } catch( e ) {
            error('error: ' + e);
            res.status(500).send("Problème pendant l'enregistrement du profil. " + e.message);
        }
    }
}
