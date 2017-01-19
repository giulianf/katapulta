import _ from 'lodash';
import { error, debug, info } from '../common/UtilityLog';
import { createDateMongo, getBelgiumDate, getYear, getBelgiumDateDetails, addDays, getCurrentMomentDate, getDateISO } from '../common/Utility';
import { ContractsPreteur } from '../model/ContractsPreteur';
import { ContractsEmprunteur } from '../model/ContractsEmprunteur';
import async from 'async';
let soap = require('soap');

export class ProfileDao {
    constructor(_mongodb) {
        this._mongodb = _mongodb;
    }

    requestNewEmprunt(res, user) {
        info('Entering requestNewEmprunt() data: ' + user  );

         try {
             const userId = user;
             let contractsList = [];
             let basicInfoEmprunteur;
             const contractEmprunteurs = this._mongodb.collection('contractEmprunteurs');

            async.series([
                (callback) => {
                    const profileDao = new ProfileDao(this._mongodb);
                    // TO DO
                    // profileDao.getEmprunteurBasicInfo(res, user);
                    // new ContractsEmprunteur(contract)
                },
                (callback) => {
                    contractEmprunteurs.findOneAndUpdate({'user_id': basicProfil.user_id}, basicInfoEmprunteur, {
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
                },
                (callback) => {
                    this.getContractEmprunteurList(user, (contracts, err) => {
                        if (err) {
                            throw new Error(err);
                            return;
                        }
                        debug("****  askNewEmprunt: " + JSON.stringify( contractsList ) );

                        res.end( JSON.stringify( contractsList ) );
                    });
                }
            ], (err) => {
                error("Unable to getContractEmprunteur " , err);
                //   When it's done
                if (err) {
                    res.status(500).json(err);
                    return;
                }
            });
        } catch( e ) {
            error('error: ' + e);
            res.status(500).send('Problème pendant la récupération des contrats. ' + e.message);
        }
    }

    /**
     * getContractEmprunteur - contract emprunteur within contract tab
     *
     * @param  {type} res      description
     * @param  {type} user     description
     * @return {type}          description
     */
    getContractEmprunteur(res, user) {
        info('Entering getContractEmprunteur() data: ' + user  );

         try {
             this.getContractEmprunteurList(user, (contracts, err) => {
                 if (err) {
                     throw new Error(err);
                     return;
                 }
                 debug("****  contractEmprunteurs: " + JSON.stringify( contractsList ) );

                 res.end( JSON.stringify( contractsList ) );
             });
        } catch( e ) {
            error('error: ' + e);
            res.status(500).send('Problème pendant la récupération des contrats emprunteur. ' + e.message);
        }
    }

    getContractEmprunteurList(user, callback) {
        try {
            const userId = user;
            let contractsList = [];

            const contractEmprunteurs = this._mongodb.collection('contractEmprunteurs');

           async.series([
               (callback) => {
                   // Find some documents
                   contractEmprunteurs.find({'user_id': userId}, function(err, contracts) {
                       const contractSize = _.size( contracts );
                       debug("*****  contract found: " + contractSize);

                       for(let i = 0 ; i < contractSize ; i++) {
                           const contract = contracts[i];

                           contractsList.push( new ContractsEmprunteur(contract) );
                       }

                       callback();
                   });
               },
               (callback) => {
                   debug("****  contractEmprunteurs: " + JSON.stringify( contractsList ) );

                   callback( contractsList );
               }
           ], (err) => {
               error("Unable to getContractEmprunteurList " , err);
               //   When it's done
               if (err) {
                   error('error: ' + e);
                   callback(null, e);
                   return;
               }
           });
       } catch( e ) {
           error('error: ' + e);
           callback(null, e);
       }
    }

    /**
     * getContractPreteur - contract preteur within contract tab
     *
     * @param  {type} res      description
     * @param  {type} user     description
     * @return {type}          description
     */
    getContractPreteur(res, user) {
        info('Entering getContractPreteur() data: ' + user  );

         try {
             const userId = user;
             let contractsPreteur = [];

             const emprunteurs = this._mongodb.collection('emprunteurs');

            async.series([
                (callback) => {
                    // Find some documents
                    emprunteurs.find({'user_id': userId}, function(err, contracts) {
                        const contractSize = _.size( contracts );
                        debug("*****  contract found: " + contractSize);

                        for(let i = 0 ; i < contractSize ; i++) {
                            const contract = contracts[i];

                            contractsPreteur.push( new ContractsPreteur(contract) );
                        }

                        callback();
                    });
                },
                (callback) => {
                    debug("****  contractsPreteur: " + JSON.stringify( contractsPreteur ) );

                    res.end( JSON.stringify( contractsPreteur ) );
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
}
