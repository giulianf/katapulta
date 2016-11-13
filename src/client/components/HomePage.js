import React, { Component } from 'react';
import { Grid, Row, Col , ButtonToolbar, Button, Carousel, Media} from 'react-bootstrap';
import { Link } from 'react-router';
import Scrollchor from 'react-scrollchor';
import _ from 'lodash';
import Slider from './Slider';
import AboutUs from './AboutUs';
import AboutEmprunteur from './AboutEmprunteur';
import AboutPreteur from './AboutPreteur';
import OurService from './OurService';
import Newsletter from './Newsletter';
import Contact from './Contact';

export default class HomePage extends Component {
  constructor (){
    super();
    this.state = {index: 0, direction: null};
  }

  render () {
    return (
      <div>
        {/* Carousel  */}
        <Slider/>

          {/* about us section */}
          <AboutUs/>
          {/* about preteur section */}
          <AboutPreteur/>
          {/* about emprunteur section */}
          <AboutEmprunteur/>
          {/* our service section */}
          <OurService />
          {/* Newsletter ection */}
          <Newsletter />
          {/* Contact ection */}
          <Contact />

      </div>
    );
  }
}
