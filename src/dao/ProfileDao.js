import _ from 'lodash';
import { error, debug, info, getYear, addYear, getBelgiumDate} from '../common/UtilityLog';
import { BasicInfo } from '../model/BasicInfo';
import async from 'async';
import Validator from '../validator/validator';

export class ProfileDao {
    constructor() {

    }


    /**
     * getBasicInfo - Get Basic Info by User id
     *
     * @param  {type} res  description
     * @param  {type} user description
     * @return {type}      description
     */
    getBasicInfo(res, _mongodb, user, email) {
        info('Entering getBasicInfo() data: ' + JSON.stringify( user ));

         try {
             const userId = user;
             let basicProfil = null;

             const clients = _mongodb.collection('clients');

            async.series([
                (callback) => {
                    // Find some documents
                    clients.findOne({'user_id': userId}, function(err, client) {
                      debug("*****  Client found: " + JSON.stringify( client ));

                      if (!_.isNil(client)) {
                          basicProfil = new BasicInfo(client);
                      } else {
                          basicProfil = new BasicInfo(null, userId, '' , '', '01/09/1939',
                            null, email, '' ,'', '', '', false);
                      }

                      callback();
                    });
                },
                (callback) => {
                    debug("****  BasicProfil: " + JSON.stringify( basicProfil ) );

                    res.end( JSON.stringify( basicProfil ) );
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
            res.status(500).send('Problème pendant la récupération des infos. ' + e.message);
        }
    }


    /**
     * updateBasicInfo - Update basic info
     *
     * @param  {type} res       description
     * @param  {type} _mongodb  description
     * @param  {type} basicInfo description
     * @return {type}           description
     */
    updateBasicInfo(res, _mongodb, basicInfo) {
        info('Entering updateBasicInfo() basic info: ' + basicInfo.user_id);
        let clients;
         try {
             async.series([
                (callback) => {
                    // Validate basic Info
                    Validator.validateProfileTabBasic(basicInfo);

                    // Find some documents
                    clients = _mongodb.collection('clients');

                    // _mongodb.collection('clients').insert( basicInfo, function(err, r) {
                    clients.findOneAndUpdate({'user_id': basicInfo.user_id}, basicInfo, {
                        returnOriginal: false
                      , upsert: true
                  }, (err, r) => {
                        if(err) {
                            callback(err);
                        }
                        debug('Result findOneAndUpdate: ' + JSON.stringify(r.value));
                        res.end( "Les informations utilisateur ont été enregistrées" );
                    });
                    // clients.find({'user_id': basicInfo.user_id}).toArray(function(err, client) {
                    //   debug("client found: " + client);
                    //
                    //   clients = client;
                    //
                    //   callback();
                    // });
                }
            ], (err) => {
                error("Unable to updateBasicInfo " , err);
                //   When it's done
                if (err) {
                    res.status(500).json(err);
                    return;
                }
            });


            //  db.close();

        } catch( e ) {
            error('error: ' + e);
            res.status(500).send("Problème pendant l'enregistrement du profil. " + e.message);
        }
    }
}
