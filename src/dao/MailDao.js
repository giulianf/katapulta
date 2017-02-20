import _ from 'lodash';
import { error, debug, info,warn } from '../common/UtilityLog';
import { createDateMongo } from '../common/Utility';
import async from 'async';
import { Mailing } from '../common/Mailing';
import { Event } from '../model/Event';
import { ProfileDao } from './ProfileDao';
import { ContractDao } from './ContractDao';
import {MailManager} from '../common/MailManager';

export class MailDao {
    constructor(_mongodb, client) {
        this._mongodb = _mongodb;
        this._client= client;
    }


    insertNewEvent(user, eventStatusMail, notifyUser) {
        info('Entering insertNewEvent() data: ' + user  );

         try {
             let basicProfil = null;
             let basicInfoEmprunteur = null;
             let contractPreteur = null;

             // insert a new event
             // send an email
            async.series([
                (callback) => {
                    const profileDao = new ProfileDao(this._mongodb);

                    profileDao.getClientByUserId( user, null, (profile, err) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        basicProfil = profile;

                        callback();
                    });
                },
                (callback) => {
                    const profileDao = new ProfileDao(this._mongodb);

                    profileDao.getEmprunteurBasicInfoByUserId(user, (emprunteur, err) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        basicInfoEmprunteur = emprunteur;

                        callback();
                    });
                },
                (callback) => {
                    const contractDao = new ContractDao(this._mongodb);

                    contractDao.getContractPreteurById(contractId, (contract, err) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        contractPreteur = contract;

                        callback();
                    });
                },
                (callback) => {
                    if (_.isNil(basicProfil) || (!_.isNil(basicProfil)  && _.isNil(basicProfil.email) )) {
                        callback("Les informations de base ou l'adresse email n'existe pas.");
                        return;
                    }
                    if (_.isNil(contractPreteur) || (!_.isNil(contractPreteur)  && _.isNil(contractPreteur.id) )) {
                        callback("Les informations du contrat n'existe pas.");
                        return;
                    }
                    if (_.isNil(contractPreteur.contractEmprunteur) || (!_.isNil(contractPreteur.contractEmprunteur)  && _.isNil(contractPreteur.contractEmprunteur.id) )) {
                        callback("Les informations de l'emprunteur n'existe pas.");
                        return;
                    }
                    this.eventRegister(user, basicProfil.email, 'OK', null, err => {
                        if (err) {
                            warn('Error during the OK event register' , err);
                            // no return to continue process
                        }
                        callback();
                    });
                },
                (callback) => {
                    if (notifyUser) {
                        debug('sending mail');

                        // check within factory which mail to sending
                        const mailManager = new MailManager(this._client, basicProfil, contractPreteur.contractEmprunteur, contractPreteur);

                        mailManager.getMail(eventStatusMail, err =>{
                            if (err) {
                                callback(err);
                                return;
                            }
                            callback();
                        });
                    } else {
                        callback();
                    }
                }
            ], (err) => {
                //   When it's done
                if (err) {
                    error("Unable to insertNewEvent see the log or event document: " , err);

                    this.eventRegister(user, basicProfil.email, 'FAILURE', err, error => {
                        if (error) {
                            error(error.message);
                        }
                    });
                    throw new Error(err.message + ". Merci de prendre contact avec notre support support@katapulta.be. ");
                }
            });
        } catch( e ) {
            error('error: ' + e);
            throw new Error("Problème pendant l'envoi du mail. Merci de prendre contact avec notre support support@katapulta.be. ");
        }
    }

    eventRegister(user, email, status, err, callback) {
        try {
            const event = this._mongodb.collection('event');

            const eventObject = new Event(user, email, status, err, createDateMongo());

            event.insertOne( eventObject, {
                returnOriginal: false
              , upsert: true
            }, (err, result) => {
                if(err) {
                    error('Error during event register: ', err);
                    callback('Error during event register: ' + err);
                }

                callback();
            });
        } catch (e) {
            error('Unable to register event register: ', e);
            callback('Unable to register event register: ' + e);
        }
    }


}
