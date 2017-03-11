import moment from 'moment';

let winston = require('winston');
winston.level = 'debug';

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {'timestamp':function() {return getLogDate(); },'colorize':true});

const version = `ktp-${process.env.VERSION}`;
export function info(message) {
    winston.log('info', message);
}

export function warn(message) {
    winston.log('warn', message);
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

export function getBelgiumDate(date) {
    return moment(date).format('DD/MM/YYYY');
}

export function getVersion() {
    return version;
}
