import { getDateISO } from '../common/Utility';
import moment from 'moment';

export class BasicInfoEmprunteur {

    constructor(user_id, societe, description, chiffreAffaire, tva, image) {
        this.user_id= user_id;
        this.societe=societe;
        this.description=description;
        this.chiffreAffaire= chiffreAffaire;
        this.tva= tva;
        this.image= image;
    }
}
