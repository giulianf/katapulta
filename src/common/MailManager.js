import _ from 'lodash';
import FormatMailing from './FormatMailing';

export class MailManager {
    constructor(client, basicProfil, basicInfoEmprunteur) {
        this._client = client;
        this._basicProfil = basicProfil;
        this._basicInfoEmprunteur = basicInfoEmprunteur;
    }


    getMail(eventStatusMail) {
        info('Entering getMail() ' + eventStatusMail );

        if(_.isNil(eventStatusMail)){
         return null;
        }
        // check with switch status
        if(_.isEqual(eventStatusMail, "MISE_EN_LIGNE") ){
            this.mailMiseEnLigne(this._basicProfil , this._basicInfoEmprunteur, err => {
                if (err) {
                    callback(err);
                    return;
                }
                callback();
            });
        }
    }

    mailMiseEnLigne(basicProfil, basicInfoEmprunteur, callback) {
        try {
            const mail = new Mailing(this._client);

            const subject = _.replace(FormatMailing.mail_mise_en_ligne_subject, '{reference}', basicInfoEmprunteur.id);
            let content = _.replace(FormatMailing.mail_mise_en_ligne_content, '{name}', basicProfil.nom);
            content = _.replace(content, '{creationDate}', basicProfil.createDate );
            content = _.replace(content, '{reference}', basicInfoEmprunteur.id );

            mail.sendMail(subject, content, basicProfil.email);
            callback();
        } catch (e) {
            callback(e.message);
        }
    }
}
