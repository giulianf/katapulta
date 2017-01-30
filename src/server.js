import path from 'path';
import { Server } from 'http';
import Express from 'express';
import cors from 'cors';
let bodyParser = require('body-parser');
import _ from 'lodash';
const jwt = require('express-jwt');
import { error, debug, info, getVersion } from './common/UtilityLog';
import { SimulatorDao } from './dao/SimulatorDao';
import { ProfileDao } from './dao/ProfileDao';
import { ExplorerDao } from './dao/ExplorerDao';
import { ContractDao } from './dao/ContractDao';


// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
require('dotenv').config({
    path: path.join(__dirname, '..' ,'config', `.env.${process.env.NODE_ENV}`),
    // path: './config/.env.${process.env.NODE_ENV}',
    silent: true
});
const MongoDb =  require('mongodb');
const MongoClient = MongoDb.MongoClient,
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
    if (err) {
        error('MongoDb is not connected.');
        return;
    }

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

    const profileDao = new ProfileDao(_mongodb);

    profileDao.getBasicInfo(res, user, email);
});

/**
 * Update Basic info
 */
app.post('/api/updateBasicInfo', (req, res) => {
    debug("Entering /api/updateBasicInfo ");

    const basicInfo = req.body.basicInfo;

    const profileDao = new ProfileDao(_mongodb);

    profileDao.updateBasicInfo(res, basicInfo);
});
/**
 * get emprunteur Basic info by user id
 */
app.get('/api/getEmprunteurBasicInfo/:user', (req, res) => {
    debug("Entering /api/getBasicInfo ");

    const user = req.params.user;

    const profileDao = new ProfileDao(_mongodb);

    profileDao.getEmprunteurBasicInfoResponse(res, user);
});

/**
 * Update emprunteur Basic info
 */
app.post('/api/updateEmprunteurBasicInfo', (req, res) => {
    debug("Entering /api/updateEmprunteurBasicInfo ");

    const basicInfoEmprunteur = req.body.basicInfoEmprunteur;

    const profileDao = new ProfileDao(_mongodb);

    profileDao.updateEmprunteurInfo(res, basicInfoEmprunteur);
});

app.get('/api/getContractEmprunteur/:user', (req, res) => {
    debug("Entering /api/getContractEmprunteur ");

    const user = req.params.user;

    const contractDao = new ContractDao(_mongodb);

    contractDao.getContractEmprunteur(res, user);
});

app.get('/api/getContractPreteur/:user', (req, res) => {
    debug("Entering /api/getContractPreteur ");

    const user = req.params.user;

    const contractDao = new ContractDao(_mongodb);

    contractDao.getContractPreteur(res, user);
});

app.post('/api/requestNewEmprunt', (req, res) => {
    debug("Entering /api/requestNewEmprunt ");

    const user = req.body.user_id;

    const contractDao = new ContractDao(_mongodb);

    contractDao.requestNewEmprunt(res, user);
});

app.post('/api/requestNewPreteur', (req, res) => {
    debug("Entering /api/requestNewPreteur ");

    const user = req.body.user_id;

    const contractDao = new ContractDao(_mongodb);

    contractDao.requestNewPreteur(res, user);
});

app.post('/api/updateFavoris', (req, res) => {
    debug("Entering /api/updateFavoris ");

    const user_id = req.body.user_id;
    const emprunteurId = req.body.emprunteurId;
    const removed = req.body.removed;

    const profileDao = new ProfileDao(_mongodb);

    profileDao.updateFavoris(res, user_id, emprunteurId, removed);
});

/******************************************/
/************ END PROFILE API *************/
/******************************************/


/******************************************/
/************ START EXPLORER API *************/
/******************************************/

app.get('/api/getExplorers/:user/:pageKey', (req, res) => {
    debug("Entering /api/getExplorers ");

    const user = req.params.user;
    const pageKey = req.params.pageKey;

    debug('User: ' + user);
    debug('Page to search: ' + pageKey);
    const explorerDao = new ExplorerDao(_mongodb);

    explorerDao.getExplorers(res, user, pageKey);
});

app.get('/api/getExplorerByEmprunteurId/:userId/:emprunteurId', (req, res) => {
    debug("Entering /api/getExplorerByEmprunteurId ");

    const userId = req.params.userId;
    const emprunteurId = req.params.emprunteurId;

    const explorerDao = new ExplorerDao(_mongodb);

    explorerDao.getExplorerByEmprunteurId(res, MongoDb, userId, emprunteurId);
});

/******************************************/
/************ END EXPLORER API *************/
/******************************************/

// start the server
const port = process.env.SERVER_PORT ;
const host = process.env.SERVER_HOST;
const env = process.env.NODE_ENV;
const version = getVersion();
server.listen(port, err => {
  if (err) {
    return error(err);
  }
   info(`*************************************************`);
   info(`Server running on http://${host}:${port} [${env}]`);
   info(`Version of Katapulta: ${version}`);
   info(`*********************************`);
});
