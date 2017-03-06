import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import routes from '../../routes';
import getMuiTheme from 'material-ui/styles/getMuiTheme'

var ReactGA = require('react-ga');
ReactGA.initialize('UA-92984228-1');

function logPageView() {
    window.scrollTo(0, 0);
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
}

export default class AppRoutes extends Component {
    static childContextTypes = {
        muiTheme: React.PropTypes.object
    }
    getChildContext() {
     return {
         muiTheme: getMuiTheme()
     }
    }
  render() {
    return (
      <Router  history={browserHistory} routes={routes} onUpdate={logPageView()}/>
    );
  }
}
