import React, { Component, PropTypes } from 'react';
import { Grid, Form, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';
import _ from 'lodash';
import { getDateDetails } from '../../../common/Utility';
import ProvideActions from '../../actions/ProvideActions';

class EmprunteurComponent extends Component {
    constructor (props){
        super(props);
    }

    render () {
        const { dataSociete } = this.props;

        if ( _.isNil(dataSociete) ) {
            return null;
        }

        const startColor = dataSociete.isFavoris ? 'fa-2x startGold' : 'fa-2x';
        const creationDate = getDateDetails(dataSociete.creationDate);

        return (
            <Col key={dataSociete.emprunteurId} xs={12} sm={6} md={this.props.col} lg={this.props.col}>
                <div className="widget user-view-style-1">
                    <div className="thumbnail">
                        <img  src="/img/profile.jpg" alt="242x200"/>
                        <Button className="favoris-info" >
                            <Glyphicon glyph='star' className={startColor}  onClick={e => ProvideActions.favorisEmprunteur({dataSociete})} />
                        </Button>
                        <div className="user-info">
                            <p className="user-name">{dataSociete.nomSociete}</p>
                            <p className="user-type administrator"><span className="badge">{dataSociete.niveau}</span></p>
                        </div>

                        <div className="caption">
                            <div className="user-task-info">
                                <Glyphicon glyph='equalizer' className='fa-2x' />
                                <span className="lbl-user-number-tickets">{dataSociete.chiffreAffaire} / 5000</span>
                            </div>

                            <div className="user-other-info">
                                <ul>
                                    <li>
                                        <Glyphicon glyph='globe'/>
                                        <span>
                                            <a href="#">{dataSociete.location}</a>
                                        </span>
                                    </li>
                                    <li>
                                        <span className="fa fa-cubes"></span>
                                        <span>
                                            <a href="#">{dataSociete.activite}</a>
                                        </span>
                                    </li>
                                    <li>
                                        <Glyphicon glyph='time'/>
                                        <span>
                                            <a href="#">{creationDate}</a>
                                        </span>
                                    </li>
                                    <li>
                                        <Glyphicon glyph='align-center'/> <span>{dataSociete.description}</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="user-action">
                                <Link className="btn btn-sm btn-success" to='/emprunteur/77'>Voir <i className="fa fa-eye"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        );
    }
}

EmprunteurComponent.propTypes = {
  dataSociete: PropTypes.object.isRequired,
};

export default EmprunteurComponent;
