import _ from 'lodash';
import { error, debug, info } from '../common/UtilityLog';
import { createDateMongo , getProgress, getStepWorkflow, getStatusDetail } from '../common/Utility';
import { ContractsPreteur } from '../model/ContractsPreteur';
import { ContractsEmprunteur } from '../model/ContractsEmprunteur';
import { ProfileDao } from '../dao/ProfileDao';
import async from 'async';
import statusEmprunteur from '../data/statusEmprunteur';
import statusPreteur from '../data/statusPreteur';

export class ContractDao {
    constructor(_mongodb) {
        this._mongodb = _mongodb;
    }


    /**
     * requestNewEmprunt - request a new contract for emprunt
     *
     * @param  {type} res  description
     * @param  {type} user description
     * @return {type}      description
     */
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
                },
                (callback) => {
                    const contractEmprunteurs = this._mongodb.collection('contractEmprunteurs');

                    const statusList = getStatusDetail(statusEmprunteur);
                    const status = this.getStatus(statusEmprunteur, 1);
                    debug('Status contract: '+ status);
                    const progress =  getProgress(statusList, status);
                    debug('Progress: ' + progress);
                    const emprunteur = new ContractsEmprunteur(null, userId, basicInfoEmprunteur.id , createDateMongo(), status, progress, getStepWorkflow(statusList, status));

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

                        contractsList = contracts;

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

    requestNewPreteur(res, user) {
        info('Entering requestNewPreteur() data: ' + user  );

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
                },
                (callback) => {
                    const contractPreteur = this._mongodb.collection('contractPreteur');

                    const statusList = getStatusDetail(statusPreteur);
                    const status = this.getStatus(statusList, 1);
                    debug('Status contract: '+ status);
                    debug('Status contracts size: '+  _.size(statusList));
                    debug('Status contract findIndex: '+  _.findIndex(statusList ,{"label": status}) );
                    const progress =  getProgress(statusList, status);
                    debug('Progress: ' + progress);
                    const step =  getStepWorkflow(statusList, status);
                    debug('step: ' + step);


                    const preteur = new ContractsPreteur(null, userId, null, basicInfoEmprunteur.id , createDateMongo(), status, progress, step);

                    contractPreteur.insertOne( preteur, {
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
                    this.getContractPreteurList(user, (contracts, err) => {
                        if (err) {
                            throw new Error(err);
                            return;
                        }

                        contractsList = contracts;

                        debug("****  askNewPreteur: " + JSON.stringify( contractsList ) );

                        res.end( JSON.stringify( contractsList ) );
                    });
                }
            ], (err) => {
                error("Unable to getContractPreteur " , err);
                //   When it's done
                if (err) {
                    res.status(500).json(err);
                    return;
                }
            });
        } catch( e ) {
            error('error: ' + e);
            res.status(500).send('Problème pendant la récupération des contrats preteur. ' + e.message);
        }
    }

    getStatus(statusList ,index) {
        const status =  _.find(statusList, {"index": index});
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
             let contractsList = [];

             this.getContractPreteurList(user, (contracts, err) => {
                 if (err) {
                     throw new Error(err.message);
                     return;
                 }

                 contractsList = contracts;
                 debug("****  contractPreteur: " + JSON.stringify( contractsList ) );

                 res.end( JSON.stringify( contractsList ) );
             });
        } catch( e ) {
            error('error: ' + e);
            res.status(500).send('Problème pendant la récupération des infos. ' + e.message);
        }
    }

    getContractPreteurList(user, callbackFunction) {
        try {
            const userId = user;
            let contractsPreteur = [];


           async.series([
               (callback) => {
                   const preteurs = this._mongodb.collection('contractPreteur');

                   // Find some documents
                   preteurs.find({'user_id': userId}).toArray( function(err, contracts) {
                        if (err) {
                            callback(err);
                            return;
                        }

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
                   debug("****  getContractPreteurList: " + JSON.stringify( contractsPreteur ) );

                   callbackFunction( contractsPreteur );
               }
           ], (err) => {
               error("Unable to getContractPreteurList " , err);
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
}
