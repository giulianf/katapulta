var React = require('react');
import { Route, IndexRoute } from 'react-router'

import NoMatch from './components/NoMatch';
import Layout from './components/Layout';
import IndexPage from './components/HomePage';
import Preteur from './components/Preteur';
import Emprunteur from './components/Emprunteur';
import Faq from './components/Faq';

import Toastr from 'toastr';


const routes = (
        <Route path='/' component={Layout}>
          <IndexRoute component={IndexPage}/>
          <Route path='/preteur' component={Preteur} />
          <Route path='/emprunteur' component={Emprunteur} />
          <Route path='/faq' component={Faq} />
          <Route path="*" component={NoMatch} />
        </Route>
);


export default routes;
