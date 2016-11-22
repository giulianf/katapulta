var React = require('react');
import { Route, IndexRoute } from 'react-router'

import NoMatch from './client/components/NoMatch';
import Layout from './client/components/Layout';
import IndexPage from './client/components/HomePage';
import Explorer from './client/components/Explorer';
import Simulateur from './client/components/Simulateur';
import Faq from './client/components/Faq';
import Contact from './client/components/Contact';
import Profile from './client/components/Profile';
import Login from './client/components/Login';
import LayoutStore from './client/stores/LayoutStore';

import Toastr from 'toastr';

// const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__);
const auth = new AuthService('IdQLehW9Ui8hxtVDwSDLbiiXtjSgMiNA', 'fumanju.eu.auth0.com');

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}
//authenticated component hook
// const requireAuth =  (nextState, replace, callback) => {
//  // nextPathStore = nextState.location.pathname
//
//     LayoutStore._autoLogin();
//     if (!LayoutStore.isLoggedIn) {
//         replace( '/login');
//     }
//     callback();
// }
//
// /**
//  * to avoid to go to login page if the user is already logged in
//  */
// const requireLogin =  (nextState, replace, callback) => {
//  // nextPathStore = nextState.location.pathname
//
//     LayoutStore._autoLogin();
//   if (!LayoutStore.isLoggedIn) {
//     replace( '/' );
//
//   }
//   callback();
// }

const routes = (
        <Route path='/' component={Layout}  auth={auth}>
            <IndexRedirect to="/home" />
            <Route path="home" component={IndexPage} onEnter={requireAuth} />
            <Route path='/Explorer' component={Explorer} />
            <Route path='/simulateur' component={Simulateur} />
            <Route path='/faq' component={Faq} />
            <Route path='/contact' component={Contact} />
            <Route path='/profile' component={Profile} onEnter={requireAuth}/>
            <Route path='/login' component={Login} onEnter={requireLogin}/>
            <Route path="*" component={NoMatch} />
        </Route>
);


export default routes;
