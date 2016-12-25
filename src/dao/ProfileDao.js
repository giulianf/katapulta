import _ from 'lodash';
import { error, debug, info, getYear, addYear, getBelgiumDate} from '../common/UtilityLog';
import { BasicInfo } from '../model/BasicInfo';
const MongoClient = require('mongodb').MongoClient;
import async from 'async';

// Connection URL
const url = 'mongodb://localhost:27017/ktp';

export class ProfileDao {
    constructor() {
        // Use connect method to connect to the server
        MongoClient.connect(url, function(err, db) {
          debug("Connected successfully to server");
          this._mongodb =  db;
        });
    }


    /**
     * getBasicInfo - Get Basic Info by User id
     *
     * @param  {type} res  description
     * @param  {type} user description
     * @return {type}      description
     */
    getBasicInfo(res, user) {
        info('Entering getBasicInfo() data: ' + JSON.stringify( user ));

         try {
             const userId = user.username;
             let basicProfil = null;

             const clients = this._mongodb.collection('client');

             // Find some documents
             clients.find({'user_id': userId}).toArray(function(err, client) {
               debug("client found: " + client);

               if (!_.isNil(client)) {
                   basicProfil = new BasicInfo(client);
               } else {
                   basicProfil = new BasicInfo(null, userId, , '', '',
                     null, user.email, '' ,'', '', '', false);
               }

               callback(client);
             });
             db.close();

            //  const basicProfil = new BasicInfo(userId, , 'Butacide', '24/03/1985',
            //   85032414555, 'nicolas.butacide@katapulta.be', 'BE0837.444.333' ,'Rue de Tamine 2', '5060', 'Tamines', true);

            res.end( JSON.stringify( basicProfil ) );
        } catch( e ) {
            error('error: ' + e);
            res.status(500).send('Problème pendant la simulation.');
        }
    }

    updateBasicInfo(res, basicInfo) {
        info('Entering updateBasicInfo() data: ' + JSON.stringify( basicInfo ));
        let clients;
         try {
             async.series([
                (callback) => {
                    // Find some documents
                    clients.find({'user_id': basicInfo.user_id}).toArray(function(err, client) {
                      debug("client found: " + client);

                      clients = client;

                      callback();
                    });
                }, (callback) => {
                    // insert new one
                    if (_.isNil(clients)) {
                        // Insert a single document
                         this._mongodb.collection('inserts').insertOne({a:1}, function(err, r) {
                           assert.equal(null, err);
                           assert.equal(1, r.insertedCount);

                           // Insert multiple documents
                           db.collection('inserts').insertMany([{a:2}, {a:3}], function(err, r) {
                             assert.equal(null, err);
                             assert.equal(2, r.insertedCount);

                             db.close();
                           });
                         });
                        // basicProfil = new BasicInfo(client);
                    } else {

                    }
                }
            ], (err) => {
                error("Unable to updateBasicInfo " , err);
                //   When it's done
                if (err) {
                    res.status(500).json(err);
                    return;
                }
            });


             db.close();

            res.end( JSON.stringify( this.getSimulatorResultInfo(simulateData) ) );
        } catch( e ) {
            error('error: ' + e);
            res.status(500).send('Problème pendant la simulation.');
        }
    }
}
