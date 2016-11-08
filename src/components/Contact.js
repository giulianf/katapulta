import React, { Component } from 'react';
import { Grid, Row, Col, Button , FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import FieldGroup from 'fieldGroup';

export default class Contact extends Component {
  constructor (){
    super();
  }

  render () {

    return (
      <div id='contact'>
        <Grid fluid>
          <Row className='section  section-padding'>
            <div className="section-title text-center">
              <h2>Prendre <span>contact</span></h2>
              <div></div>
            </div>
            <Col md={4} sm={4} xs={12} mdOffset={4} >
              <form>
                  <FieldGroup
                      id="formControlsText"
                      type="text"
                      placeholder="Entrez votre nom"
                    />
                  <FieldGroup
                      id="formControlsEmail"
                      type="email"
                      placeholder="Entrez votre email"
                    />
                    <FormGroup controlId="formControlsTextarea">
                      <FormControl componentClass="textarea" rows={6} placeholder="Votre message" />
                    </FormGroup>
                </form>
              </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
