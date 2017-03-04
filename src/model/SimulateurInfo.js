import { getDateISO } from '../common/Utility';
import moment from 'moment';

export class SimulateurInfo {
    constructor(datePret, pret, year, taux) {
        this.datePret = getDateISO(datePret);
        this.pret= pret;
        this.year= year;
        this.taux= taux;
    }
}
