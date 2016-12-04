import { getDateISO } from '../common/Utility';
import moment from 'moment';

export class BasicInfoEmprunteur {

    constructor(username, societe, chiffreAffaire, tva, image) {
        this.username= username;
        this.societe=societe;
        this.chiffreAffaire= chiffreAffaire;
        this.tva= tva;
        this.image= image;
    }
}
