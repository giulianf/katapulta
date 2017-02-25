import _ from 'lodash';
import FormatMailing from './FormatMailing';
import {ContractGenerator} from './ContractGenerator';
import {DemandeEnregistrementGenerator} from './DemandeEnregistrementGenerator';
import { AttestationHonneurGenerator } from './AttestationHonneurGenerator';
import { Mailing } from './Mailing';
import { error, debug, info } from './UtilityLog';
import async from 'async';

export class MailManager {
    constructor(client, basicProfil, basicInfoEmprunteur, contractPreteur) {
        this._client = client;
        this._basicProfil = basicProfil;
        this._basicInfoEmprunteur = basicInfoEmprunteur;
        this._contractPreteur = contractPreteur;
    }


    getMail(eventStatusMail, callback) {
        info('Entering getMail() ' + eventStatusMail );

        if(_.isNil(eventStatusMail)){
         return null;
        }
        // check with switch status
        switch ( eventStatusMail ) {
            case "MISE_EN_LIGNE":
                this.mailMiseEnLigne(this._basicProfil , this._basicInfoEmprunteur, err => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    callback();
                });
                break;
            case "EXIT":
            this.mailExit(this._basicProfil , this._contractPreteur, this._basicInfoEmprunteur, err => {
                if (err) {
                    callback(err);
                    return;
                }
                callback();
            });
                break;
            default:
        }
    }

    mailMiseEnLigne(basicProfil, basicInfoEmprunteur, callback) {
        try {
            const mail = new Mailing(this._client);

            const subject = _.replace(FormatMailing.mail_mise_en_ligne_subject, '{reference}', basicInfoEmprunteur.id);
            let content = _.replace(FormatMailing.mail_mise_en_ligne_content, '{name}', basicProfil.nom);
            content = _.replace(content, '{creationDate}', basicProfil.creationDate );
            content = _.replace(content, '{reference}', basicInfoEmprunteur.id );

            const contractGenerator = new ContractGenerator();

            const attachmentName = "contract.pdf";
            const attachmentContent = contractGenerator.createPdfBinary(basicProfil, basicInfoEmprunteur, (binary) => {

            });
            mail.sendMail(subject, content, basicProfil.email, null, null);

            callback();
        } catch (e) {
            error('Error while mailMiseEnLigne: ', e);
            callback("Erreur pendant l'email mise en ligne");
        }
    }

    mailExit(basicProfil, contractPreteur, basicInfoEmprunteur, callback) {
        try {
            info("Entering mailExit");

            const mail = new Mailing(this._client);

            const subject = FormatMailing.mail_exit_subject;
            debug("Subject: "+ subject);
            let content = _.replace(FormatMailing.mail_exit_content, '{name}', basicProfil.nom);
            content = _.replace(content, '{creationDate}', basicProfil.createDate );
            content = _.replace(content, '{reference}', basicInfoEmprunteur.id );

            const contractGenerator = new ContractGenerator();
            const demandeEnregistrementGenerator = new DemandeEnregistrementGenerator();
            const attestationHonneurGenerator = new AttestationHonneurGenerator();

            async.waterfall([
                (callback) => {
                    const attachmentContent = contractGenerator.createPdfBinary(basicProfil, contractPreteur, basicInfoEmprunteur, (binary) => {
                        let attachments = [];

                        const attachmentName = "contract.pdf";
                        attachments.push({name: attachmentName, content: binary });
                        callback(null, attachments);
                    });
                },
                (attachments, callback) => {
                    const attachmentContent = demandeEnregistrementGenerator.createPdfBinary( (binary) => {
                        const attachmentName = "Demande_enregistrement.pdf";
                        attachments.push({name: attachmentName, content: binary });
                        callback(null, attachments);
                    });
                },
                (attachments, callback) => {
                    const attachmentContent = attestationHonneurGenerator.createPdfBinary( (binary) => {
                        const attachmentName = "attestation_honneur.pdf";
                        attachments.push({name: attachmentName, content: binary });
                        callback(null, attachments);
                    });
                }
            ], (err, result) => {
                if (err) {
                    error('Error during pdf generation', err);
                    callback(err);
                    return;
                }

                info("Result: " + result);
                mail.sendMail(subject, content, basicProfil.email, result );
                callback();
            });
        } catch (e) {
            error('Error while mailMiseEnLigne: ', e);
            callback("Erreur pendant l'email mise en ligne");
        }
    }
}
