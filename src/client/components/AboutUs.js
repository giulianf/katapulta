import React, { Component } from 'react';
import { Grid, Row, Col , ResponsiveEmbed} from 'react-bootstrap';
import _ from 'lodash';

export default class AboutUs extends Component {
  constructor (){
    super();
  }

  render () {

    return (
      <div>
        <div id='about'></div>
        <Grid fluid>
          <Row className='section  section-padding'>
        		<div className="section-title text-center">
        			<h2>À propos de <span>nous</span></h2>
        			<div></div>
        		</div>
        		<Col md={6} sm={6} xs={6} mdOffset={3} xsOffset={3} >
              <div style={{width: 660, height: 'auto'}}>
                <ResponsiveEmbed a16by9>
                  <embed type="image/svg+xml" src="https://player.vimeo.com/video/183058098" />
                </ResponsiveEmbed>
              </div>
        		</Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
