import _ from 'lodash';
import { error, debug, info } from './UtilityLog';
const mailcomposer = require('mailcomposer');
const MailComposer = mailcomposer.MailComposer;

export class Mailing {
    constructor(client) {
        this._client = client;
    }


    sendMail(subject, content, mailTo, mailFrom, attachments) {
        info('Entering sendMail() to ' + mailTo + ' and mail from: ' + mailFrom);

        try {

            const to      = mailTo;
            const from    = mailFrom;
            const htmlBody = content;

            const attachmentsFile = _.map(attachments, attachment => {
                debug('attachmentName ' + attachment.name);
                return {
                    contentType: 'application/pdf',
                    filename: attachment.name,
                    content: attachment.content,
                    encoding: 'base64'
                };
            });

            // const attachments = [{
            //     contentType: 'application/pdf',
            //     filename: attachmentName,
            //     content: attachmentContent,
            //     encoding: 'base64'
            // }, {
            //     contentType: 'application/pdf',
            //     filename: attachmentName2,
            //     content: attachmentContent2,
            //     encoding: 'base64'
            // }  ];
            debug("Subject Mailing: "+ subject);

            const mailOptions = {
                to: to,
                from: from,
                subject: subject,
                // text: textBody,
                html: htmlBody,
                attachments: attachmentsFile ? attachmentsFile : []
            };

            const mail = mailcomposer(mailOptions);

            mail.build( (err, message) => {
                const req = this._client.sendRawEmail({RawMessage: {Data: message}});

                req.on('build', function() {
                    req.httpRequest.headers['Force-headers'] = '1';
                });

                req.send(function (err, data) {
                    if (err) {
                           error('Error while sending mail ', err)
                    } else {
                        info("CONGRAT to " + mailTo + " from " + mailFrom );
                    }
                });
            });
        } catch( e ) {
            error('Problem while sending email. ' + e);
            throw new Error('Problem while sending email.');
        }
    }

}
