import _ from 'lodash';
import { error, debug, info } from '../common/UtilityLog';
import { createDateMongo } from '../common/Utility';
import { SimulateurResultInfo } from '../model/SimulateurResultInfo';
import { SimulateurResultListInfo } from '../model/SimulateurResultListInfo';

export class ReferenceDao {

    constructor(_mongodb) {
        this._mongodb = _mongodb;

    }

    registerNewsLetter(res, email) {
        info('Entering registerNewsLetter() email: ' + email);

         try {
             const newsletter = this._mongodb.collection('newsletter');
             const emailNews = _.trim(_.lowerCase(email));
             if (Validator.validateEmailAddress( emailNews )) {
                 error("l'adresse email n'est pas valide");
                 res.status(500).send("l'adresse email n'est pas valide");
                 return;
             }

             // Find some documents
             newsletter.findOneAndUpdate({'email': emailNews}, {email: emailNews, creationDate: createDateMongo()}, {
                 returnOriginal: false
               , upsert: true
             }, (err, clientResult) => {
                 if(err) {
                     callback(err);
                 }
                 debug('newsletter inséré.' );

                 res.end( "newsletter inséré." );
             });
        } catch( e ) {
            error('error: ' + e);
            res.status(500).send("Problème pendant la l'enregistrment de la newsletter.");
        }
    }


}
