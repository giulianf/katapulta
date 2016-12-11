import React, { Component } from 'react';
import { Grid, Form, Row, Col, FormControl, FormGroup, ControlLabel, Button, Glyphicon } from 'react-bootstrap';
// import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import ProvideActions from '../../../actions/ProvideActions';
import RaisedButton from 'material-ui/RaisedButton';
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
                          Société
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Société"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({societe: e.target.value})}  value={this.props.basicInfoEmprunteur.societe}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontaldesc" validationState={validateTva}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Description
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="Descriptition de la société"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({description: e.target.value})}  value={this.props.basicInfoEmprunteur.description}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontaltva" validationState={validateTva}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          TVA
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="text" placeholder="TVA"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({tva: e.target.value})}  value={this.props.basicInfoEmprunteur.tva}/>
                        </Col>
                      </FormGroup>
                      <FormGroup controlId="formHorizontalChiffre" validationState={validateChiffre}>
                        <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                          Chiffre d'Affaire
                        </Col>
                        <Col sm={12} md={8}>
                          <FormControl type="number" placeholder="Chiffre d'Affaire"
                              onChange={e => ProvideActions.updateBasicInfoEmprunteur({chiffreAffaire: e.target.value})}  value={this.props.basicInfoEmprunteur.chiffreAffaire}/>
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
