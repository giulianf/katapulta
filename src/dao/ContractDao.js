import _ from 'lodash';
import { error, debug, info } from '../common/UtilityLog';
import { createDateMongo , getProgress, getStepWorkflow } from '../common/Utility';
import { ContractsPreteur } from '../model/ContractsPreteur';
import { ContractsEmprunteur } from '../model/ContractsEmprunteur';
import { ProfileDao } from '../dao/ProfileDao';
import statusEmprunteur from '../data/statusEmprunteur';
import async from 'async';

export class ContractDao {
    constructor(_mongodb) {
        this._mongodb = _mongodb;
    }

    requestNewEmprunt(res, user) {
        info('Entering requestNewEmprunt() data: ' + user  );

         try {
             const userId = user;
             let contractsList = [];
             let basicInfoEmprunteur;

            async.series([
                (callback) => {
                    const profileDao = new ProfileDao(this._mongodb);

                    profileDao.getEmprunteurBasicInfoByUserId(userId, (emprunteur, err) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        basicInfoEmprunteur = emprunteur;

                        callback();
                    });
                    // TO DO
                    // profileDao.getEmprunteurBasicInfo(res, user);
                    // new ContractsEmprunteur(contract)
                },
                (callback) => {
                    const contractEmprunteurs = this._mongodb.collection('contractEmprunteurs');

                    const status = this.getStatus(1);
                    debug('Status contract: '+ status);
                    const emprunteur = new ContractsEmprunteur(null, userId, basicInfoEmprunteur.id , createDateMongo(), status, getProgress(status), getStepWorkflow(status));

                    contractEmprunteurs.insertOne( emprunteur, {
                        returnOriginal: false
                      , upsert: true
                    }, (err, emprunteurResult) => {
                        if(err) {
                            callback(err);
                        }

                        callback();
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

    getStatus(index) {
        const status =  _.find(statusEmprunteur, {"index": index});
        debug('Status label: ' + status.label);
        return status.label;
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
             let contractsList = [];

             this.getContractEmprunteurList(user, (contracts, err) => {
                 if (err) {
                     throw new Error(err.message);
                     return;
                 }

                 contractsList = contracts;
                 debug("****  contractEmprunteurs: " + JSON.stringify( contractsList ) );

                 res.end( JSON.stringify( contractsList ) );
             });
        } catch( e ) {
            error('error: ' + e);
            res.status(500).send('Problème pendant la récupération des contrats emprunteur. ' + e.message);
        }
    }

    getContractEmprunteurList(user, callbackFunction) {
        try {
            const userId = user;
            let contractsList = [];


           async.series([
               (callback) => {
                   const contractEmprunteurs = this._mongodb.collection('contractEmprunteurs');

                   // Find some documents
                   contractEmprunteurs.find({'user_id': userId}).toArray( function(err, contracts) {
                       if (err) {
                           callback(err);
                           return;
                       }

                       const contractSize = _.size( contracts );
                       debug("*****  contract found: " + contractSize );

                       for(let i = 0 ; i < contractSize ; i++) {
                           const contract = contracts[i];

                           contractsList.push( new ContractsEmprunteur(contract) );
                       }

                       callback();
                   });
               },
               (callback) => {
                   debug("****  getContractEmprunteurList: " + JSON.stringify( contractsList ) );

                   callbackFunction( contractsList );
               }
           ], (err) => {
               error("Unable to getContractEmprunteurList " , err);
               //   When it's done
               if (err) {
                   error('error: ' + err);
                   callbackFunction(null, err);
                   return;
               }
           });
       } catch( e ) {
           error('error: ' + e);
           callbackFunction(null, e);
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
