import _ from 'lodash';
import { error, debug, info } from '../common/UtilityLog';
import { createDateMongo } from '../common/Utility';
import async from 'async';
import { Mailing } from '../common/Mailing';
import { Event } from '../model/Event';
import { ProfileDao } from './ProfileDao';
import {MailManager} from '../common/MailManager';

export class MailDao {
    constructor(_mongodb, client) {
        this._mongodb = _mongodb;
        this._client= client;
    }


    /**
     * insertNewEvent - request a new contract for emprunt
     *
     * @param  {type} res  description
     * @param  {type} user description
     * @return {type}      description
     */
    insertNewEvent(res, user, eventStatusMail, notifyUser) {
        info('Entering insertNewEvent() data: ' + user  );

         try {
             let basicProfil = null;
             let basicInfoEmprunteur = null;

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
                    this.eventRegister(user, basicProfil.email, 'OK', null, err => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        callback();
                    });
                },
                (callback) => {
                    if (notifyUser) {
                        debug('sending mail');

                        // check within factory which mail to sending
                        const mailManager = new MailManager(this._client, basicProfil, basicInfoEmprunteur);

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
                },
                (callback) => {
                    res.end("GOOD");
                }
            ], (err) => {
                error("Unable to insertNewEvent " , err);
                //   When it's done
                if (err) {
                    this.eventRegister(user, basicProfil.email, 'FAILURE', err, err => {
                        res.status(500).send("Problème pendant l'envoi du mail. ");
                        return;
                    });
                }
            });
        } catch( e ) {
            error('error: ' + e);
            res.status(500).send("Problème pendant l'envoi du mail. " + e.message);
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
                    callback(err);
                }

                callback();
            });
        } catch (e) {
            callback(e);
        }
    }


}
