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

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace, callback) => {
  if (!LayoutStore.loggedIn) {
    //   Toastr.error("Connectez-vous avant l'accès à votre compte.")
    // replace({ pathname: '/' })
  }
  callback();
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

const routes = (
        <Route path='/' component={Layout}>
            <IndexRoute component={IndexPage} />
            <Route path='/Explorer' component={Explorer} />
            <Route path='/simulateur' component={Simulateur} />
            <Route path='/faq' component={Faq} />
            <Route path='/contact' component={Contact} />
            <Route path='/profile' component={Profile} onEnter={requireAuth}/>
            <Route path='/login' component={Login} />
            <Route path="*" component={NoMatch} />
        </Route>
);


export default routes;
