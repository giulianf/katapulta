import React, { Component } from 'react';

import { ProgressBar } from 'react-bootstrap';

export default class ProgressBarContract extends Component{
  constructor(props) {
    super(props);
  }

  render() {
      const progress = this.props.rowData.progress;

      let style='warning';
      if ( progress == 100 ) {
          style = 'success';
      } else if (progress > 20) {
          style='info';
      }
    return (
        <ProgressBar bsStyle={style} now={progress} label={`${progress}%`}/>
    );
  }
}
