import React, { Component } from 'react';
import { Grid, Row, Col , ResponsiveEmbed} from 'react-bootstrap';
import { Link } from 'react-router';

export default class AboutPreteur extends Component {
  constructor (){
    super();
  }

  render () {

    return (
      <div>
        <div id='aboutPreteur'></div>
        <Grid>
          <Row className='section  section-padding'>
        		<div className="section-title text-center">
        			<h2>Prêter de l'<span>argent</span></h2>
                <div></div>
        		</div>
        		<Col md={6} sm={6} xs={6} >
              <div>
                <ResponsiveEmbed a16by9>
                  <embed type="image/svg+xml" src="https://player.vimeo.com/video/183058098" />
                </ResponsiveEmbed>
              </div>
        		</Col>
        		<Col md={6} sm={6} xs={6} >
        			<div className="single_about_content">
                <p>
                  Votre argent est en securité
                </p>
        			</div>
        		</Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
