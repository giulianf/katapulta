import { Server } from 'https';
import Express from 'express';
import cors from 'cors';
let bodyParser = require('body-parser');
const jwt = require('express-jwt');
import { error, debug, info } from './common/UtilityLog';
import { SimulatorDao } from './dao/SimulatorDao';
import { ProfileDao } from './dao/ProfileDao';
import { ExplorerDao } from './dao/ExplorerDao';
import { ContractDao } from './dao/ContractDao';
import { MailDao } from './dao/MailDao';
import { ReferenceDao } from './dao/ReferenceDao';
import path from 'path';
const fs = require('fs');

const privateKey  = fs.readFileSync(path.join(__dirname ,'sslcert', 'server.key'));
const certificate  = fs.readFileSync(path.join(__dirname ,'sslcert', 'server.crt'));

const credentials = {key: privateKey, cert: certificate};

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(credentials, app);
require('dotenv').config({
    path: path.join(__dirname ,'config', `.env.${process.env.NODE_ENV}`),
    // path: './config/.env.${process.env.NODE_ENV}',
    silent: true
});
// load aws sdk
let aws = require('aws-sdk');

// load aws config
aws.config.constructor({ "accessKeyId": process.env.AWS_KEY, "secretAccessKey": process.env.AWS_SECRET, "region": "us-east-1"  });
// aws.config.loadFromPath(path.join(__dirname, '..' ,'config', `configAWS.json`));

// load AWS SES
const clientSES = new aws.SES({apiVersion: '2010-12-01'});

// const ses = require('node-ses')
//   , clientSES = ses.createClient({ key: process.env.AWS_KEY, secret: process.env.AWS_SECRET });

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

const originCors = process.env.NODE_ENV == 'production' ? f('https://www.katapulta.be') : f('http://%s:%s', process.env.SERVER_CORS_HOST, process.env.SERVER_CORS_PORT);

app.use(cors({
     origin: originCors,
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
    debug("Entering /api/getEmprunteurBasicInfo ");

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
    const emprunteurContractId = req.body.emprunteurContractId;
    const valuePret = req.body.valuePret;

    const contractDao = new ContractDao(_mongodb);

    contractDao.requestNewPreteur(res, user, emprunteurContractId, valuePret);
});

app.post('/api/updateFavoris', (req, res) => {
    debug("Entering /api/updateFavoris ");

    const user_id = req.body.user_id;
    const contractEmprunteurId = req.body.contractEmprunteurId;
    const removed = req.body.removed;

    const profileDao = new ProfileDao(_mongodb);

    profileDao.updateFavoris(res, user_id, contractEmprunteurId, removed);
});

app.get('/api/getAdminContracts', (req, res) => {
    debug("Entering /api/getAdminContracts ");

    const contractDao = new ContractDao(_mongodb);

    contractDao.getAdminContracts(res);
});

app.put('/api/updateChangeStatus', (req, res) => {
    debug("Entering /api/updateChangeStatus ");

    const selectedContracts = req.body.selectedContracts;
    const isEmprunteur = req.body.isEmprunteur;
    const status = req.body.status;
    const notifyUser = req.body.notifyUser;

    const contractDao = new ContractDao(_mongodb);

    contractDao.updateChangeStatus(res, selectedContracts, status, notifyUser, isEmprunteur);
});

app.put('/api/updateBlockStatus', (req, res) => {
    debug("Entering /api/updateBlockStatus ");

    const contractDao = new ContractDao(_mongodb);

    contractDao.updateBlockStatus(res, selectedContracts, isEmprunteur);
});

app.put('/api/updateRappelStatus', (req, res) => {
    debug("Entering /api/updateRappelStatus ");

    const contractDao = new ContractDao(_mongodb);

    contractDao.updateRappelStatus(res, selectedContracts, isEmprunteur);
});

app.get('/api/getProfileFavoris/:favoris', (req, res) => {
    debug("Entering /api/getProfileFavoris ");

    const favoris = JSON.parse(req.params.favoris);

    const profileDao = new ProfileDao(_mongodb);

    profileDao.getProfileFavoris(res, favoris);
});

/******************************************/
/************ END PROFILE API *************/
/******************************************/


/******************************************/
/************ START EXPLORER API *************/
/******************************************/

app.get('/api/getExplorers/:user/:pageKey', (req, res) => {
    debug("Entering /api/getExplorers ");

    const pageKey = req.params.pageKey;
    const user = req.params.user;

    debug('Page to search: ' + pageKey);
    const explorerDao = new ExplorerDao(_mongodb);

    explorerDao.getExplorers(res, user, pageKey);
});

app.get('/api/getExplorerBycontractEmprunteurId/:userId/:contractEmprunteurId', (req, res) => {
    debug("Entering /api/getExplorerBycontractEmprunteurId ");

    const userId = req.params.userId;
    const contractEmprunteurId = req.params.contractEmprunteurId;

    const explorerDao = new ExplorerDao(_mongodb);

    explorerDao.getExplorerBycontractEmprunteurId(res, userId, contractEmprunteurId);
});

/******************************************/
/************ END EXPLORER API *************/
/******************************************/
const ObjectId = require('mongodb').ObjectId;

app.post('/api/mailtest', (req, res) => {
    debug("Entering /api/mailtest ");

    try {
        const mail = new MailDao(_mongodb, clientSES);

        mail.insertNewEvent( new ObjectId("58ae10d10bdd1f0ea61a6516"), "EXIT", true);
    } catch (e) {
        res.status(500).send(e.message);
    }
});


app.post('/api/generateContract', (req, res) => {
    debug("Entering /api/generateContract ");
    const contractDao = new ContractDao(_mongodb);

    const contractId = req.body.contractId;

    contractDao.generateContract(res, contractId);

});

/***********************************/
/********   START NEWSLETTER    ********/
/***********************************/
app.post('/api/registerNewsLetter', (req, res) => {
    debug("Entering /api/registerNewsLetter ");
    const referenceDao = new ReferenceDao(_mongodb);

    const emailNews = req.body.email;

    referenceDao.registerNewsLetter(res, emailNews);

});
/***********************************/
/********   END NEWSLETTER    ********/
/***********************************/

// start the server
const port = process.env.SERVER_PORT ;
const host = process.env.SERVER_HOST;
const env = process.env.NODE_ENV;
const version = process.env.npm_package_version;
// getVersion();
server.listen(port, err => {
  if (err) {
    return error(err);
  }
   info(`*************************************************`);
   info(`Server running on https://${host}:${port} [${env}]`);
   info(`Server listening (cors) on ${originCors} [${env}]`);
   info(`Version of Katapulta: ${version}`);
   info(`*********************************`);
});
