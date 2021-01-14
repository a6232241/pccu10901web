import React from 'react';
import WebFont from 'webfontloader';

import Vector from './Vector';
import Icon from '../Icon';

export default class Text extends Vector {
  static meta = {
    icon: <Icon icon={'text'} size={30} />,
    initial: {
      text: 'Type some text...',
      rotate: 0,
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      fill: 'black',
      fontSize: 20,
      fontFamily: 'Open Sans',
    },
  };

  getStyle() {
    const { object } = this.props;
    return {
      ...super.getStyle(),
      dominantBaseline: 'central',
      fontWeight: object.fontWeight,
      fontStyle: object.fontStyle,
      textDecoration: object.textDecoration,
      mixBlendMode: object.blendMode,
      WebkitUserSelect: 'none',
    };
  }

  getTransformMatrix({ rotate, x, y }) {
    return `rotate(${rotate} ${x} ${y})`;
  }

  render() {
    const { object } = this.props;
    WebFont.load({
      google: {
        families: [object.fontFamily],
      },
    });
    const { rotate, ...restOfAttributes } = this.getObjectAttributes();
    return (
      <text
        style={this.getStyle()}
        textAnchor="right"
        fontFamily={object.fontFamily}
        fontSize={object.fontSize}
        {...restOfAttributes}>
        {object.text}
      </text>
    );
  }
}
