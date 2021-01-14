import React, { Component } from 'react';

import styles from './styles';

export default class PanelList extends Component {
  render() {
    const { objectComponent, id } = this.props;

    return (
      <div style={{ ...styles.propertyPanel }}>
        {objectComponent.panels.map((Panel, i) => (
          <Panel key={i} id={id} {...this.props} />
        ))}
      </div>
    );
  }
}
