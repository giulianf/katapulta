import React, { Component, PropTypes } from 'react';
import { Grid, Form, Row, Col, Button, Glyphicon , Image, Table, Tabs, Tab, Tooltip, OverlayTrigger} from 'react-bootstrap';
import _ from 'lodash';
import { getDateDetails } from '../../common/Utility';
import ProvideActions from '../actions/ProvideActions';
import Gallery from 'react-photo-gallery';
import CountUp from 'react-countup';

class Emprunteur extends Component {
    constructor (props){
        super(props);

        this.state = {file: {}, imagePreviewUrl : {}, imageFiles:[] }
    }

    render () {
        const emprunteurId = this.props.params.emprunteurId;

        if ( _.isNil(emprunteurId) ) {
            return null;
        }

        const PHOTO_SET = _.map(this.state.imageFiles , file => {
            return {
                src: file,
                width: 50,
                height: 150,
                aspectRatio: 2.5,
                lightboxImage:{src: file, width:200}
            }
        })

        const tooltip = (
          <Tooltip id="tooltip"><strong>Prêter</strong> de l'argent à Katapulta</Tooltip>
        );
        // const startColor = dataSociete.isFavoris ? 'fa-2x startGold' : 'fa-2x';


        return (
            <Grid fluid>
              <Row className='section section-padding section-emprunteur'>
                <div className="section-title text-center">
                  <h2>Profil Emprunteur </h2>
                  <div></div>
                </div>
                    <Grid>
                        <Row className="tab-content">
                                <Col xs={12} md={4} lg={4}>
                                     <Image src="/img/profile.jpg" rounded height="250" width="250"/>
                                </Col>
                                <Col xs={11} md={7} lg={7}>
                                    <h4 className='alignEmprunteur'>Emprunteur</h4>
                                    <Table>
                                        <tbody>
                                          <tr>
                                            <th>Nom de société</th>
                                            <td>Katapulta</td>
                                          </tr>
                                          <tr>
                                              <th>Adresse</th>
                                              <td>234 Avenue des best of the best 6000 Charleroi</td>
                                          </tr>
                                          <tr>
                                              <th>Chiffre d'affaire</th>
                                              <td><CountUp start={1000000} end={12000000} useGrouping={true} separator="." duration={1.5} suffix=" EUR" /></td>
                                          </tr>
                                          <tr>
                                              <th>Emprunt souhaité</th>
                                              <td><CountUp start={100} end={10000} useGrouping={true} separator="."  duration={1.5} suffix=" EUR" /></td>
                                          </tr>
                                          <tr>
                                              <th>Date de création de </th>
                                              <td>24 décembre 2015</td>
                                          </tr>
                                        </tbody>
                                      </Table>
                                      <OverlayTrigger placement="right" overlay={tooltip}>
                                          <Button bsStyle='success' className='btn-flat'>Prêter de l'argent</Button>
                                        </OverlayTrigger>
                                </Col>
                                <Col xs={1} md={1} lg={1}>
                                    <a href="#" className="favoris-info" >
                                        <Glyphicon glyph='star' className='fa-2x startGold' onClick={e => ProvideActions.favorisEmprunteur({dataSociete})} />
                                    </a>
                                </Col>
                        </Row>
                    </Grid>
                    <Grid className='margin-top-16'>
                        <Row className="tab-content">
                            <Col md={12}>
                                  <div className="panel panel-profile">
                                      <div className="panel-heading overflow-hidden">
                                          <h2 className="panel-title heading-sm pull-left"><Glyphicon glyph="camera" /> Information</h2>
                                      </div>
                                      <div className="panel-body">
                                          <Row>
                                              <Col md={3} mdOffset={9} >

                                              </Col>
                                          </Row>
                                          <Row className="gallery">
                                              <Col md={12}>
                                                  <div className="profile-gallery">
                                                      blabla
                                                  </div>

                                              </Col>

                                          </Row>

                                      </div>
                                  </div>

                              </Col>
                        </Row>
                    </Grid>


                <Gallery photos={PHOTO_SET}/>

              </Row>
            </Grid>
        );
    }
}


export default Emprunteur;
