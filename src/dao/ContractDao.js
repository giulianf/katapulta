import _ from 'lodash';
import { error, debug, info } from '../common/UtilityLog';
import { createDateMongo , getProgress, getStepWorkflow, getStatusDetail } from '../common/Utility';
import { ContractsPreteur } from '../model/ContractsPreteur';
import { ContractsEmprunteur } from '../model/ContractsEmprunteur';
import { BasicInfoEmprunteur } from '../model/BasicInfoEmprunteur';
import { ContractGenerator } from '../common/ContractGenerator';
import { ProfileDao } from '../dao/ProfileDao';
import async from 'async';
import statusEmprunteur from '../data/statusEmprunteur';
import statusPreteur from '../data/statusPreteur';
const ObjectId = require('mongodb').ObjectId;
import ValidatorBasic from '../validator/validatorBasicInfo';

export class ContractDao {
    constructor(_mongodb) {
        this._mongodb = _mongodb;
    }

    updateChangeStatus(res, selectedContracts, status, notifyUser, isEmprunteur) {
        info('Entering updateChangeStatus() isEmprunteur: ' + isEmprunteur + ', status: '+status + ' and notifyUser: '+notifyUser);

        const contractEmprunteurs = this._mongodb.collection('contractEmprunteurs');
        const userToMailList = [];
        async.series([
            (callback) => {
                async.eachSeries(selectedContracts, (contract, callback) => {
                    debug('contract id: '+ contract.contractId);
                    contractEmprunteurs.updateOne(
                    { _id : new ObjectId(contract.contractId) },
                    {
                        $set: { "status": status },
                        $currentDate: { "lastModified": true }
                    }, (err, results) => {
                        callback();

                        userToMailList.push(contract.user_id);
                    });

                }, callback );
            },
            (callback) => {
                try {
                    const mail = new MailDao(_mongodb, clientSES);

                    _.forEach(selectedContracts, contract => {
                        mail.insertNewEvent( contract.contractId, status, notifyUser);
                    });
                    callback();
                } catch (e) {
                    callback(e);
                    return;
                }
            },
            (callback) => {
                this.getAdminContracts(res);
            }

        ], (err) => {
            error("Unable to updateChangeStatus " , err);
            //   When it's done
            if (err) {
                res.status(500).json(err);
                return;
            }
        });
    }

    updateBlockStatus(res, selectedContracts, isEmprunteur) {
        info('Entering updateBlockStatus() isEmprunteur: ' + isEmprunteur);


    }

    updateRappelStatus(res, selectedContracts, isEmprunteur) {
        info('Entering updateRappelStatus() isEmprunteur: ' + isEmprunteur);


    }

    /**
     * requestNewEmprunt - request a new contract for emprunt
     *
     * @param  {type} res  description
     * @param  {type} user desciption
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
                    const emprunteur = new ContractsEmprunteur( null, userId, basicInfoEmprunteur );

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
                    debug("get contract emprunt list")
                    this.getContractEmprunteurList(user, (contracts, err) => {
                        if (err) {
                            throw new Error(err);
                            return;
                        }

                        contractsList = contracts;

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

    requestNewPreteur(res, user, emprunteurContractId, valuePret) {
        info('Entering requestNewPreteur() data: ' + user + ' and contract emprunteur Id: ' + emprunteurContractId );

         try {
             const userId = user;
             let contractsList = [];
             let basicInfo;
             let emprunteurContract;

             // before check if basic informations are filled in
            async.series([
                (callback) => {
                    const profileDao = new ProfileDao(this._mongodb);

                    profileDao.getClientByUserId(userId, null, (basicInfo, err) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        ValidatorBasic.validateProfileTabBasic(basicInfo);

                        callback();
                    });
                },
                (callback) => {
                    this.getContractEmprunteurById(emprunteurContractId, (contract, err) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        emprunteurContract = contract;

                        callback();
                    });
                },
                (callback) => {
                    const contractPreteur = this._mongodb.collection('contractPreteur');

                    const preteur = new ContractsPreteur(null, userId, emprunteurContract.id, valuePret);

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
                //  debug("****  contractEmprunteurs: " + JSON.stringify( contractsList ) );

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
                   contractEmprunteurs.find({'user_id': userId}).sort( { _id: -1 } ).toArray( function(err, contracts) {
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

    getContractEmprunteurById(emprunteurContractId, callbackFunction) {
        try {
            const contractEmprunteurs = this._mongodb.collection('contractEmprunteurs');

            // Find some documents
            contractEmprunteurs.findOne({'_id': new ObjectId(emprunteurContractId)}, (err, contract) => {
                if (err) {
                    callback(err);
                    return;
                }

               callbackFunction( new ContractsEmprunteur(contract) );
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


    /**
     * getContractPreteurById - get contract preteur
     *
     * @param  {type} contractId       description
     * @param  {type} callbackFunction description
     * @return {type}                  description
     */
    getContractPreteurById(contractId, callbackFunction) {
        try {
            info('Entering getContractPreteurById() contract Id: ' + contractId  );

            const preteurs = this._mongodb.collection('contractPreteur');

            // Find some documents
            preteurs.findOne({'_id': new ObjectId(contractId) }, function(err, contract) {
                 if (err) {
                     callback(err);
                     return;
                 }
                 const co = new ContractsPreteur(contract);
                 debug("Contract preteur found: "+ co.toLog());

                 callbackFunction( co ) ;

            });
       } catch( e ) {
           error('error: ' + e);
           callbackFunction(null, 'Erreur pendant la recuperation du contrat');
       }
    }

