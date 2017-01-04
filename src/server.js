import path from 'path';
import { Server } from 'http';
import Express from 'express';
import cors from 'cors';
let bodyParser = require('body-parser');
import _ from 'lodash';
const jwt = require('express-jwt');
import {getCurrentDate, getDate, error, debug, info, getYear, addYear, getBelgiumDate} from './common/UtilityLog';
import { SimulatorDao } from './dao/SimulatorDao';
import { ProfileDao } from './dao/ProfileDao';
import { LoginDao } from './dao/LoginDao';

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
require('dotenv').config({
    path: path.join(__dirname, '..' ,'config', `.env.${process.env.NODE_ENV}`),
    // path: './config/.env.${process.env.NODE_ENV}',
    silent: true
});
const MongoClient =  require('mongodb').MongoClient,
  f = require('util').format;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json({limit: '50mb'}))
.use(function(req, res, next){
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end(/* icon content here */);
     } else {
         next();
     }
});
app.use(cors({
     origin: f('http://%s:%s', process.env.SERVER_CORS_HOST, process.env.SERVER_CORS_PORT),
    credentials: true
}) );

// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.
const authCheck = jwt({
  secret: new Buffer(process.env.AUTH_SECRET, 'base64'),
  audience: process.env.AUTH_AUDIENCE
});

let _mongodb;

const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const localhostDB = process.env.DB_HOST;
const portDB = process.env.DB_PORT;
const authSource = process.env.DB_DB;

// Connection URL
const url = f('mongodb://%s:%s@%s:%s/%s', user, password, localhostDB, portDB, authSource);

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  info("Mongo db connected successfully to server");
  _mongodb =  db;
});


/******************************************/
/********** START SIMULATOR API ***********/
/******************************************/

/**
 * Calculate Simulator
 */
app.get('/api/simulate/:simulateData', (req, res) => {
    debug("Entering /api/simulate ");
    debug("Receive data simulateData: " + req.params.simulateData);

    const simulateData = JSON.parse(req.params.simulateData);

    const simulatorDao = new SimulatorDao();

    simulatorDao.getSimulatorResult(res, simulateData);
});


/******************************************/
/*********** END SIMULATOR API ************/
/******************************************/


/******************************************/
/********** START PROFILE API ***********/
/******************************************/

/**
 * get Basic info by user id
 */
app.get('/api/getBasicInfo/:user/:email', (req, res) => {
    debug("Entering /api/getBasicInfo ");

    const user = req.params.user;
    const email = req.params.email;

    const profileDao = new ProfileDao();

    profileDao.getBasicInfo(res, _mongodb, user, email);
});

/**
 * Update Basic info
 */
app.post('/api/updateBasicInfo', (req, res) => {
    debug("Entering /api/updateBasicInfo ");

    const basicInfo = req.body.basicInfo;

    const profileDao = new ProfileDao();

    profileDao.updateBasicInfo(res, _mongodb, basicInfo);
});
/**
 * get emprunteur Basic info by user id
 */
app.get('/api/getEmprunteurBasicInfo/:user', (req, res) => {
    debug("Entering /api/getBasicInfo ");

    const user = req.params.user;

    const profileDao = new ProfileDao();

    profileDao.getEmprunteurBasicInfo(res, _mongodb, user);
});

/**
 * Update emprunteur Basic info
 */
app.post('/api/updateEmprunteurBasicInfo', (req, res) => {
    debug("Entering /api/updateEmprunteurBasicInfo ");

    const basicInfoEmprunteur = req.body.basicInfoEmprunteur;

    const profileDao = new ProfileDao();

    profileDao.updateEmprunteurInfo(res, _mongodb, basicInfoEmprunteur);
});

/******************************************/
/************ END PROFILE API *************/
/******************************************/


/******************************************/
/************ END LOGIN API *************/
/******************************************/

app.post('/api/forgetLogin', (req, res) => {
    debug("Entering /api/forgetLogin ");

    const newUser = req.body.newUser;
    const token = req.body.token;

    const loginDao = new LoginDao();

    loginDao.forgetUser(res, _mongodb, newUser, token);
})
// start the server
const port = process.env.SERVER_PORT ;
const host = process.env.SERVER_HOST;
const env = process.env.NODE_ENV;
server.listen(port, err => {
  if (err) {
    return error(err);
  }
   info(`Server running on http://${host}:${port} [${env}]`);
});
