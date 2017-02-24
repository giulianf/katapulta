import _ from 'lodash';
import { error, debug, info } from './UtilityLog';
const mailcomposer = require('mailcomposer');
const MailComposer = mailcomposer.MailComposer;

export class Mailing {
    constructor(client) {
        this._client = client;
    }


    sendMail(subject, content, mailTo, attachmentName, attachmentContent, attachmentName2, attachmentContent2) {
        info('Entering sendMail() to ' + mailTo );
        debug('attachmentName ' + attachmentName);
        debug('attachmentName2 ' + attachmentName2);

        try {
            const mailFrom = 'info@katapulta.be';
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
            //nicolas.butacide@gmail.com
            // let ses_mail = "From: 'Katapulta Prêt coup de pouce' <info@katapulta.be>\n";
            // ses_mail = ses_mail + "To: " + mailTo + "\n";
            // ses_mail = ses_mail + "Subject: " + subject + "\n";
            // ses_mail = ses_mail + "MIME-Version: 1.0\n";
            // ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
            // ses_mail = ses_mail + "--NextPart\n";
            // ses_mail = ses_mail + "Content-Type: text/html; charset=iso-8859-1\n\n";
            // ses_mail = ses_mail + content + "\n\n";
            // ses_mail = ses_mail + "--NextPart\n";
            // if (attachmentName) {
            //     ses_mail = ses_mail + "Content-Type: application/pdf; name=\"" + attachmentName + "\"\n";
            //     ses_mail = ses_mail + "Content-Transfer-Encoding: base64\n";
            //     ses_mail = ses_mail + "Content-Disposition: attachment; filename=\"" + attachmentName + "\"\n\n";
            //     ses_mail = ses_mail + attachmentContent + "\n\n;";
            //     ses_mail = ses_mail + "--NextPart";
            // }
            let ses_mail = "From: 'Katapulta Prêt coup de pouce' <"+mailFrom+ ">\n";
            ses_mail = ses_mail + "To: " + mailTo + "\n";
            ses_mail = ses_mail + "Subject: " + subject + "\n";
            ses_mail = ses_mail + "MIME-Version: 1.0\n";
            ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
            ses_mail = ses_mail + "--NextPart\n";
            // ses_mail = ses_mail + "Content-Type: multipart/alternative; boundary=\"NextPart2\"\n\n";
            // ses_mail = ses_mail + "--NextPart2\n";
            ses_mail = ses_mail + "Content-Type: text/html; charset=iso-8859-1\n\n";
            ses_mail = ses_mail + content + "\n\n";
            ses_mail = ses_mail + "--NextPart\n";
            if (attachmentName) {
                ses_mail = ses_mail + "--NextPart";
                ses_mail = ses_mail + "Content-Type: application/pdf; name=\"" + attachmentName + "\"\n";
                ses_mail = ses_mail + "Content-Transfer-Encoding: base64\n";
                ses_mail = ses_mail + "Content-Disposition: attachment; filename=\"" + attachmentName + "\"\n\n";
                ses_mail = ses_mail + attachmentContent + "\n\n;";
                ses_mail = ses_mail + "--NextPart";
            }
            if (attachmentName2) {
                ses_mail = ses_mail + "--NextPart";
                ses_mail = ses_mail + "Content-Type: application/pdf; name=\"" + attachmentName2 + "\"\n";
                ses_mail = ses_mail + "Content-Transfer-Encoding: base64\n";
                ses_mail = ses_mail + "Content-Disposition: attachment; filename=\"" + attachmentName2 + "\"\n\n";
                ses_mail = ses_mail + attachmentContent2 + "\n\n";
                ses_mail = ses_mail + "--NextPart";
            }
            //
            // const params = {
            // RawMessage: { Data: new Buffer(ses_mail) },
            // Destinations: [ mailTo ],
            // Source: "'AWS Tutorial Series' <info@katapulta.be>'"
            // };
            //
            // this._client.sendRawEmail(params, function(err, data) {
            //        if(err) {
            //           error('Error while sending mail ', err)
            //        }
            //        else {
            //            info("CONGRAT to " + mailTo + " from " + mailFrom );
            //        }
            // });



            const to      = mailTo;
            const from    = mailFrom;
            const subject = subject;
            const htmlBody = content;
            const attachments = [{
                filename: attachmentName,
                contents: attachmentContent
            }, {
                filename: attachmentName2,
                contents: attachmentContent2
            }  ];

            const mailOptions = {
                from: from,
                subject: subject,
                // text: textBody,
                html: htmlBody,
                attachments: attachments ? attachments : []
            };

            const mail = mailcomposer(mailOptions);

            mail.build(function (err, message){
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
            };
        } catch( e ) {
            error('Problem while sending email. ' + e);
            throw new Error('Problem while sending email.');
        }
    }

}
