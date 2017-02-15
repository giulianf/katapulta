import _ from 'lodash';
import { error, debug, info } from './UtilityLog';

export class Mailing {
    constructor(client) {
        this._client = client;
    }


    sendMail(subject, content, mailTo) {
        info('Entering sendMail()' );

        try {
            // const message = _.replace(FormatMailing.mail, '{societe}', 'Katapulta');
            // Give SES the details and let it construct the message for you.
            this._client.sendEmail({
               to: mailTo
             , from: 'info@katapulta.be'
             , subject: subject
             , message: content
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
            throw new Error('Problem while sending email.');
        }
    }

}
