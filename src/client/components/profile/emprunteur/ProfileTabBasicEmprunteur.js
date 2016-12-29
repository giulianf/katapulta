import React, { Component } from 'react';
import { Grid, Form, Row, Col, FormControl, FormGroup, ControlLabel, Button, Glyphicon } from 'react-bootstrap';
// import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import ProvideActions from '../../../actions/ProvideActions';
import RaisedButton from 'material-ui/RaisedButton';
import Validator from '../../../../validator/validatorEmprunteurBasic';

// import Gallery from 'react-photo-gallery';

export default class ProfileTabBasicEmprunteur extends Component {
  constructor (props){
    super(props);

    this._addImage = this._addImage.bind(this);
    this._handleSaveBasicInfo = this._handleSaveBasicInfo.bind(this);

    this.state = {file: {}, imagePreviewUrl : {}, imageFiles:[] }

  }

  _addImage(e) {
     const value = e.target.value;
     e.preventDefault();

       let reader = new FileReader();
       let file = e.target.files[0];

       reader.onloadend = () => {
           const lastImage = reader.result;
           let imageFiles = this.state.imageFiles;
           imageFiles.push(lastImage);

         this.setState({
           file: file,
           imagePreviewUrl: lastImage,
           imageFiles: imageFiles
         });
        }

         reader.readAsDataURL(file);
 }

  componentDidMount() {
   }

   componentWillUnmount() {
   }

