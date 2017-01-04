import _ from 'lodash';
import moment from 'moment';
import belgium from '../data/zipcode-belgium.json';

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
    if (!_.isNil(mail) && !_.isEmpty(mail)) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true);
        }        
    }

    return (false);
}

export function validateWeb(url) {
    const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

    if (re.test(url)) {
        return true;
    }

    return false;
}

export function validateDate(date) {
    if ( moment(date).isValid() ) {
        return true;
    }

    return false;
}

export function validatePassword(username, pass) {
    let valid = /[0-9]/;

// if(inputtxt.value.match(passw))
    if ( !_.isNil(pass) && !_.isEmpty(pass) && _.size(pass) > 6 ) {
        // must be different than username
        if (_.isEqual(username, pass)) {
            return false;
        }
        // must have at least one number
        if (!_.isMatch(pass, valid)) {
            return false;
        }
        // password must contain at least one lowercase letter (a-z)
        valid = /[a-z]/;
        if (!_.isMatch(pass, valid)) {
            return false;
        }
        // password must contain at least one uppercase letter [A-Z]
        valid = /[A-Z]/;
        if (!_.isMatch(pass, valid)) {
            return false;
        }

        return true;
    }

    return false;
}

export function periodDate(date, minDate) {
    const creationDate = moment(date).add(5, 'years');
    if ( creationDate.isAfter(moment()) ) {
        return true;
    }

    return false;
}

export function validateCodePostal(codePostal) {
    const zipObject = _.find(belgium, {'zip': codePostal});
    return !_.isNil(codePostal) && !_.isNil(zipObject) ? true : false;
}
