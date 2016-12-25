import path from 'path';
import { Server } from 'http';
import Express from 'express';
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { match, RouterContext } from 'react-router';
// import routes from './routes';
// import NoMatch from './client/components/NoMatch';
import cors from 'cors';
let bodyParser = require('body-parser');
import _ from 'lodash';
const jwt = require('express-jwt');
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import {green100, green500, green700} from 'material-ui/styles/colors';

import {getCurrentDate, getDate, error, debug, info, getYear, addYear, getBelgiumDate} from './common/UtilityLog';

import { SimulatorDao } from './dao/SimulatorDao';
import { ProfileDao } from './dao/ProfileDao';

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())
.use(function(req, res, next){
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end(/* icon content here */);
     } else {
         next();
     }
});
app.use(cors({
     origin: 'http://localhost:3333',
    credentials: true
}) );

// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.
const authCheck = jwt({
  secret: new Buffer('IdQLehW9Ui8hxtVDwSDLbiiXtjSgMiNA', 'base64'),
  audience: 'fumanju.eu.auth0.com'
});

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'webapp', 'resources')));

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
 * Update Basic info
 */
app.get('/api/getBasicInfo/:user', (req, res) => {
    debug("Entering /api/getBasicInfo ");

    const user = req.params.user;

    const profileDao = new ProfileDao();

    profileDao.getBasicInfo(res, user);
});

/**
 * Update Basic info
 */
app.post('/api/updateBasicInfo', (req, res) => {
    debug("Entering /api/updateBasicInfo ");

    const basicInfo = req.body.basicInfo;

    const profileDao = new ProfileDao();

    profileDao.updateBasicInfo(res, basicInfo);
});

/******************************************/
/************ END PROFILE API *************/
/******************************************/

// universal routing and rendering
// app.get('*', (req, res) => {
//     getMatch(req.url, req, res);
// });

// function getMatch (url, req, res) {
//     const muiTheme = getMuiTheme(null, {
//       avatar: {
//         borderColor: null,
//       },
//       userAgent: req.headers['user-agent'],
//     });
//
//     match(
//       { routes, location: url },
//       (err, redirectLocation, renderProps) => {
//
//         // in case of error display the error message
//         if (err) {
//           return res.status(500).send(err.message);
//         }
//
//         // in case of redirect propagate the redirect to the browser
//         if (redirectLocation) {
//           return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
//         }
//
//         info('location: ' + url);
//
//         if (_.isEqual(url, '/profile')) {
//              // check token
//
//             return res.redirect('/');
//         }
//
//         // generate the React markup for the current route
//         let markup;
//         if (renderProps) {
//           // if the current route matched we have renderProps
//           markup = renderToString( <MuiThemeProvider muiTheme={muiTheme}><RouterContext {...renderProps}/></MuiThemeProvider>);
//         } else {
//           // otherwise we can render a 404 page
//           markup = renderToString(<MuiThemeProvider><NoMatch/></MuiThemeProvider>);
//           res.status(404);
//         }
//
//         info('Markup ' + url);
//
//         // render the index template with the embedded React markup
//         return res.render('index', { markup });
//       }
//     );
// }

// start the server
const port = process.env.PORT || 3001;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return error(err);
  }
   info(`Server running on http://localhost:${port} [${env}]`);
});