   _handleSaveBasicInfo() {
       // Save action for Server
   }
    render () {
        const validateSociete = !_.isNil(this.props.basicInfoEmprunteur.societe) && !_.isEmpty(this.props.basicInfoEmprunteur.societe) ? "success" : "";
        const validateChiffre = !_.isNil(this.props.basicInfoEmprunteur.chiffreAffaire) && _.isNumber(this.props.basicInfoEmprunteur.chiffreAffaire) ? "success" : "";
        const validateTva = !_.isNil(this.props.basicInfoEmprunteur.tva) && !_.isEmpty(this.props.basicInfoEmprunteur.tva) ? "success" : "";

        const colImage = !_.isNil(this.state) && !_.isNil(this.state.imagePreviewUrl) ? (
            _.map(this.state.imageFiles , file => {
                return (
                    <Col key={file} md={4} lg={4}>
                        <a href="#" title="Image 1">
                            <img className="img-responsive" src={file} alt="image" onClick={() => this.setState({ isOpen: true, photoIndex: 0 })}/>
                        </a>
                    </Col>
                )
            })
        ) : null;

        let indexImage = 0;
        let restImage = 0;
        const newImage = !_.isNil(this.state) && !_.isNil(this.state.imagePreviewUrl) ? (
            _.map(this.state.imageFiles , file => {
                indexImage ++;

                // 3 because only 3 image per row
                restImage = indexImage % 3
                if ( restImage == 0 ) {
                    return (
                        <Row>
                            {colImage[indexImage - 1]}
                        </Row>
                    )
                } else {
                    return colImage[indexImage - 1];
                }
            })

        ) : null;
        // const PHOTO_SET = _.map(this.state.imageFiles , file => {
        //     return {
        //         src: file,
        //         width: 50,
        //         height: 150,
        //         aspectRatio: 2.5,
        //         lightboxImage:{src: file, width:200}
        //     }
        // })

        const styles = {
          button: {
            margin: 12,
          },
          exampleImageInput: {
            cursor: 'pointer',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            width: '100%',
            opacity: 0,
          },
        };

        return (
            <div key='ProfileTabBasicEmprunteur'>
                <Col md={9} sm={9} className='space-top-bottom'>
                    <Form horizontal>
                      <FormGroup controlId="formHorizontalSoc" validationState={validateSociete}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Nom Société
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Société"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({denominationSocial: e.target.value})}  value={this.props.basicInfoEmprunteur.denominationSocial}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontaldesc" validationState={validateTva}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Forme juridique
                        </Col>
                            <Col sm={4} md={4}>
                                <FormControl type="text" placeholder=" Forme juridique" list="formeJuridique"
                                    onChange={e => ProvideActions.updateBasicInfoEmprunteur({formeJuridique: e.target.value})}  value={this.props.basicInfoEmprunteur.formeJuridique}/>
                                <datalist id="formeJuridique">
                                        <option key="SPRL" value="SPRL"></option>
                                        <option key="SPRL-S" value="SPRL-S"></option>
                                        <option key="SCRL" value="SCRL"></option>
                                        <option key="SCRI" value="SCRI"></option>
                                        <option key="SA" value="SA"></option>
                                        <option key="SNC" value="SNC"></option>
                                        <option key="SCS" value="SCS"></option>
                                        <option key="SCA" value="SCA"></option>
                                        <option key="ASBL" value="ASBL"></option>
                                        <option key="FONDATION" value="FONDATION"></option>
                                    </datalist>
                            </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontaldesc" validationState={validateTva}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Numéro entreprise
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Numéro entreprise"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({numEntreprise: e.target.value})}  value={this.props.basicInfoEmprunteur.description}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontaldesc" validationState={validateTva}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Siège social
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Siège social"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({siegeSocial: e.target.value})}  value={this.props.basicInfoEmprunteur.siegeSocial}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontaldesc" validationState={validateTva}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Siège d'exploitation
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Siège d'exploitation"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({siegeExploitation: e.target.value})}  value={this.props.basicInfoEmprunteur.siegeExploitation}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontaldesc" validationState={validateTva}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Représentant Legal
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Représentant Legal"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({representantLegal: e.target.value})}  value={this.props.basicInfoEmprunteur.representantLegal}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalEmail" validationState={validateTva}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Email
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="email"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({email: e.target.value})}  value={this.props.basicInfoEmprunteur.email}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalTel" validationState={validateTva}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Numéro de téléphone
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Numéro de téléphone"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({numTel: e.target.value})}  value={this.props.basicInfoEmprunteur.numTel}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalDConst" validationState={validateTva}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Date Constitution
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Date Constitution"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({dateConstitution: e.target.value})}  value={this.props.basicInfoEmprunteur.dateConstitution}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalCA" validationState={validateTva}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Chiffre d'affaire
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="chiffreAffaire"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({chiffreAffaire: e.target.value})}  value={this.props.basicInfoEmprunteur.chiffreAffaire}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalnbEmpl" validationState={validateTva}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Nombre d'employé
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Nombre Employe"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({nbEmploye: e.target.value})}  value={this.props.basicInfoEmprunteur.nbEmploye}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalCaital" validationState={validateTva}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Capital
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Capital"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({capital: e.target.value})}  value={this.props.basicInfoEmprunteur.capital}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalActionnariat" validationState={validateTva}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Actionnariat
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Actionnariat"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({actionnariat: e.target.value})}  value={this.props.basicInfoEmprunteur.actionnariat}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontaldestinationPret" validationState={validateTva}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Destination Pret
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Destination Pret"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({destinationPret: e.target.value})}  value={this.props.basicInfoEmprunteur.destinationPret}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalMontantSouhaite" validationState={validateTva}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Montant Souhaité
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Montant Souhaité"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({montantSouhaite: e.target.value})}  value={this.props.basicInfoEmprunteur.montantSouhaite}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontaldureeSouhaite" validationState={validateTva}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Durée Souhaitée
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Durée Souhaitée"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({dureeSouhaite: e.target.value})}  value={this.props.basicInfoEmprunteur.dureeSouhaite}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontaltauxInteretOffert" validationState={validateTva}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Taux d'intérêt offert
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Taux d'intérêt offert"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({tauxInteretOffert: e.target.value})}  value={this.props.basicInfoEmprunteur.tauxInteretOffert}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalsiteWeb" validationState={validateChiffre}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Site Web
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Site Web"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({siteWeb: e.target.value})}  value={this.props.basicInfoEmprunteur.siteWeb}/>
                        </Col>
                      </FormGroup>
                       <FormGroup>
                      <Col md={12} className='back-gallery'>
                          <Row className="margin-top-16 margin-bottom-16">
                              <Col md={12}>
                                    <div className="panel panel-profile">
                                        <div className="panel-heading overflow-hidden">
                                            <h2 className="panel-title heading-sm pull-left"><Glyphicon glyph="camera" /> GALLERY</h2>
                                        </div>
                                        <div className="panel-body">
                                            <Row>
                                                <Col md={3} mdOffset={9} >
                                                    <RaisedButton
                                                        className='pull-right'
                                                      containerElement='label'
                                                      label='Ajouter'
                                                      style={styles.button}
                                                      icon={<Glyphicon glyph="upload" className='glyphUpload'/>}>
                                                        <input type="file" style={styles.exampleImageInput} accept='.jpg,.png' onChange={this._addImage}/>
                                                    </RaisedButton>
                                                </Col>
                                            </Row>
                                            <Row className="gallery">
                                                <Col md={12}>
                                                    <div className="profile-gallery">
                                                        { newImage }
                                                    </div>

                                                </Col>

                                            </Row>

                                        </div>
                                    </div>

                                </Col>
                                </Row>
                            </Col>
                    </FormGroup>
                      <FormGroup>
                        <Col smOffset={10} sm={2} mdOffset={8} md={2}>
                          <Button bsStyle="primary"
                            onClick={ this._handleSaveBasicInfo }>
                            Enregistrer
                          </Button>
                        </Col>
                      </FormGroup>
                    </Form>
                </Col>
            </div>
        );
    }
}
