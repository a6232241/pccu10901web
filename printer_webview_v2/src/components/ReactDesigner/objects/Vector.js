import { Component } from 'react';

import {
  SizePanel,
  TextPanel,
  StylePanel,
  ArrangePanel,
  ImagePanel,
  CodeValuePanel,
} from '../panels';

export default class Vector extends Component {
  static panels = [
    SizePanel,
    TextPanel,
    CodeValuePanel,
    StylePanel,
    ImagePanel,
    ArrangePanel,
  ];

  getStyle() {
    return {
      mixBlendMode: this.props.object.blendMode,
    };
  }

  getTransformMatrix({ rotate, x, y, width, height }) {
    if (rotate) {
      const centerX = width / 2 + x;
      const centerY = height / 2 + y;
      return `rotate(${rotate} ${centerX} ${centerY})`;
    }
  }

  getObjectAttributes() {
    const { object, onRender, ...rest } = this.props;
    return {
      ...object,
      transform: this.getTransformMatrix(object),
      ref: onRender,
      ...rest,
    };
  }
}
