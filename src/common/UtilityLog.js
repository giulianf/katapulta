import _ from 'lodash';

import moment from 'moment';

let winston = require('winston');
winston.level = 'debug';

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {'timestamp':function() {return getLogDate(); },'colorize':true});

let jwt = require('jsonwebtoken');

const version = 'ktp-0.0.1';
export function info(message) {
    winston.log('info', message);
}

export function debug(message) {
    winston.log('debug', message);
}

export function error(message, error) {
    winston.log('error', message, error);
}

export function getLogDate() {
    return moment().format('DD/MM/YYYY HH:mm:ss');
}

export function getCurrentDate() {
    return moment(moment()).format('YYYY-MM-DD');
}

export function getYear(date) {
    return moment(date).year();
}

export function addYear(date, nb) {
    return moment(date).add(nb, 'y');
}

export function getDate(date) {
    return moment(date).format('YYYY-MM-DD');
}

export function getBelgiumDate(date) {
    return moment(date).format('DD/MM/YYYY');
}

export function getHour(hourMilli) {
    return moment(parseInt(hourMilli)).format('HH:mm');
}
export function getVersion() {
    return version;
}
