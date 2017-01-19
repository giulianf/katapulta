import React, { Component, PropTypes } from 'react';
import { Grid, Form, Row, Col, FormControl, FormGroup, ControlLabel, Button, Glyphicon, Table, HelpBlock, Checkbox , Image} from 'react-bootstrap';
// import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import ProvideActions from '../../../actions/ProvideActions';
import RaisedButton from 'material-ui/RaisedButton';
import Validator from '../../../../validator/validatorEmprunteurBasic';
import Toastr from 'toastr';
import belgium from '../../../../data/zipcode-belgium.json';
let DatePicker = require("react-bootstrap-date-picker");
import categories from '../../../../data/categories.json';
const imageLoad = require('blueimp-load-image-npm');

class ProfileTabBasicEmprunteur extends Component {
  constructor (props){
    super(props);

    this._addImage = this._addImage.bind(this);
    this._removeImage = this._removeImage.bind(this);
    this._changeActionnaire = this._changeActionnaire.bind(this);
    this._addActionnaire = this._addActionnaire.bind(this);
    this._handleSaveEmprunteurBasicInfo = this._handleSaveEmprunteurBasicInfo.bind(this);
    this._addLogoImage = this._addLogoImage.bind(this);

    this.state = { removeFiles:[], actionnaire: {titre: "Mr", nomComplet:"", nbPart: 0} };

  }

  _handleSaveEmprunteurBasicInfo() {
      this.props.handleSaveEmprunteurBasicInfo(this.props.basicInfoEmprunteur);
  }

  _addRemoveFile(file, e) {
      const checked = e.target.checked;

      if ( checked ) {
          this.state.removeFiles.push(file);
      } else {
          _.remove(this.state.removeFiles, (f) => {
              return _.isEqual(f, file) ;
          });
      }
  }

    _addImage(e) {
     const value = e.target.value;
     e.preventDefault();

       let reader = new FileReader();
       let file = e.target.files[0];
         const blob = e.target.files[0];
         const images = this.props.basicInfoEmprunteur.image;

        reader.onloadend = () => {
            let lastImage = new Image();
            let tempImage = {src: null, width: null, height: null};
            lastImage.src = reader.result;

            const MAX_WIDTH = 400;
            const MAX_HEIGHT = 300;
            let tempW = lastImage.width;
            let tempH = lastImage.height;
            if (tempW > tempH) {
                if (tempW > MAX_WIDTH) {
                   tempH *= MAX_WIDTH / tempW;
                   tempW = MAX_WIDTH;
                }
            } else {
                if (tempH > MAX_HEIGHT) {
                   tempW *= MAX_HEIGHT / tempH;
                   tempH = MAX_HEIGHT;
                }
            }

            let img = this.props.basicInfoEmprunteur.image;
            tempImage.src =lastImage.src;
            tempImage.width = tempW;
            tempImage.height = tempH;
            // lastImage.index = _.size(this.props.basicInfoEmprunteur.image) + 1;
            img.push(tempImage);

            ProvideActions.updateBasicInfoEmprunteur({image: img});
        }
         reader.readAsDataURL(file);
}

    _addLogoImage(e) {
        const value = e.target.value;
        e.preventDefault();

        const blob = e.target.files[0];

        imageLoad.parseMetaData(blob, function(data) {
            let ori = 0;
            let type = 0;
            if (data.exif) {
                ori = data.exif.get('Orientation');
                type = data.exif.get('Type');
            }

            const loadingImage = imageLoad(
                blob,
                function(img) {
                    let tempImage = {src: null, width: null, height: null};
                    // lastImage.src = reader.result;

                    const MAX_WIDTH = 250;
                    const MAX_HEIGHT = 200;

                    tempImage.src =img.toDataURL();
                    tempImage.width = MAX_WIDTH;
                    tempImage.height = MAX_HEIGHT;

                    ProvideActions.updateBasicInfoEmprunteur({logo: tempImage});
                }, {
                    canvas: true,
                    orientation: ori
                }
            );
        },
        {
        maxMetaDataSize: 262144,
        disableImageHead: false
    });
    }

 _removeImage() {
     let img = this.props.basicInfoEmprunteur.image;

     _.remove(img, (file) => {
         let fileToRemove = false;
         _.forEach(this.state.removeFiles, rf => {
             if( _.isEqual(rf, file)) {
             fileToRemove= true;
             return;
            }
         });

         return fileToRemove;
     });
     this.state.removeFiles = [];

     ProvideActions.updateBasicInfoEmprunteur({image: img});
 }

  componentDidMount() {

   }

   componentWillUnmount() {
   }

