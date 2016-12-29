import _ from 'lodash';
import moment from 'moment';

export function getDateDetails() {
    return moment().format('DD/MM/YYYY HH:mm:ss');
}

export function getCurrentDate() {
    return moment.utc(moment()).format('YYYY-MM-DD');
}

export function getDateISO(dateString) {
    const now = moment.utc(dateString, 'DD/MM/YYYY');
    return now.local().toISOString();
}

export function getDate(dateString) {
    return moment.utc(dateString, 'DD/MM/YYYY');
}

export function getHour(hourMilli) {
    return moment(parseInt(hourMilli)).format('HH:mm');
}

export function getBelgiumDate(date) {
    return moment.utc(date).format('DD/MM/YYYY');
}

export function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true);
    }

    return (false);
}

export function validateDate(date) {
    if ( moment(date).isValid() ) {
        return true;
    }

    return false;
}
