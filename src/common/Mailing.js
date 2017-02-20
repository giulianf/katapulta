import _ from 'lodash';
import { error, debug, info } from './UtilityLog';

export class Mailing {
    constructor(client) {
        this._client = client;
    }


    sendMail(subject, content, mailTo, attachmentName, attachmentContent) {
        info('Entering sendMail()' );

        try {
            // const message = _.replace(FormatMailing.mail, '{societe}', 'Katapulta');
            // Give SES the details and let it construct the message for you.
            // this sends the email
            // this._client.sendRawEmail( {
            //    Source: 'info@katapulta.be',
            //    Destination: { ToAddresses: mailTo },
            //    Message: {
            //        Subject:Source {
            //           Data: subject
            //        },
            //        Body: {
            //            Html: {
            //                Data: content,
            //                Charset: 'STRING_VALUE'
            //            }
            //         }
            //    }
            // }
            // , function(err, data) {
            //     if(err) {
            //         error('Error during mailing.', err);
            //     }
            //     info('MAIL sent')
            //  });
            //
            let ses_mail = "From: 'Katapulta: Prêt coup de pouce' <" + mailTo + ">\n";
            ses_mail = ses_mail + "To: " + mailTo + "\n";
            ses_mail = ses_mail + "Subject: " + subject + "\n";
            ses_mail = ses_mail + "MIME-Version: 1.0\n";
            ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
            ses_mail = ses_mail + "--NextPart\n";
            ses_mail = ses_mail + "Content-Type: text/html; charset=us-ascii\n\n";
            ses_mail = ses_mail + content + "\n\n";
            ses_mail = ses_mail + "--NextPart\n";
            if (attachment) {
                ses_mail = ses_mail + "Content-Type: application/pdf;\n";
                ses_mail = ses_mail + "Content-Disposition: attachment; filename=\"" + attachmentName + "\"\n\n";
                ses_mail = ses_mail + attachmentContent + "\n\n";
            }
            ses_mail = ses_mail + "--NextPart";

            const params = {
            RawMessage: { Data: new Buffer(ses_mail) },
            Destinations: [ mailTo ],
            Source: "'AWS Tutorial Series' <" + mailTo + ">'"
            };

            ses.sendRawEmail(params, function(err, data) {
                   if(err) {
                       res.send(err);
                   }
                   else {
                       res.send(data);
                   }
            });
        } catch( e ) {
            error('Problem while sending email. ' + e);
            throw new Error('Problem while sending email.');
        }
    }

}
