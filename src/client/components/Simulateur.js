import React, { Component } from 'react';
import { Grid, Form, Row, Col, FormControl, FormGroup, ControlLabel, Button, HelpBlock , Table, Label} from 'react-bootstrap';
// import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import ProvideStore from '../stores/ProvideStore';
import ProvideActions from '../actions/ProvideActions';
var DatePicker = require("react-bootstrap-date-picker");
import { getBelgiumDate } from '../../common/Utility';
import Validator from '../../validator/validatorEmprunteurBasic';

export default class Simulateur extends Component {
  constructor (props){
    super(props);
    this.state = ProvideStore.stateSimulateur;

    this._onChange = this._onChange.bind(this);
    this._handleSimulateClick = this._handleSimulateClick.bind(this);

    // this.state = {
    //    completed: 0,
    //  };
  }

  _onChange() {
      this.setState(ProvideStore.stateSimulateur);
  }
  _handleSimulateClick() {
    ProvideActions.simulate(this.state.simulateur);
    // This probably where you would have an `ajax` call
    // setTimeout(() => {
    //   // Completed of async action, set loading state back
      this.setState({simulateur: {isLoading : true}});
    // }, 2000);
  }


  componentDidMount() {
    ProvideStore.addChangeListener(this._onChange);

    //  this.timer = setTimeout(() => this.progress(5), 10);
   }

   componentWillUnmount() {
    //  clearTimeout(this.timer);
     ProvideStore.removeChangeListener(this._onChange);

   }
   //
  //  progress(completed) {
  //    if (completed > 100) {
  //      this.setState({completed: 100});
  //    } else {
  //      this.setState({completed});
  //      const diff = Math.random() * 10;
  //      this.timer = setTimeout(() => this.progress(completed + diff), 100);
  //    }
  //  }

  render () {
    // let resultProgress;
    // if (_.isNil(this.state) || this.state.completed < 100) {
    //   resultProgress = (<CircularProgress
    //     mode="determinate"
    //     value={this.state.completed}
    //     size={80}
    //   />
    //   );
    // } else {
    //   resultProgress = (<FormControl.Static>
    //     100
    //   </FormControl.Static>);
    // }
    const validateDate = !_.isNil(this.state.simulateur.datePret) && !_.isEmpty(this.state.simulateur.datePret) ? "success" : "error";

    const validatePret = Validator.validatePretSouhaite(this.state.simulateur.pret) ? "success" : "error";
    const validateYear = Validator.validateYearSouhaite(this.state.simulateur.year) ? "success" : "error";
    const validatetaux = Validator.validateTauxInteret(this.state.simulateur.taux) ? "success" : "error";
    const isLoading = this.state.simulateur.isLoading;

    const minTaux = Validator.TAUX_MINIMUM;
    const maxTaux = Validator.TAUX_MAXIMUM;

    let disableCalculate = true;

    if (_.isEqual(validateDate, 'success') && _.isEqual(validatePret, 'success') && _.isEqual(validateYear, 'success')
     && _.isEqual(validatetaux, 'success')) {
         disableCalculate = false;

     }

     // By default only with tooltip
     const buttonCalculate = (
             <Button
                 bsStyle='primary'
                 disabled={ disableCalculate }
                 onClick={!disableCalculate ? this._handleSimulateClick : null}>
                 Calculer
             </Button>
     );

    return (
      <Grid fluid>
        <Row className='section section-padding'>
          <div className="section-title text-center">
            <h2>Simulateur </h2>
            <div></div>
          </div>
          <div>
            <Row>
              <Col md={7} sm={12} xs={12} mdOffset={3} className='text-center' >
                <Form horizontal>
                    <FormGroup controlId="formHorizontalNaissance" validationState={validateDate}>
                      <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                        Date du prêt
                      </Col>
                      <Col sm={12} md={8}>
                          <DatePicker id="example-datepicker" dateFormat='DD/MM/YYYY' value={this.state.simulateur.datePret}
                              dayLabels={['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']}
                              monthLabels={['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre']}
                              onChange={ (value, formattedValue) => ProvideActions.updateSimulateur({datePret: value}) } />
                      </Col>
                    </FormGroup>
                  <FormGroup controlId="formHorizontalPret" validationState={validatePret}>
                    <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                      Montant du prêt
                    </Col>
                    <Col sm={8}>
                      <FormControl type="number" placeholder="Entrez votre somme d'argent(pret)"
                          onChange={e => ProvideActions.updateSimulateur({pret: parseInt(e.target.value)})}
                           value={this.state.simulateur.pret}/>
                       <HelpBlock>Max 50.000€ par prêteur, max 100.000€ par emprunteur</HelpBlock>
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalDuree" validationState={validateYear}>
                    <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                      Durée du prêt
                    </Col>
                    <Col sm={8}>
                        <FormControl componentClass="select" placeholder="Entrez la durée souhaitée (année)"
                             onChange={e => ProvideActions.updateSimulateur({year: e.target.value})}
                             value={this.state.simulateur.year} >
                            <option value="select">selectionnez</option>
                            <option value="4">4</option>
                            <option value="6">6</option>
                            <option value="8">8</option>
                          </FormControl>
                          <HelpBlock>Le temps du prêt est de 4, 6 ou 8 ans.</HelpBlock>
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalPret" validationState={validatetaux}>
                    <Col componentClass={ControlLabel} md={2} smHidden xsHidden>
                      Taux
                    </Col>
                    <Col sm={8}>
                      <FormControl type="number" placeholder="Entrez le taux du prêt"
                          onChange={e => ProvideActions.updateSimulateur({taux: parseFloat(e.target.value)})}
                          value={this.state.simulateur.taux} min={minTaux} max={maxTaux} step="0.001"/>
                      <HelpBlock>Le taux est de minimum 1,125% et maximum 2,25%.</HelpBlock>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col smOffset={8} sm={2}>
                        { buttonCalculate }
                    </Col>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </div>

          { this.simulateurResult }
        </Row>
      </Grid>

    );
  }

