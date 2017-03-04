import React, { Component } from 'react';
import _ from 'lodash';
import { Badge } from 'react-bootstrap';


export default class StatusContract extends Component{
  constructor(props) {
    super(props);
  }

  render() {
      const status = this.props.rowData.status;
      let style = '';
      // Pas encore payé
      if( _.isEqual(status, 'START') ) {
          style='badge-warning';
      } else if ( _.isEqual(status, 'PAIEMENT RECU') ) {
          style='badge-info';
      } else if ( _.isEqual(status, 'CONTRAT ENVOYE') ) {
          style='badge-success';
      }

    return (
        <Badge className={style}>{status}</Badge>
    );
  }
}
