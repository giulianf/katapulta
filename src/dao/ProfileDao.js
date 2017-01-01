import _ from 'lodash';
import { error, debug, info, getYear, addYear, getBelgiumDate} from '../common/UtilityLog';
import { BasicInfo } from '../model/BasicInfo';
import { BasicInfoEmprunteur } from '../model/BasicInfoEmprunteur';
import async from 'async';
import Validator from '../validator/validatorBasicInfo';
let soap = require('soap');

export class ProfileDao {
    constructor() {

    }


    /**
     * getBasicInfo - Get Basic Info by User id
     *
     * @param  {type} res  description
     * @param  {type} user description
     * @return {type}      description
     */
    getBasicInfo(res, _mongodb, user, email) {
        info('Entering getBasicInfo() data: ' + JSON.stringify( user ) + ' email: ' + email);

         try {
             const userId = user;
             let basicProfil = null;

             const clients = _mongodb.collection('clients');

            async.series([
                (callback) => {
                    // Find some documents
                    clients.findOne({'user_id': userId}, function(err, client) {
                      debug("*****  Client found: " + JSON.stringify( client ));

                      if (!_.isNil(client)) {
                          basicProfil = new BasicInfo(client);
                      } else {
                          basicProfil = new BasicInfo(null, null, userId, '' , '', '01/09/1939',
                            null, email, '', '', '', false);
                      }

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
     * updateBasicInfo - Update basic info
     *
     * @param  {type} res       description
     * @param  {type} _mongodb  description
     * @param  {type} basicInfo description
     * @return {type}           description
     */
    updateBasicInfo(res, _mongodb, basicInfo) {
        info('Entering updateBasicInfo() basic info: ' + basicInfo.user_id);
        let clients;
         try {
             async.series([
                (callback) => {
                    // Validate basic Info
                    Validator.validateProfileTabBasic(basicInfo);

                    // Find some documents
                    clients = _mongodb.collection('clients');

                    // _mongodb.collection('clients').insert( basicInfo, function(err, r) {
                    clients.findOneAndUpdate({'user_id': basicInfo.user_id}, basicInfo, {
                        returnOriginal: false
                      , upsert: true
                  }, (err, clientResult) => {
                        if(err) {
                            callback(err);
                        }
                        debug('Result findOneAndUpdate: ' + JSON.stringify(clientResult.value));
                        const basicProfil = new BasicInfo(clientResult);

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
         * @param  {type} _mongodb db connection
         * @param  {type} user     user id from auth0
         * @param  {type} email    email from auth profile
         */
        getEmprunteurBasicInfo(res, _mongodb, user) {
            info('Entering getEmprunteurBasicInfo() data: ' + JSON.stringify( user ) );

             try {
                 const userId = user;
                 let basicInfoEmprunteur = null;

                 const emprunteurs = _mongodb.collection('emprunteurs');

                async.series([
                    (callback) => {
                        // Find some documents
                        emprunteurs.findOne({'user_id': userId}, function(err, emprunteur) {
                          debug("*****  emprunteur found: " + JSON.stringify( emprunteur ));

                          if (!_.isNil(emprunteur)) {
                              basicInfoEmprunteur = new BasicInfoEmprunteur(emprunteur);
                          } else {
                              basicInfoEmprunteur = new BasicInfoEmprunteur(null, userId, '', '', '', '', '', '', '', '','', '', '', '',
                              '01/09/1989', 0, '', 0, 0, 0, [], '', 2.25, 'www.', null);
                          }

                          callback();
                        });
                    },
                    (callback) => {
                        debug("****  BasicInfoEmprunteur: " + JSON.stringify( basicInfoEmprunteur ) );

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
     * @param  {type} _mongodb              DB connection
     * @param  {Object} basicEmprunteurProfil description
     */
    updateEmprunteurInfo (res, _mongodb, basicEmprunteurProfil) {
        info('Entering updateEmprunteurInfo() emprunteur info: ' + JSON.stringify(basicEmprunteurProfil));

        const urlSoap = process.env.SOAP_VAT_URL;
        let clientSoap;
        debug("VAT is: " + _.replace(basicEmprunteurProfil.numEntreprise, /\./g, '') );
        const args = {countryCode: 'BE', vatNumber:  _.replace(basicEmprunteurProfil.numEntreprise, /\./g, '')};

        async.series([
            (callback) => {
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
                         callback("Le numéro de TVA n'est pas valid.");
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
                // Validate basic Info
                // Validator.validateProfileTabBasic(basicInfo);

                // Find some documents
                let emprunteurs = _mongodb.collection('emprunteurs');

                // _mongodb.collection('clients').insert( basicInfo, function(err, r) {
                emprunteurs.findOneAndUpdate({'user_id': basicEmprunteurProfil.user_id}, basicEmprunteurProfil, {
                    returnOriginal: false
                  , upsert: true
              }, (err, emprunteurResult) => {
                    if(err) {
                        callback(err);
                    }
                    debug('Result findOneAndUpdate: ' + JSON.stringify(emprunteurResult.value));
                    const basicEmprunteur = new BasicInfoEmprunteur(emprunteurResult);

                    res.end( JSON.stringify(basicEmprunteur) );
                });
            }
        ], (err) => {
            error("Unable to updateEmprunteurInfo " , err);
            //   When it's done
            if (err) {
                res.status(500).send(err);
                return;
            }
        });

    }
}