   _handleSaveBasicInfo() {
       // Save action for Server
   }

   _changeActionnaire(newObject) {
       let actionnaire = this.state.actionnaire;

       _.assign(actionnaire, newObject);
       this.setState(actionnaire);

   }

   _addActionnaire() {
       let actionnaire = this.props.basicInfoEmprunteur.actionnariat;

       if (Validator.validateNewActionnariat(actionnaire, this.state.actionnaire)) {
           actionnaire.push(_.cloneDeep( this.state.actionnaire ));

           ProvideActions.updateBasicInfoEmprunteur({ actionnariat: actionnaire });
       } else {
           Toastr.error("le nouvel actionnaire n'est pas valid.");
       }
   }

   _removeActionnaire(nomComplet) {
       let actionnaires = this.props.basicInfoEmprunteur.actionnariat;
       _.remove(actionnaires, item => {
            return _.isEqual(item.nomComplet , nomComplet);
        });

       ProvideActions.updateBasicInfoEmprunteur({ actionnariat: actionnaires });
   }

    render () {
        const validateSociete = Validator.validateString(this.props.basicInfoEmprunteur.denominationSocial) ? "success" : "error";
        const validateFJ = Validator.validateFormeJuridique(this.props.basicInfoEmprunteur.formeJuridique) ? "success" : "error";
        const validateNumEntreprise = Validator.validateTva(this.props.basicInfoEmprunteur.numEntreprise) ? "success" : "error";
        const validateAddressSS= Validator.validateAddress(this.props.basicInfoEmprunteur.adresseSiegeSocial) ? "success" : "error";
        const validateCodePostalSC = Validator.validateCodePostal(this.props.basicInfoEmprunteur.codePostalSiegeSocial) ? "success" : "error";
        const validateVilleSS = Validator.validateString(this.props.basicInfoEmprunteur.villeSiegeSocial) ? "success" : "error";
        const validateAdresseSE = Validator.validateAddress(this.props.basicInfoEmprunteur.adresseSiegeExploitation) ? "success" : "error";
        const validateCodePostalSE = Validator.validateCodePostal(this.props.basicInfoEmprunteur.codePostalSiegeExploitation) ? "success" : "error";
        const validateVilleSE = Validator.validateString(this.props.basicInfoEmprunteur.villeSiegeExploitation ) ? "success" : "error";
        const validateSector = Validator.validateString(this.props.basicInfoEmprunteur.sectorActivite ) ? "success" : "error";
        const validateReprensentantL = Validator.validateString(this.props.basicInfoEmprunteur.representantLegal ) ? "success" : "error";
        const validateEmail = Validator.validateEmailAddress(this.props.basicInfoEmprunteur.email ) ? "success" : "error";
        const validateNumTel = Validator.validateString(this.props.basicInfoEmprunteur.numTel ) ? "success" : "error";
        const validateDateConstitution = Validator.validateDateConstitution(this.props.basicInfoEmprunteur.dateConstitution ) ? "success" : "error";
        const validateChiffre = Validator.validateChiffreAffaire(this.props.basicInfoEmprunteur.chiffreAffaire) ? "success" : "error";
        const validateNbEmploye = Validator.validateNbEmploye(this.props.basicInfoEmprunteur.nbEmploye ) ? "success" : "error";
        const validateCapital = Validator.validateNumber(this.props.basicInfoEmprunteur.capital ) ? "success" : "error";
        const validateActionnariat = Validator.validateActionnariat(this.props.basicInfoEmprunteur.actionnariat) ? "success" : "error";
        const validateDestinationPret = Validator.validateString(this.props.basicInfoEmprunteur.destinationPret) ? "success" : "error";
        const validateMontantSouhaite = Validator.validatePretSouhaite(this.props.basicInfoEmprunteur.montantSouhaite) ? "success" : "error";
        const validateDureeSouhaite = Validator.validateYearSouhaite(this.props.basicInfoEmprunteur.dureeSouhaite) ? "success" : "error";
        const validatetaux = Validator.validateTauxInteret(this.props.basicInfoEmprunteur.tauxInteretOffert) ? "success" : "error";
        const validateSiteWeb = Validator.validateString(this.props.basicInfoEmprunteur.siteWeb ) ? "success" : "error";

        const colImage = !_.isNil(this.state) && !_.isNil(this.props.basicInfoEmprunteur.image) ? (
            _.map(this.props.basicInfoEmprunteur.image , file => {
                return (
                    <Col key={file.src} md={4} lg={4}>
                        <a href="#" title="Image 1">
                            <img className="img-responsive" src={file.src} alt="image" onClick={() => this.setState({ isOpen: true, photoIndex: 0 })}/>

                            <Checkbox className="pull-right" onClick={ this._addRemoveFile.bind(this, file)}></Checkbox>

                        </a>
                    </Col>
                )
            })
        ) : null;

        let indexImage = 0;
        let restImage = 0;
        const newImage = !_.isNil(this.state) && !_.isNil(this.props.basicInfoEmprunteur.image) ? (
            _.map(this.props.basicInfoEmprunteur.image , file => {
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

        const actionnaires = !_.isNil(this.props.basicInfoEmprunteur.actionnariat) ? _.map(this.props.basicInfoEmprunteur.actionnariat, actionnaire => {
            return (
                <tr>
                  <td>{actionnaire.titre}</td>
                  <td>{actionnaire.nomComplet}</td>
                  <td>{actionnaire.nbPart}</td>
                  <td><Button bsStyle="danger" onClick={this._removeActionnaire.bind(this, actionnaire.nomComplet )}><Glyphicon glyph="minus"></Glyphicon></Button></td>
                </tr>
            )
        }) : null;

        const listZip = _.sortedUniq(_.map(belgium, (city) => {
            return city.zip;
        }));
        const cityData = _.map(listZip, (city) => {
            return (<option key={city} value={city}></option>);
        });

        const minTaux = Validator.TAUX_MINIMUM;
        const maxTaux = Validator.TAUX_MAXIMUM;
        const pretMax = Validator.PRET_MAX;
        const dataSource3 =  _.map( _.sortBy(categories) , (cat) => {
            return (<option key={cat} value={cat}></option>);
        });

        const logosrc = this.props.basicInfoEmprunteur.logo ? this.props.basicInfoEmprunteur.logo.src : null;
        const logowidth = this.props.basicInfoEmprunteur.logo ? this.props.basicInfoEmprunteur.logo.width : null;
        const logoheigth = this.props.basicInfoEmprunteur.logo ? this.props.basicInfoEmprunteur.logo.height : null;

        return (
            <div key='ProfileTabBasicEmprunteur'>
                <Col md={9} sm={9} className='space-top-bottom'>
                    <Form horizontal>
                      <FormGroup controlId="formHorizontalLogo">
                        <Col md={3} lg={4} sd={2}>
                          <RaisedButton
                              className='pull-right'
                            containerElement='label'
                            label='Photo du profil'
                            style={styles.button}
                            icon={<Glyphicon glyph="upload" className='glyphUpload'/>}>
                              <input type="file" style={styles.exampleImageInput} accept='.jpg,.png' onChange={this._addLogoImage}/>
                          </RaisedButton>
                        </Col>
                        <Col sm={12} md={8}>
                             <Image src={logosrc} width={logowidth} height={logoheigth} rounded />
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalSoc" validationState={validateSociete}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Nom Société
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Société"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({denominationSocial: e.target.value})}  value={this.props.basicInfoEmprunteur.denominationSocial}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalFJ" validationState={validateFJ}>
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
                      <FormGroup controlId="formHorizontalNumE" validationState={ validateNumEntreprise }>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Numéro entreprise
                        </Col>
                        <Col sm={1} xs={1} lgHidden mdHidden>
                            <FormControl.Static>
                               BE
                             </FormControl.Static>
                        </Col>
                        <Col lg={1} md={2} xsHidden smHidden>
                             <FormControl type="text" value="BE" disabled/>
                        </Col>
                        <Col sm={10} xs={10} md={6} lg={7}>
                          <FormControl type="text" placeholder="Numéro entreprise"
                              onChange={e =>{
                                  ProvideActions.updateBasicInfoEmprunteur({numEntreprise: e.target.value}) }
                              }  value={this.props.basicInfoEmprunteur.numEntreprise}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalASS" validationState={validateAddressSS}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Adresse Siège social
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Adresse Siège social"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({adresseSiegeSocial: e.target.value})}  value={this.props.basicInfoEmprunteur.adresseSiegeSocial}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalCSS" validationState={validateCodePostalSC}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Code postal Siège social
                        </Col>
                        <Col sm={4} md={4}>
                            <FormControl type="text" placeholder="Code Postal Siège social" list="list"
                                onChange={e => ProvideActions.updateBasicInfoEmprunteur({codePostalSiegeSocial: parseInt(e.target.value)})}  value={this.props.basicInfoEmprunteur.codePostalSiegeSocial}/>
                            <datalist id="list">
                                    {cityData}
                                </datalist>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalASS" validationState={validateVilleSS}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Ville Siège social
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Ville Siège social"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({villeSiegeSocial: e.target.value})}  value={this.props.basicInfoEmprunteur.villeSiegeSocial}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalAddressSiegeExpl" validationState={validateAdresseSE}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Adresse Siège d'exploitation
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Adresse Siège d'exploitation"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({adresseSiegeExploitation: e.target.value})}  value={this.props.basicInfoEmprunteur.adresseSiegeExploitation}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalSiegeExpl" validationState={validateCodePostalSE}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Code Postal Siège d'exploitation
                        </Col>
                            <Col sm={4} md={4}>
                                <FormControl type="text" placeholder="Code Postal Siège d'exploitation" list="list"
                                    onChange={e => ProvideActions.updateBasicInfoEmprunteur({codePostalSiegeExploitation: parseInt(e.target.value)})}  value={this.props.basicInfoEmprunteur.codePostalSiegeExploitation}/>
                            </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalVilleSiegeExpl" validationState={validateVilleSE}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Ville Siège d'exploitation
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Ville Siège d'exploitation"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({villeSiegeExploitation: e.target.value})}  value={this.props.basicInfoEmprunteur.villeSiegeExploitation}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalRL" validationState={validateSector}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Secteur d'activité
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Secteur d'activité" list="cat"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({sectorActivite: e.target.value})}  value={this.props.basicInfoEmprunteur.sectorActivite}/>
                          <datalist id="cat">
                                      { dataSource3 }
                              </datalist>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalRL" validationState={validateReprensentantL}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Représentant Légal
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Représentant Légal"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({representantLegal: e.target.value})}  value={this.props.basicInfoEmprunteur.representantLegal}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalEmail" validationState={validateEmail}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Email
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="email"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({email: e.target.value})}  value={this.props.basicInfoEmprunteur.email}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalTel" validationState={validateNumTel}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Numéro de téléphone
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Numéro de téléphone"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({numTel: e.target.value})}  value={this.props.basicInfoEmprunteur.numTel}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalDConst" validationState={validateDateConstitution}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Date Constitution
                        </Col>
                        <Col sm={12} md={8}>
                            <DatePicker id="example-datepicker" dateFormat='DD/MM/YYYY' value={this.props.basicInfoEmprunteur.dateConstitution}
                                dayLabels={['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']}
                                monthLabels={['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre']}
                                onChange={ (value, formattedValue) => ProvideActions.updateBasicInfoEmprunteur({dateConstitution: value}) } />
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalCA" validationState={validateChiffre}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Chiffre d'affaire
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="number" placeholder="chiffreAffaire" step="0.01"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({chiffreAffaire: parseFloat(e.target.value)})}  value={this.props.basicInfoEmprunteur.chiffreAffaire}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalnbEmpl" validationState={validateNbEmploye}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Nombre d'employé
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="number" placeholder="Nombre Employe"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({nbEmploye: parseInt(e.target.value)})}  value={this.props.basicInfoEmprunteur.nbEmploye}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalCaital" validationState={validateCapital}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Capital
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="number" placeholder="Capital"  step="0.01"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({capital: parseFloat(e.target.value) })}  value={this.props.basicInfoEmprunteur.capital}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalActionnariat" validationState={ validateActionnariat }>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Actionnariat
                        </Col>
                        <Col xs={2} sm={2} md={2}>
                            <FormControl componentClass="select" placeholder="select"
                                value={ this.state.actionnaire.titre } onChange={e => this._changeActionnaire({titre: e.target.value}) } >
                              <option value="select">select</option>
                              <option value="Mr">Mr.</option>
                              <option value="Mme">Mme.</option>
                            </FormControl>
                        </Col>
                        <Col xs={6} sm={6} md={3}>
                          <FormControl type="text" placeholder="Actionnariat" onChange={e => this._changeActionnaire({nomComplet: _.trimStart(e.target.value)}) }
                              value={ this.state.actionnaire.nomComplet }/>
                        </Col>
                        <Col xs={2} sm={2} md={2}>
                          <FormControl type="number" placeholder="nb parts" onChange={e => this._changeActionnaire({nbPart: parseFloat(e.target.value)}) }
                              value={ this.state.actionnaire.nbPart }/>
                        </Col>
                        <Col xs={2} sm={2} md={1}>
                            <Button bsStyle="info" onClick={this._addActionnaire}><Glyphicon glyph="plus"></Glyphicon></Button>
                         </Col>
                         { !_.isNil(this.props.basicInfoEmprunteur.actionnariat) && !_.isEmpty(this.props.basicInfoEmprunteur.actionnariat) ?  (
                             <Col xs={10} sm={10} md={7} mdOffset={2} smOffset={2} xsOffset={2}>
                             <Table>
                                 <thead>
                                   <tr>
                                     <th>Titre</th>
                                     <th>Nom complet</th>
                                     <th>Nb parts</th>
                                   </tr>
                                 </thead>
                                 <tbody>
                                     { actionnaires }
                                 </tbody>
                             </Table>
                         </Col>
                     ) : null}
                      </FormGroup>
                      <FormGroup controlId="formHorizontaldestinationPret" validationState={validateDestinationPret}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Destination Pret
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Destination Pret"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({destinationPret: e.target.value})}  value={this.props.basicInfoEmprunteur.destinationPret}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalMontantSouhaite" validationState={validateMontantSouhaite}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Montant Souhaité
                        </Col>
                        <Col sm={12} md={8}>
                            <FormControl type="number" placeholder="Entrez votre somme d'argent(pret)"
                                onChange={e => ProvideActions.updateBasicInfoEmprunteur({montantSouhaite: parseInt(e.target.value)})}
                                 value={this.props.basicInfoEmprunteur.montantSouhaite}/>
                             <HelpBlock>Max 50.000€ par prêteur, max 100.000€ par emprunteur</HelpBlock>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontaldureeSouhaite" validationState={validateDureeSouhaite}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Durée Souhaitée
                        </Col>
                        <Col sm={12} md={8}>
                            <FormControl componentClass="select" placeholder="Entrez la durée souhaitée (année)"
                                 onChange={e => ProvideActions.updateBasicInfoEmprunteur({dureeSouhaite: e.target.value})}
                                 value={this.props.basicInfoEmprunteur.dureeSouhaite} >
                                <option value="select">selectionnez</option>
                                <option value="4">4</option>
                                <option value="6">6</option>
                                <option value="8">8</option>
                              </FormControl>
                              <HelpBlock>Le temps du prêt est de 4, 6 ou 8 ans.</HelpBlock>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontaltauxInteretOffert" validationState={validatetaux}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Taux d'intérêt offert
                        </Col>
                        <Col sm={12} md={8}>
                            <FormControl type="number" placeholder="Taux d'intérêt offert"
                                onChange={e => ProvideActions.updateBasicInfoEmprunteur({tauxInteretOffert: parseFloat(e.target.value)})}
                                value={this.props.basicInfoEmprunteur.tauxInteretOffert} min={minTaux} max={maxTaux} step="0.001"/>
                            <HelpBlock>Le taux est de minimum {minTaux}% et maximum {maxTaux}%.</HelpBlock>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalsiteWeb" validationState={validateSiteWeb}>
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
                                                {_.size(this.props.basicInfoEmprunteur.image) == 0 ? (
                                                    <Col md={3} mdOffset={9} >
                                                        <RaisedButton
                                                            className='pull-right'
                                                          containerElement='label'
                                                          label='Ajouter'
                                                          style={styles.button}
                                                          icon={<Glyphicon glyph="upload" className='glyphUpload'/>}>
                                                            <input type="file" style={styles.exampleImageInput} accept='.jpg,.png' onChange={this._addImage}/>
                                                        </RaisedButton>
                                                    </Col>) : null}
                                                {_.size(this.props.basicInfoEmprunteur.image) > 0 ? (
                                                    <Col md={6} mdOffset={6} >
                                                        <RaisedButton
                                                            className='pull-right'
                                                          containerElement='label'
                                                          label='Supprimer'
                                                          style={styles.button}
                                                          onTouchTap={this._removeImage}
                                                          icon={<Glyphicon glyph="trash" className='glyphUpload'/>}>
                                                        </RaisedButton>
                                                        <RaisedButton
                                                            className='pull-right'
                                                          containerElement='label'
                                                          label='Ajouter'
                                                          style={styles.button}
                                                          icon={<Glyphicon glyph="upload" className='glyphUpload'/>}>
                                                            <input type="file" style={styles.exampleImageInput} accept='.jpg,.png' onChange={this._addImage}/>
                                                        </RaisedButton>
                                                    </Col>) : null}

                                            </Row>
                                            <Row className="gallery show-grid">
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
                            onClick={ this._handleSaveEmprunteurBasicInfo }>
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

ProfileTabBasicEmprunteur.contextTypes = {
    client: React.PropTypes.object.isRequired,
    basicInfoEmprunteur: React.PropTypes.object.isRequired,
    handleSaveEmprunteurBasicInfo: React.PropTypes.func.isRequired
};

export default ProfileTabBasicEmprunteur ;
