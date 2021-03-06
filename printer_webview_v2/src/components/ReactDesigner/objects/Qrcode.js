import React from 'react';

import Icon from '../Icon';
import Vector from './Vector';

export default class Qrcode extends Vector {
  static meta = {
    icon: <Icon icon={'qrcode'} size={30} />,
    initial: {
      codeValue: 'www.baidu.com',
      width: 100,
      height: 100,
      img:
        'data:image/png;base64,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',
    },
  };

  render() {
    const { object } = this.props;
    return (
      <image
        {...this.getObjectAttributes()}
        xlinkHref={object.img}
        width={object.width}
        height={object.height}
      />
    );
  }
}
