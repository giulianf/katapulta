import React, { Component, PropTypes } from 'react';
import { Grid, Form, Row, Col, Button, Glyphicon, Tooltip, OverlayTrigger, Image , Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router';
import _ from 'lodash';
import { getFullBelgiumDate, getDateISO } from '../../../common/Utility';
import ProvideActions from '../../actions/ProvideActions';

class EmprunteurComponent extends Component {
    constructor (props){
        super(props);
    }

    render () {
        const { dataSociete, profile } = this.props;

        if ( _.isNil(dataSociete) ) {
            return null;
        }

        const startColor = dataSociete.isFavoris ? 'fa-2x startGold' : 'fa-2x';
        const endDate = getFullBelgiumDate( getDateISO(dataSociete.endDate));

        const tooltipEndDate = (
          <Tooltip id="tooltipEndDate"><strong>Date de fin pour l'emprunt</strong></Tooltip>
        );

        const tooltip = (
          <Tooltip id="tooltip"><strong>Chiffre d'affaire</strong></Tooltip>
        );

        const favoriTooltip = (
          <Tooltip id="tooltip"><strong>Votre favoris.</strong></Tooltip>
        );

        const favoriButton = this.props.loggedIn ? (
            <OverlayTrigger placement="top" overlay={favoriTooltip}>
                <Button className="favoris-info" >
                    <Glyphicon glyph='star' className={startColor}  onClick={ e => this.props.onClickFavori( profile , dataSociete ) } />
                </Button>
            </OverlayTrigger>
        ) : null;

        const logosrc = dataSociete.logo ? dataSociete.logo.src : null;
        const logoheigth = dataSociete.logo ? dataSociete.logo.height : null;

        return (
            <Col key={dataSociete.emprunteurId} xs={12} sm={6} md={this.props.colmd} lg={this.props.col}>
                <div className="widget user-view-style-1">
                    <div className="thumbnail">
                            <Image src={logosrc}/>
                                { favoriButton }
                        <div className="user-info">
                            <p className="user-name">{dataSociete.denominationSocial}</p>
                            <p className="user-type administrator"><span className="badge">{dataSociete.niveau}</span></p>
                        </div>

                        <div className="caption">
                            <div className="user-task-info">
                                <OverlayTrigger placement="top" overlay={tooltip}>
                                    <div>
                                        <Glyphicon glyph='stats' className='fa-2x bgm-green' />
                                        <span className="user-number-tickets">{dataSociete.chiffreAffaire}€</span>
                                        <span className="lbl-user-number-tickets">Chiffre d'affaire</span>
                                    </div>
                               </OverlayTrigger>
                            </div>

                            <div className="user-other-info">
                                <ul>
                                    <li>
                                        <Glyphicon glyph='globe'/>
                                        <span>
                                            <a href="#">{dataSociete.villeSiegeExploitation}</a>
                                        </span>
                                    </li>
                                    <li>
                                        <span className="fa fa-cubes"></span>
                                        <span>
                                            <a href="#">{dataSociete.sectorActivite}</a>
                                        </span>
                                    </li>
                                    <li>
                                        <OverlayTrigger placement="top" overlay={tooltipEndDate}>
                                            <Glyphicon glyph='time'/>
                                        </OverlayTrigger>
                                        <span>
                                            <OverlayTrigger placement="top" overlay={tooltipEndDate}>
                                                <a href="#">{endDate}</a>
                                            </OverlayTrigger>
                                        </span>
                                    </li>
                                    <li>
                                        <Glyphicon glyph='align-center'/> <span><a target="_blank" href={`http://${dataSociete.siteWeb}`}>{dataSociete.siteWeb}</a></span>
                                    </li>
                                </ul>
                            </div>

                            <div className="user-action">
                                <Link className="btn btn-sm btn-success" to={`/emprunteur/${dataSociete.id}`}>Voir <i className="fa fa-eye"></i></Link>
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
