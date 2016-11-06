'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from '../components/AppRoutes';



  //Needed for React Developer Tools
  window.React = React;

window.onload = () => {
  ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
};