  get simulateurResult() {

      if ( !_.isNil(this.state.simulateurResult) && !_.isEmpty(this.state.simulateurResult) ){
          return (
              <div>
                  <Row>
                      <Grid>
                          <Row className="margin-bottom-16">
                              <Col md={3} sm={5} xs={5} mdOffset={3}>
                                  <h5>Rendement Global</h5>
                              </Col>
                              <Col md={4} sm={4} xs={3}>
                                  <h3 className='simulatorRendement'><Label className='bgm-pumpkin'>{ this.state.simulateurResult.rendementGlobal.toFixed(2) }€</Label></h3>
                              </Col>
                          </Row>
                          <Row>
                              <Col md={3} sm={6} xs={6} mdOffset={3}>
                                  <h6>Rendement Annuel Moyen € </h6>
                              </Col>
                              <Col md={4} sm={3} xs={3}>
                                  <h4 className='simulatorRendement'><Label>{ this.state.simulateurResult.rendementAnnuelMoyenEuro.toFixed(2)}€</Label></h4>
                              </Col>
                          </Row>
                          <Row className="margin-bottom-16">
                              <Col md={3} sm={6} xs={6} mdOffset={3}>
                                  <h6>Rendement Annuel Moyen %</h6>
                              </Col>
                              <Col md={4} sm={3} xs={3}>
                                  <h4 className='simulatorRendement'><Label>{ this.state.simulateurResult.rendementAnnuelMoyenPercent.toFixed(2)}€</Label></h4>
                              </Col>
                          </Row>
                      </Grid>
                  </Row>
                  <Row>
                      <Col md={7} sm={12} xs={12} mdOffset={3}>
                          <Table responsive>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Année</th>
                                <th>Taux</th>
                                <th  className='widthSimulateur'>Crédit d'impôt</th>
                                <th>Calendrier</th>
                                <th>Intérêts</th>
                              </tr>
                            </thead>
                            <tbody>
                                { this.result }
                            </tbody>
                          </Table>
                      </Col>
                  </Row>
                  <Row>
                      <Col md={7} sm={12} xs={12} mdOffset={3}  >
                          <p>Total Crédit d'impôt: {this.state.simulateurResult.totalCreditImpot.toFixed(2)}€</p>
                          <p>Total intérêt: {this.state.simulateurResult.totalInteret.toFixed(2)}€</p>
                      </Col>
                  </Row>
                  <Row>
                      <Col md={7} sm={12} xs={12} mdOffset={3}>
                          <h5><u>En Résumé</u></h5>
                          <p>Calcul de l'avantage d'un prêt Coup de pouce de <strong>{this.state.simulateur.pret.toFixed(2)}€</strong> en <strong>{this.state.simulateur.year} ans</strong> versé le <strong> {getBelgiumDate(this.state.simulateur.datePret)}</strong> au taux annuel de <strong>{this.state.simulateur.taux.toFixed(2)}%</strong> avec un crédit d’impôts de 4% du montant moyen prêté les 4 premières années et de 2,5% les éventuelles années qui suivent</p>
                          <p>Selon les caractéristiques mentionnées ci-dessus, votre avantage total (intérêts perçus et crédit d’impôt) serait de <strong>{ this.state.simulateurResult.rendementGlobal.toFixed(2) } €</strong> en vous inscrivant dans la mesure prêt Coup de Pouce.</p>
                          <p>A noter que ce montant est net, c’est-à-dire que le précompte mobilier dû sur les intérêts perçus à déjà été déduit. En effet, l’emprunteur a l’obligation légale de déduire du montant des intérêts versé au prêteur le précompte mobilier dû sur ceux-ci afin de verser cette somme directement au SPF-Finances.</p>
                      </Col>
                  </Row>
              </div>
      )
      }

      return null;
  }

    get result() {
        const result = _.map(this.state.simulateurResult.simulateurResultListInfo, result => {
            return (
                <tr key={result.index}>
                  <td>{result.index}</td>
                  <td>{result.year}</td>
                  <td>{result.taux.toFixed(2)}%</td>
                  <td>{result.creditImpot.toFixed(2)}€</td>
                  <td>{result.calendrier}</td>
                  <td>{result.interetCash.toFixed(2)}€</td>
                </tr>
            );
        });

        return result;
    }
}
