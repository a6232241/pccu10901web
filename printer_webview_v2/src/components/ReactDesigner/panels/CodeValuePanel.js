import React, { Component } from 'react';
import _ from 'lodash';

import styles from './styles';
import PropertyGroup from './PropertyGroup';

export default class CodeValuePanel extends Component {
  render() {
    const { object, onChange } = this.props;
    return (
      <PropertyGroup showIf={_.has(object, 'codeValue')}>
        <div style={{ ...styles.row, paddingTop: 10, paddingRight: 10 }}>
          <div style={styles.inputHelper}>Code Value</div>
          <input
            style={{ ...styles.input, ...styles.textInput }}
            onChange={(e) => onChange('codeValue', e.target.value)}
            value={object.codeValue}
          />
        </div>
      </PropertyGroup>
    );
  }
}
