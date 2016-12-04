import _ from 'lodash';
import moment from 'moment';

export function getDateDetails() {
    return moment().format('DD/MM/YYYY HH:mm:ss');
}

export function getCurrentDate() {
    return moment(moment()).format('YYYY-MM-DD');
}

export function getDateISO(date) {
    const now = moment(date, 'DD/MM/YYYY');
    return now.toISOString();
}
export function getDate(date) {
    return moment(date, 'DD/MM/YYYY');
}

export function getHour(hourMilli) {
    return moment(parseInt(hourMilli)).format('HH:mm');
}

export function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true);
    }

    return (false);
}
