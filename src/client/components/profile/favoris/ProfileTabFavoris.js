import React, { Component } from 'react';
import { Grid, Form, Row, Col, FormControl, FormGroup, ControlLabel, Button, Glyphicon } from 'react-bootstrap';
// import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import ProvideActions from '../../../actions/ProvideActions';
import ProvideStore from '../../../stores/ProvideStore';
import EmprunteurComponent from '../EmprunteurComponent';

export default class ProfileTabFavoris extends Component {
  constructor (props){
    super(props);

    this._handleSaveBasicInfo = this._handleSaveBasicInfo.bind(this);

  }

  componentDidMount() {
   }

   componentWillUnmount() {
   }

   _handleSaveBasicInfo() {
       // Save action for Server
   }
    render () {
        const favoris = !_.isEmpty(this.props.favoris) ? _.map(this.props.favoris , favori => {
            return (
                <EmprunteurComponent key={favori.id} profile={this.props.profile}
                    loggedIn={true} dataSociete={favori} col={4} onClickFavori={ProvideActions.favorisEmprunteur}/>
            )
        }) : 'Pas de favoris enregistré';

        return (
            <div key='profileTabFavoris'>
                <Col md={9} sm={9} className='space-top-bottom'>
                    <FormGroup>
                      <Col md={12} className='back-gallery'>
                          <Row className="margin-top-16 margin-bottom-16">
                              <Col md={12}>
                                    <div>
                                        <div className="panel-body">
                                            <Row className="gallery">
                                                <Col md={12}>
                                                    <div key='profileGallery' className="profile-gallery">
                                                        {favoris}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Col>
                                </Row>
                            </Col>
                    </FormGroup>
                </Col>
            </div>
        );
    }
}
