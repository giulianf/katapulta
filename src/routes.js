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
import Emprunteur from './client/components/Emprunteur';
import LayoutStore from './client/stores/LayoutStore';
import AuthService from './client/services/AuthService'

import Toastr from 'toastr';

const auth = new AuthService('uwy5HE63Wy6vezc1Kzq1W0ls64LYX2oi', 'fumanju.eu.auth0.com');

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace, callback) => {
    if (!auth.loggedIn()) {
        replace({ pathname: '/login' })
      }
  if (!LayoutStore.loggedIn) {
    //   Toastr.error("Connectez-vous avant l'accès à votre compte.")
    // replace({ pathname: '/' })
  }
  callback();
}

// OnEnter for callback url to parse access_token
const parseAuthHash = (nextState, replace) => {
  if (nextState.location.hash) {
    auth.parseHash(nextState.location.hash)
    replace({ pathname: '/profile' })
  }
}

const routes = (
        <Route path='/' component={Layout} auth={auth}>
            <IndexRoute component={IndexPage} />
            <Route path="explorer" component={Explorer} />
            <Route path="/emprunteur/:emprunteurId" component={ Emprunteur }/>
            <Route path='simulateur' component={Simulateur} />
            <Route path='/faq' component={Faq} />
            <Route path='/contact' component={Contact} />
            <Route path='/profile' component={Profile} onEnter={requireAuth}/>
            <Route path='login' component={Login} onEnter={parseAuthHash}/>
            <Route path="*" component={NoMatch} />
        </Route>
);


export default routes;
