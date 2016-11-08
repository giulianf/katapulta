import React, { Component } from 'react';
import { Grid, Row, Col , ButtonToolbar, Button, Carousel, Media} from 'react-bootstrap';
import { Link } from 'react-router';
import Scrollchor from 'react-scrollchor';
import _ from 'lodash';
import Footer from 'footer';
import Slider from 'slider';
import AboutUs from 'aboutUs';
import AboutEmprunteur from 'aboutEmprunteur';
import AboutPreteur from 'aboutPreteur';
import OurService from 'ourService';
import Newsletter from 'newsletter';
import Contact from 'contact';

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

        <Footer />
      </div>
    );
  }
}
