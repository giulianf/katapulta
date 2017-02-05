import _ from 'lodash';
import { error, debug, info } from '../common/UtilityLog';
import { createDateMongo } from '../common/Utility';
import async from 'async';
import { Mailing } from '../common/Mailing';
import { Event } from '../model/Event';

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
    insertNewEvent(res, user) {
        info('Entering insertNewEvent() data: ' + user  );

         try {

             // insert a new event
             // send an email
            async.series([
                (callback) => {
                    const event = this._mongodb.collection('event');

                    const eventObject = new Event(user, 'OK', createDateMongo());

                    event.insertOne( eventObject, {
                        returnOriginal: false
                      , upsert: true
                    }, (err, result) => {
                        if(err) {
                            callback(err);
                        }

                        callback();
                    });
                },
                (callback) => {
                    debug('sending mail');

                    const mail = new Mailing(this._client);

                    mail.sendMail();

                    callback();
                },
                (callback) => {
                    res.end("GOOD");
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
            res.status(500).send("Problème pendant l'envoi du mail. " + e.message);
        }
    }

}