    getAdminContracts(res) {
        try {
            let contractsEmprunteur = [];
            let contractsPreteur = [];


           async.series([
               (callback) => {
                   const contractEmprunteursdb = this._mongodb.collection('contractEmprunteurs');

                   // Find some documents
                   contractEmprunteursdb.find().toArray( function(err, contracts) {
                       if (err) {
                           callback(err);
                           return;
                       }

                       const contractSize = _.size( contracts );
                       debug("*****  contract found: " + contractSize );

                       for(let i = 0 ; i < contractSize ; i++) {
                           const contract = new ContractsEmprunteur( contracts[i] );

                           debug("****  contracts Emprunteur: " + contract.toLog() );

                           contractsEmprunteur.push( contract );
                       }

                       callback();
                   });
               },
               (callback) => {
                   const preteurs = this._mongodb.collection('contractPreteur');

                   // Find some documents
                   preteurs.find().toArray( function(err, contracts) {
                        if (err) {
                            callback(err);
                            return;
                        }

                        const contractSize = _.size( contracts );
                        debug("*****  contract found: " + contractSize);

                       for(let i = 0 ; i < contractSize ; i++) {
                           const contract = new ContractsPreteur( contracts[i] ) ;

                           debug("****  contracts Preteur: " + contract.toLog() );

                           contractsPreteur.push( contract );
                       }

                       callback();
                   });
               },
               (callback) => {
                   const adminContract = { adminEmprunteur : {contracts: contractsEmprunteur}, adminPreteur: {contracts: contractsPreteur} };

                   res.end(  JSON.stringify( adminContract ) );
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

    generateContract(res, contractId) {
        try {
            info('Entering generateContract contract id: ' + contractId);
            let contractPreteur;
            let basicProfil;
            let basicInfoEmprunteur;

            const profileDao = new ProfileDao(this._mongodb);

            // Find contract preteur
            // Find preteur info
            // find emprunteur info
            async.series([
                (callback) => {
                    this.getContractPreteurById(contractId, (contract, err) => {
                        if(err) {
                            callback(err);
                            return;
                        }

                        contractPreteur = contract;
                        callback();
                    })
                },
                (callback) => {
                    async.parallel([
                        (callback) => {
                            profileDao.getClientByUserId(contractPreteur.user_id, null,  (profile, err) => {
                                if (err) {
                                    callback(err);
                                    return;
                                }
                                basicProfil = profile;
                                callback();
                            });
                        },
                        (callback) =>{
                            this.getContractEmprunteurById(contractPreteur.contractEmprunteurId, (contract, err) => {
                                if (err) {
                                    callback(err);
                                    return;
                                }
                                basicInfoEmprunteur = new BasicInfoEmprunteur(contract.emprunteur);

                                debug("emprunteur from contract emprunteur is: " + basicInfoEmprunteur.toLog());

                                callback();
                            });
                        }
                    ],callback);
                },
                (callback) => {
                    const contractGenerated = new ContractGenerator();
                    contractGenerated.generateContract(res, contractPreteur, basicProfil, basicInfoEmprunteur);
                }
            ], (err) => {
                error("Unable to generateContract " , err);
                //   When it's done
                if (err) {
                    error('error: ' + err);
                    res.status(500).send('Problème pendant la génération du contrat. ' + err.message);
                    return;
                }
            });
        } catch (e) {
             error('error: ' + e);
             res.status(500).send('Problème pendant la génération du contrat. ' + e.message);
        }
    }
}
