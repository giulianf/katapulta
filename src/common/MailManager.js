import _ from 'lodash';
import FormatMailing from './FormatMailing';
import {ContractGenerator} from './ContractGenerator';
import {DemandeEnregistrementGenerator} from './DemandeEnregistrementGenerator';
import { Mailing } from './Mailing';
import { error, debug, info } from './UtilityLog';

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
            content = _.replace(content, '{creationDate}', basicProfil.createDate );
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

            const subject = _.replace(FormatMailing.mail_exit_subject, '{reference}', basicInfoEmprunteur.id);
            let content = _.replace(FormatMailing.mail_exit_content, '{name}', basicProfil.nom);
            content = _.replace(content, '{creationDate}', basicProfil.createDate );
            content = _.replace(content, '{reference}', basicInfoEmprunteur.id );

            const contractGenerator = new ContractGenerator();
            const demandeEnregistrementGenerator = new DemandeEnregistrementGenerator();

            const attachmentName = "contract.pdf";
            const attachmentName2 = "DemandeEnregistrement.pdf";
            const attachmentContent = contractGenerator.createPdfBinary(basicProfil, contractPreteur, basicInfoEmprunteur, (binary) => {
                const attachmentContent2 = demandeEnregistrementGenerator.createPdfBinary( (binary2) => {
                    mail.sendMail(subject, content, basicProfil.email, attachmentName, binary, attachmentName2, binary2);
                    callback();
                });

            });
        } catch (e) {
            error('Error while mailMiseEnLigne: ', e);
            callback("Erreur pendant l'email mise en ligne");
        }
    }
}
