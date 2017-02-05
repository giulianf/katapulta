import _ from 'lodash';
import { error, debug, info } from './UtilityLog';
import FormatMailing from './FormatMailing';

export class Mailing {
    constructor(client) {
        this._client = client;
    }


    sendMail() {
        info('Entering sendMail()' );

        try {
            const message = _.replace(FormatMailing.mail, '{societe}', 'Katapulta');
            // Give SES the details and let it construct the message for you.
            this._client.sendEmail({
               to: 'julien.fumanti@gmail.com'
             , from: 'info@katapulta.be'
             , subject: 'Information de Katapulta'
             , message: message
             , altText: 'plain text'
            }, function (err, data, res) {
                if(err) {
                    error('Error during mailing.', err);
                }
                info('MAIL sent')
             // ...
            });
        } catch( e ) {
            error('Problem while sending email. ' + e);
        }
    }

}
