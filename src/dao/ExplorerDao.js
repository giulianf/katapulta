import _ from 'lodash';
import { error, debug, info } from '../common/UtilityLog';
import { getCurrentDate, getBelgiumDate, getYear, addYear} from '../common/Utility';
import { BasicInfoEmprunteur } from '../model/BasicInfoEmprunteur';
import { ProfileDao } from './ProfileDao';
import { ContractDao } from './ContractDao';
import async from 'async';
import ValidatorBasic from '../validator/validatorBasicInfo';
import ValidatorEmprunteur from '../validator/validatorEmprunteurBasic';
import { ContractsEmprunteur } from '../model/ContractsEmprunteur';
const ObjectId = require('mongodb').ObjectId;

export class ExplorerDao {
    constructor(_mongodb) {
        this._mongodb = _mongodb;
    }

    /**
     * getExplorers - get all contract for emprunteur
     *
     * @param  {type} res      description
     * @param  {type} user     description
     * @param  {type} pageKey    starting from 20 "limit"
     * @return {type}          description
     */
    getExplorers(res, user, pageKey) {
        info('Entering getExplorers() data: ' );

         try {
             const EXPLORERS_PAGE = 8;
             let contractEmprunteurList = [];
             const userId = user;
             let basicProfil = null;
             let contractsList = [];

            async.series([
                (callback) => {
                    if (userId) {
                        const profileDao = new ProfileDao(this._mongodb);

                        profileDao.getClientByUserId( userId, null, (profile, err) => {
                            if (err) {
                                callback(err);
                                return;
                            }
                            basicProfil = profile;

                            callback();
                        });
                    } else {
                        callback();
                    }

                },
                (callback) => {
                    const contractEmprunteurs = this._mongodb.collection('contractEmprunteurs');

                    // Find some documents
                    contractEmprunteurs.find( { status: { $eq: 'MISE_EN_LIGNE' } } ,  { emprunteur: 1, creationDate:1 } ).toArray( (err, contracts) => {
                        if (err) {
                            callback(err);
                            return;
                        }

                        const contractSize = _.size( contracts );
                        debug("*****  contract Size: " + contractSize );

                        for(let i = 0 ; i < contractSize ; i++) {
                            const contract = new ContractsEmprunteur(contracts[i]) ;
                            debug("*****  contract found: " + contract.toLog() );

                            contractEmprunteurList.push( contract );
                        }

                        callback();
                    });
                },
                (callback) => {
                    const emprunteurs = this._mongodb.collection('emprunteurs');
                    // retrieves 8 elements starting from "limit"
                    const skip = (pageKey - 1) * EXPLORERS_PAGE;
                    const limit = (pageKey) * EXPLORERS_PAGE;
                    debug('limit: ' + limit);

                    _.forEach(contractEmprunteurList, contractEmprunteur => {
                        const emprunteur = contractEmprunteur.emprunteur;
                        info('contract user id: ' + contractEmprunteur.user_id);

                       // Find some documents
                           delete emprunteur.image;

                           if (userId) {

                               for(let j = 0 ; j < _.size(basicProfil.favoris) ; j++) {
                                   const favori = basicProfil.favoris[j];
                                   const contractEmprunteurId = (favori.contractEmprunteurId).toString();
                                   debug("favori id: " + contractEmprunteurId);

                                   const contrats = _.find(contractsList, c => {
                                       const id = (c.id).toString();
                                       return _.isEqual( id, contractEmprunteurId);
                                   });
                                   debug("contract size with favoris: " + contrats);

                                   if (!_.isNil(contrats) && _.isArray(contrats)) {
                                       _.forEach(contrats, con => {
                                           con.isFavoris = true;
                                       })
                                   } else if (!_.isNil(contrats)) {
                                       contrats.isFavoris = true;
                                   }
                               }
                           }
                    //    });
                //    }, callback);
                    });

                    callback();

                },
                (callback) => {
                    res.end( JSON.stringify( contractEmprunteurList ) );
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
     * getExplorerBycontractEmprunteurId - description
     *
     * @param  {type} res      description
     * @param  {type} user     description
     * @return {type}          description
     */
    getExplorerBycontractEmprunteurId(res, userId, contractEmprunteurId) {
        info('Entering getExplorerBycontractEmprunteurId() user id: ' + userId + ' and contract emprunteur Id: ' + contractEmprunteurId);

         try {
             let contractEmprunteur = null;
             let basicProfil = null;

            async.series([
                (callback) => {
                    const profileDao = new ProfileDao(this._mongodb);

                    profileDao.getClientByUserId( userId, null, (profile, err) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        basicProfil = profile;

                        callback();
                    });
                },
                (callback) => {
                    const contractDao = new ContractDao(this._mongodb);

                    contractDao.getContractEmprunteurById(contractEmprunteurId, (contract, err) => {
                        if (err) {
                            callback(err);
                            return;
                        }

                        contractEmprunteur = contract;

                        debug("***** contract emprunteur found: " + contractEmprunteur.toLog());

                        for(let j = 0 ; j < _.size(basicProfil.favoris) ; j++) {
                            const favori = basicProfil.favoris[j];
                            const contractEmprunteurId = (favori.contractEmprunteurId).toString();
                            debug("favori id: " + contractEmprunteurId);

                            if (_.isEqual(contractEmprunteurId, contractEmprunteur.id.toString())) {
                                emprunteur.isFavoris = true;
                            }
                        }
                        callback();
                    });
                },
                (callback) => {
                    res.end( JSON.stringify( contractEmprunteur ) );
                }
            ], (err) => {
                error("Unable to getExplorerBycontractEmprunteurId " , err);
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
