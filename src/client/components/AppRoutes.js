import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import routes from '../../routes';
import getMuiTheme from 'material-ui/styles/getMuiTheme'

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
      <Router  history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
    );
  }
}
