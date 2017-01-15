import _ from 'lodash';
import { error, debug, info } from '../common/UtilityLog';
import { getCurrentDate, getBelgiumDate, getYear, addYear} from '../common/Utility';
import { BasicInfoEmprunteur } from '../model/BasicInfoEmprunteur';
import { ProfileDao } from './ProfileDao';
import async from 'async';
import ValidatorBasic from '../validator/validatorBasicInfo';
import ValidatorEmprunteur from '../validator/validatorEmprunteurBasic';

export class ExplorerDao {
    constructor() {

    }


    /**
     * getExplorers - get all contract for emprunteur
     *
     * @param  {type} res      description
     * @param  {type} _mongodb description
     * @param  {String} user description
     * @return {type}          description
     */
    getExplorers(res, _mongodb, user) {
        info('Entering getContractPreteur() data: ' );

         try {
             let contractsPreteur = [];
             const userId = user;
             let basicProfil = null;

            async.series([
                (callback) => {
                    const profileDao = new ProfileDao();

                    profileDao.getClientByUserId(_mongodb, userId, null, (profile, err) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        basicProfil = profile;

                        callback();
                    });
                },
                (callback) => {
                    const emprunteurs = _mongodb.collection('emprunteurs');

                    // Find some documents
                    emprunteurs.find().toArray(function(err, contracts) {

                        const contractSize = _.size( contracts );
                        debug("*****  contract found: " + contractSize);
                        // const favorisEmprunteur = [new ThumbEmprunteur(1, 'kata entreprise', 1600000, 'Boulanger', 'Meilleur artisan de la région', null, moment(), 'BON', true, 'Bruxelles'),
                        // new ThumbEmprunteur(2, 'BEST entreprise', 110000, 'Numerisation informative', "Les Kaddors de l'IT", null, moment(), 'EXCELLENT', true, 'Charleroi')];

                        for(let i = 0 ; i < contractSize ; i++) {
                            const contract = new BasicInfoEmprunteur(contracts[i]);
                            debug("****  contract wihout images: " + contract.toLog() );

                            // remove images and logo from JSON (performane)
                            delete contract.image;

                            contractsPreteur.push( contract );
                        }

                        for(let j = 0 ; j < _.size(basicProfil.favoris) ; j++) {
                            const favori = basicProfil.favoris[j];
                            const emprunteurId = (favori.emprunteurId).toString();
                            debug("favori id: " + emprunteurId);

                            const contrats = _.find(contractsPreteur, c => {
                                const id = (c.id).toString();
                                return _.isEqual( id, emprunteurId);
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

                        callback();
                    });
                },
                (callback) => {
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

    /**
     * getExplorerByEmprunteurId - description
     *
     * @param  {type} res      description
     * @param  {type} MongoDb  description
     * @param  {type} _mongodb description
     * @param  {type} user     description
     * @return {type}          description
     */
    getExplorerByEmprunteurId(res, MongoDb, _mongodb, userId, emprunteurId) {
        info('Entering getExplorerByEmprunteurId() user id: ' + userId + ' and emprunteur Id: ' + emprunteurId);

         try {
             let contractEmprunteur = null;
             let basicProfil = null;

            async.series([
                (callback) => {
                    const profileDao = new ProfileDao();

                    profileDao.getClientByUserId(_mongodb, userId, null, (profile, err) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        basicProfil = profile;

                        callback();
                    });
                },
                (callback) => {
                    const emprunteurs = _mongodb.collection('emprunteurs');

                    // Find some documents
                    emprunteurs.findOne({'_id': new MongoDb.ObjectId(emprunteurId)}, (err, emprunteur) => {
                        contractEmprunteur = new BasicInfoEmprunteur( emprunteur );

                        debug("*****  emprunteur found: " + contractEmprunteur.toLog());

                        for(let j = 0 ; j < _.size(basicProfil.favoris) ; j++) {
                            const favori = basicProfil.favoris[j];
                            const emprunteurId = (favori.emprunteurId).toString();
                            debug("favori id: " + emprunteurId);

                            if (_.isEqual(emprunteurId, contractEmprunteur.id.toString())) {
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
                error("Unable to getExplorerByEmprunteurId " , err);
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
