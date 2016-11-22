import React, { Component } from 'react';
import { Grid, Form, Row, Col, PageHeader, FormControl, FormGroup, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
// import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import SimulateurStore from '../stores/SimulateurStore';
import SimulateurActions from '../actions/SimulateurActions';

export default class Profile extends Component {
  constructor (props){
    super(props);

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
    SimulateurActions.simulate(this.state);
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

    return (
      <Grid fluid>
        <Row className='section section-padding'>
          <div className="section-title text-center">
            <h2>Account </h2>
            <div></div>
          </div>

        </Row>
      </Grid>

    );
  }
}
