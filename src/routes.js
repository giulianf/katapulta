var React = require('react');
import { Route, IndexRoute, IndexRedirect } from 'react-router'

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
import LayoutActions from './client/actions/LayoutActions';

import Toastr from 'toastr';
import _ from 'lodash';
// onEnter callback to validate authentication in private routes
const requireBasicAuth = (nextState, replace, callback) => {
    LayoutStore.parseHash(nextState.location.hash);

    callback();
}

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace, callback) => {
    const loggedBool= LayoutStore.parseHash(nextState.location.hash);

    if (!LayoutStore.loggedIn) {
        replace({ pathname: '/login' });
    }
    callback();
}

// OnEnter for callback url to parse access_token
const parseAuthLoginHash = (nextState, replace) => {
    const loggedBool= LayoutStore.parseHash(nextState.location.hash);

    if (LayoutStore.loggedIn) {
        if (_.isEqual(nextState.location.pathname, '/login')) {
            replace({ pathname: 'profile' })
        } else {
            replace({ pathname: nextState.location.pathname })
        }
    }
}

const routes = (
        <Route path='/' component={Layout}>
            <IndexRoute component={IndexPage} onEnter={ requireBasicAuth } />
            <Route path="explorer" component={Explorer} onEnter={ requireBasicAuth } />
            <Route path="/emprunteur/:emprunteurId" component={ Emprunteur } onEnter={ requireBasicAuth } />
            <Route path='simulateur' component={Simulateur} onEnter={ requireBasicAuth }/>
            <Route path='/faq' component={Faq} onEnter={ requireBasicAuth }/>
            <Route path='/profile' component={Profile} onEnter={ requireAuth } />
            <Route path='/login' component={Login} onEnter={ parseAuthLoginHash } />
            <Route path="*" component={NoMatch} />
        </Route>
);


export default routes;
