import _ from 'lodash';
import { error, debug, info } from '../common/UtilityLog';
import { createDateMongo, getBelgiumDate, getYear, getBelgiumDateDetails, addDays, getCurrentMomentDate, getDateISO } from '../common/Utility';
import { BasicInfo } from '../model/BasicInfo';
import { BasicInfoEmprunteur } from '../model/BasicInfoEmprunteur';
import { ContractsEmprunteur } from '../model/ContractsEmprunteur';
import { ContractDao } from '../dao/ContractDao';
import async from 'async';
import ValidatorEmprunteur from '../validator/validatorEmprunteurBasic';
let soap = require('soap');
const ObjectId = require('mongodb').ObjectId;


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

              if (!_.isNil(client)) {
                  basicProfil = new BasicInfo(client);
              } else {
                  basicProfil = new BasicInfo(null, userId, email);
              }

              debug("*****  Client found: " + basicProfil.toLog());

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

                    // Find some documents
                    clients = this._mongodb.collection('clients');

                    if (_.isNil(basicInfo.id)) {
                        // basicInfo.creationDate = createDateMongo();
                    }

                    info('basicInfo: ' +JSON.stringify(basicInfo));

                    // this._mongodb.collection('clients').insert( basicInfo, function(err, r) {
                    clients.findOneAndUpdate({'user_id': basicInfo.user_id},
                    {
                         $set:  basicInfo,
                        $setOnInsert: { creationDate: createDateMongo() }
                    }, {
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
         * getEmprunteurBasicInfo- return emprunteur by user Id
         *
         * @param  {type} res      response
         * @param  {type} user     user id from auth0
         */
        getEmprunteurBasicInfoResponse(res, user) {
            info('Entering getEmprunteurBasicInfo() data: ' + JSON.stringify( user ) );

             try {
                 const userId = user;
                 let basicInfoEmprunteur = null;


                async.series([
                    (callback) => {
                        this.getEmprunteurBasicInfoByUserId(userId, (emprunteur, err) => {
                            if (err) {
                                callback(err);
                                return;
                            }
                            basicInfoEmprunteur = emprunteur;

                            callback();
                        });
                    },
                    (callback) => {
                        debug("****  getEmprunteurBasicInfoResponse: " + JSON.stringify( basicInfoEmprunteur.toLog() ) );

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
     * getEmprunteurBasicInfoByUserId - return emprunteur by user Id
     *
     * @param  {type} userId   description
     * @param  {type} callback description
     * @return {type}          description
     */
    getEmprunteurBasicInfoByUserId(userId, callback) {
        try {
            let basicInfoEmprunteur;
            const emprunteurs = this._mongodb.collection('emprunteurs');

            // Find some documents
            emprunteurs.findOne({'user_id': userId}, function(err, emprunteur) {
              debug("*****  emprunteur found: " + _.isEmpty( emprunteur ));

              if (!_.isNil(emprunteur)) {
                  basicInfoEmprunteur = new BasicInfoEmprunteur(emprunteur);
              } else {
                  basicInfoEmprunteur = new BasicInfoEmprunteur(null, userId);
              }

              callback(basicInfoEmprunteur);
            });
        } catch(e) {
            error('Error During getEmprunteurBasicInfo.', e);
            callback(null, e)
        }
    }

    /**
     * getEmprunteurBasicInfoByUserId - return emprunteur by user Id
     *
     * @param  {type} emprunteurId   description
     * @param  {type} callback description
     * @return {type}          description
     */
    getEmprunteurBasicInfoById( emprunteurId, callback) {
        try {
            let basicInfoEmprunteur;
            const emprunteurs = this._mongodb.collection('emprunteurs');

            // Find some documents
            emprunteurs.findOne({'_id': new ObjectId(emprunteurId)}, (err, emprunteur) => {
              debug("*****  emprunteur found: " + _.isEmpty( emprunteur ));

              if (!_.isNil(emprunteur)) {
                  basicInfoEmprunteur = new BasicInfoEmprunteur(emprunteur);
              } else {
                  basicInfoEmprunteur = new BasicInfoEmprunteur(null, emprunteurId);
              }

              callback(basicInfoEmprunteur);
            });
        } catch(e) {
            error('Error During getEmprunteurBasicInfo.', e);
            callback(null, e)
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

            // check validation if ok DESCRIPTION STATUS
            // check validation if NOT ok still INSCRIPTION STATUS

            async.series([
                (callback) => {
                    // Validate basic Info
                    try {
                        ValidatorEmprunteur.validateProfileEmprunteurTab(basicEmprunteurProfil);
                        basicEmprunteurProfil.status = 'DESCRIPTION_PRÊT';
                    } catch (e) {
                        basicEmprunteurProfil.status = 'INSCRIPTION';
                    }

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
                        // basicEmprunteurProfil.createDate = createDateMongo();
                        debug('creation date ' + basicEmprunteurProfil.creationDate);

                        let endDate = getBelgiumDate( getCurrentMomentDate() );
                        endDate = addDays( getDateISO(endDate), 10);
                        endDate = getBelgiumDateDetails(endDate);
                        debug('end date ' + endDate);

                        basicEmprunteurProfil.endDate = endDate;
                    }

                    emprunteurs.findOneAndUpdate({'user_id': basicEmprunteurProfil.user_id},
                    {
                         $set: basicEmprunteurProfil ,
                        $setOnInsert: { creationDate: createDateMongo() }
                    } , {
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

    updateFavoris(res, user_id, contractEmprunteurId, removed) {
        info('Entering updateFavoris() user: ' + user_id + ', and contract emprunteur id: ' + contractEmprunteurId + ' and removed: ' + removed);

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
                        debug('Favoris to remove: '+ contractEmprunteurId );
                        _.remove(basicProfil.favoris, f => {
                            return _.isEqual(f.contractEmprunteurId, contractEmprunteurId);
                        });
                    } else {
                        debug('Favoris to add: '+ contractEmprunteurId );

                        basicProfil.favoris.push({contractEmprunteurId: contractEmprunteurId});
                        basicProfil.favoris = _.sortedUniq(basicProfil.favoris);
                    }
                    // this._mongodb.collection('clients').insert( basicInfo, function(err, r) {
                    clients.findOneAndUpdate({'user_id': basicProfil.user_id},
                    {
                         $set: basicProfil ,
                        $setOnInsert: { creationDate: createDateMongo() }
                    }, {
                        returnOriginal: false
                      , upsert: true
                    }, (err, clientResult) => {
                        if(err) {
                            callback(err);
                        }
                        const basicProfil = new BasicInfo(clientResult.value);
                        debug('Result findOneAndUpdate client: ' +  basicProfil.toLog()  );

                        callback();
                        // res.end( JSON.stringify(basicProfil) );
                    });
                },
                (callback) => {
                    const contractDao = new ContractDao(this._mongodb);

                    contractDao.getContractEmprunteurById(contractEmprunteurId, (contract, err) => {
                        if (err) {
                            callback(err);
                            return;
                        }

                        debug("Contract emprunteur is: " + contract.toLog());

                        res.end( JSON.stringify(contract) );
                    });
                }
            ], (err) => {
                error("Unable to updateFavoris " , err);
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
     * getProfileFavoris - description
     *
     * @param  {type} res     description
     * @param  {array} favoris list of contract emprunteur id
     * @return {type}         description
     */
    getProfileFavoris(res, favoris) {
        try {
            info('Entering getProfileFavoris: ' + JSON.stringify(favoris));

            const contractDao = new ContractDao(this._mongodb);

            async.mapSeries(favoris, (favori, callback) => {
                debug('favoris contract id: '+ favori.contractEmprunteurId );
                contractDao.getContractEmprunteurById(favori.contractEmprunteurId, (contract, err) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    // because it's always true in the profile favoris
                    contract.emprunteur.isFavoris = true;

                    debug("Favoris Contract emprunteur is: " + contract.toLog());

                    callback(null, contract);
                });

            }, (err, result) => {
                if (err) {
                    error("ERROR Favoris Contract emprunteur is: " + err);
                }
                debug("RESULT Favoris Contract emprunteur is: " + result);

                res.end( JSON.stringify(result) );
            } );
        } catch (e) {
            error("unable to getProfileFavoris", e);
            res.status(500).send("Problème pendant la récupération des favoris. " + e.message);
        }
    }
}
