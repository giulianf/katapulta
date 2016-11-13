var React = require('react');
import { Route, IndexRoute } from 'react-router'

import NoMatch from './client/components/NoMatch';
import Layout from './client/components/Layout';
import IndexPage from './client/components/HomePage';
import Explorer from './client/components/Explorer';
import Simulateur from './client/components/Simulateur';
import Faq from './client/components/Faq';

import Toastr from 'toastr';

const routes = (
        <Route path='/' component={Layout}>
          <IndexRoute component={IndexPage}/>
          <Route path='/Explorer' component={Explorer} />
          <Route path='/simulateur' component={Simulateur} />
          <Route path='/faq' component={Faq} />
          <Route path="*" component={NoMatch} />
        </Route>
);


export default routes;
