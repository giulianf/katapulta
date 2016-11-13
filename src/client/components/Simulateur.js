import React, { Component } from 'react';
import { Grid, Form, Row, Col, PageHeader, FormControl, FormGroup, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
// import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import SimulateurStore from '../stores/SimulateurStore';
import SimulateurActions from '../actions/SimulateurActions';

export default class Simulateur extends Component {
  constructor (props){
    super(props);
    this.state = SimulateurStore.state;

    this._onChange = this._onChange.bind(this);
    this._handleSimulateClick = this._handleSimulateClick.bind(this);

    // this.state = {
    //    completed: 0,
    //  };
  }

  _onChange() {
      this.setState(SimulateurStore.state);
  }
  _handleSimulateClick() {
    // Call action and set the isLoading in store to false
    // this.state.simulateur.isLoading = true;
    // this.setState(this.state.simulateur);

    SimulateurActions.simulate(this.state);
    // This probably where you would have an `ajax` call
    // setTimeout(() => {
    //   // Completed of async action, set loading state back
    //   this.setState({isLoading: false});
    // }, 2000);
  }


  componentDidMount() {
    SimulateurStore.addChangeListener(this._onChange);

    //  this.timer = setTimeout(() => this.progress(5), 10);
   }

   componentWillUnmount() {
    //  clearTimeout(this.timer);
     SimulateurStore.removeChangeListener(this._onChange);

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

    const validatePret = !_.isNil(this.state.simulateur.pret) && this.state.simulateur.pret == 100 ? "success" : "";
    const validateYear = this.state.simulateur.year < 4 ? "success" : "error";
    const isLoading = this.state.simulateur.isLoading;

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
                  <FormGroup controlId="formHorizontalPret" validationState={validatePret}>
                    <Col componentClass={ControlLabel} sm={2}>
                      Pret
                    </Col>
                    <Col sm={8}>
                      <FormControl type="number" placeholder="Entrez votre somme d'argent(pret)"  value={this.state.simulateur.pret}/>
                       <HelpBlock>La somme d'argent sera déduite directement de vos impôts.</HelpBlock>
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalDuree" validationState={validateYear}>
                    <Col componentClass={ControlLabel} sm={2}>
                      Durée
                    </Col>
                    <Col sm={8}>
                        <FormControl value={this.state.simulateur.year} componentClass="select" placeholder="Entrez la durée souhaitée (année)">
                            <option value="select">selectionnez</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </FormControl>
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalPret" validationState={validatePret}>
                    <Col componentClass={ControlLabel} sm={2}>
                      Votre gain
                    </Col>
                    <Col sm={8}>
                      <FormControl type="number" placeholder="Entrez votre somme d'argent(pret)"  value={this.state.simulateur.pret}/>
                       <HelpBlock>La somme d'argent sera déduite directement de vos impôts.</HelpBlock>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col smOffset={8} sm={2}>
                      <Button
                        disabled={isLoading}
                        onClick={!isLoading ? this._handleSimulateClick : null}>
                        {isLoading ? 'En attente...' : 'Calculer'}
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </div>
        </Row>
      </Grid>

    );
  }
}
