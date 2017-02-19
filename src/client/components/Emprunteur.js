import React, { Component, PropTypes } from 'react';
import { Grid, Form, Row, Col, Button, Glyphicon , Image, Table, Tabs, Tab, Tooltip, OverlayTrigger} from 'react-bootstrap';
import _ from 'lodash';
import ProvideActions from '../actions/ProvideActions';
import Gallery from 'react-photo-gallery';
import CountUp from 'react-countup';
import ProvideStore from '../stores/ProvideStore';
import { getFullBelgiumDate, getDateISO } from '../../common/Utility';
import ConfirmPopup from './profile/ConfirmPopup';

class Emprunteur extends Component {
    constructor (props){
        super(props);
        this._onChange = this._onChange.bind(this);
        this._showPreteurPopup = this._showPreteurPopup.bind(this);
        this._closePreteurPopup = this._closePreteurPopup.bind(this);
        this._requestPreteur= this._requestPreteur.bind(this);

        this.state = ProvideStore.emprunteurState;
    }

    _showPreteurPopup() {
        this.setState({ openRequest: true });
    }

    _closePreteurPopup() {
        this.setState({ openRequest: false });
    }

    _requestPreteur() {
        ProvideActions.requestNewPreteur(this.state.profile, this.state.emprunteur.id);
    }

    _onChange() {
        this.setState(ProvideStore.emprunteurState);
    }

    componentDidMount() {
        const emprunteurId = this.props.params.emprunteurId;

        ProvideActions.getExplorerByEmprunteurId( this.state.profile, emprunteurId );

        ProvideStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ProvideStore.removeChangeListener(this._onChange);
    }

    render () {

        if ( _.isNil(this.state.emprunteur) ) {
            return null;
        }

        const PHOTO_SET = _.map(this.state.emprunteur.image , file => {
            return {
                src: file.src,
                width: file.width,
                height: file.height,
                aspectRatio: 1.5,
                resize: 1.2,
                lightboxImage:{src: file.src, width:20, height: 20}
            }
        })

        const tooltip = (
          <Tooltip id="tooltip"><strong>Prêter</strong> de l'argent à {this.state.emprunteur.denominationSocial}</Tooltip>
        );
        const endDate = getFullBelgiumDate( getDateISO(this.state.emprunteur.endDate));

        const startColor = this.state.emprunteur.isFavoris ? 'fa-2x startGold' : 'fa-2x';

        const favoriTooltip = (
          <Tooltip id="tooltip"><strong>Votre favoris.</strong></Tooltip>
        );

        const favoriButton = this.state.loggedIn ? (
            <OverlayTrigger placement="top" overlay={favoriTooltip}>
                <Button className="favoris-info" bsStyle="link" >
                    <Glyphicon glyph='star' className={startColor} onClick={e => ProvideActions.favorisEmprunteur(this.state.profile , this.state.emprunteur)} />
                </Button>
            </OverlayTrigger>
        ) : null;

        const logosrc = this.state.emprunteur.logo ? this.state.emprunteur.logo.src : null;
        const logowidth = this.state.emprunteur.logo ? this.state.emprunteur.logo.width : null;
        const logoheigth = this.state.emprunteur.logo ? this.state.emprunteur.logo.height : null;

        const messageNewRequest = `Vous faites une demande pour prêter de l'argent à ${this.state.emprunteur.denominationSocial} avec l'aide de Katapulta. Êtes-vous sûre?`;
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
                                    <Image src={logosrc} width={logowidth} height={logoheigth} rounded />
                                </Col>
                                <Col xs={11} md={7} lg={7}>
                                    <h4 className='alignEmprunteur'>Emprunteur</h4>
                                    <Table>
                                        <tbody>
                                          <tr>
                                            <th>Nom de société</th>
                                            <td>{this.state.emprunteur.denominationSocial}</td>
                                          </tr>
                                          <tr>
                                              <th>Adresse</th>
                                              <td>{this.state.emprunteur.adresseSiegeExploitation}, {this.state.emprunteur.codePostalSiegeExploitation} à {this.state.emprunteur.villeSiegeExploitation}</td>
                                          </tr>
                                          <tr>
                                              <th>Chiffre d'affaire</th>
                                              <td><CountUp start={1000} end={this.state.emprunteur.chiffreAffaire} useGrouping={true} separator="." duration={1.5} suffix=" EUR" /></td>
                                          </tr>
                                          <tr>
                                              <th>Emprunt souhaité</th>
                                              <td><CountUp start={100} end={this.state.emprunteur.montantSouhaite} useGrouping={true} separator="."  duration={1.5} suffix=" EUR" /></td>
                                          </tr>
                                          <tr>
                                              <th>Date de fin du prêt </th>
                                              <td>{endDate}</td>
                                          </tr>
                                        </tbody>
                                      </Table>
                                      <OverlayTrigger placement="right" overlay={tooltip}>
                                          <Button onClick={this._showPreteurPopup}
                                               bsStyle='success' className='btn-flat'>Prêter de l'argent</Button>
                                        </OverlayTrigger>
                                </Col>
                                <Col xs={1} md={1} lg={1}>
                                    { favoriButton }
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
                                                      {this.state.emprunteur.destinationPret}
                                                  </div>

                                              </Col>

                                          </Row>

                                      </div>
                                  </div>

                              </Col>
                        </Row>
                    </Grid>
                    <Grid className='margin-top-16'>
                        <Row className="tab-content">
                            <Gallery
                                lightboxShowImageCount={true}
                                    photos={PHOTO_SET}/>
                        </Row>
                    </Grid>
              </Row>

              <ConfirmPopup showModal={this.state.openRequest} title="Prêter de l'argent"
                  message={messageNewRequest}
                  closeModal={ this._closePreteurPopup }
                  buttonConfirmMessage="Envoyer" callback={this._requestPreteur} />
            </Grid>
        );
    }
}


export default Emprunteur;
