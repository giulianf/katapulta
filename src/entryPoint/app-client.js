'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from '../client/components/AppRoutes';
import 'babel-polyfill';
import 'jquery';
import 'bootstrap';
import './js/scrolltopcontrol.js';

import injectTapEventPlugin from 'react-tap-event-plugin';

import './less/style.less';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

  //Needed for React Developer Tools
  window.React = React;

window.onload = () => {
  ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
};
