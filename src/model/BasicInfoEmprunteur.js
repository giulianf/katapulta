import { getDateISO } from '../common/Utility';
import moment from 'moment';

export class BasicInfoEmprunteur {

    constructor(username, societe, description, chiffreAffaire, tva, image) {
        this.username= username;
        this.societe=societe;
        this.description=description;
        this.chiffreAffaire= chiffreAffaire;
        this.tva= tva;
        this.image= image;
    }
}
