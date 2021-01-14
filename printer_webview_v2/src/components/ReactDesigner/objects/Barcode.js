import React from 'react';

import Icon from '../Icon';
import Vector from './Vector';

export default class BarCode extends Vector {
  static meta = {
    icon: <Icon icon={'barcode'} size={30} />,
    initial: {
      codeValue: 'www.baidu.com',
      width: 150,
      height: 50,
      img:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWwAAABrCAYAAABT7bi1AAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAH4SURBVHic7djBisIwFEDRyeD//3JcuZhASVsU58I5Oyu+BBsupWPOOX8A+Pd+v70BAM4RbICIx3phjPHn8+uNyev6+gbl6Ppu7mo3d7d+be5uvbP7+dT9uTp3t/+j9T69r6vr313vyLvO37vOw+rqfdzNPft/7Nbd/e7q3LvnbP3+6nm/u9+juZ6wASIEGyBCsAEiBBsgQrABIgQbIEKwASIEGyBCsAEiBBsgQrABIgQbIEKwASIEGyBCsAEiBBsgQrABIgQbIEKwASIEGyBCsAEiBBsgQrABIgQbIEKwASIEGyBCsAEiBBsgQrABIgQbIEKwASIEGyBCsAEiBBsgQrABIgQbIEKwASIEGyBCsAEiBBsgQrABIgQbIEKwASIEGyBCsAEiBBsgQrABIgQbIEKwASIEGyBCsAEiBBsgQrABIgQbIEKwASIEGyBCsAEiBBsgQrABIgQbIEKwASIEGyBCsAEiBBsgQrABIgQbIEKwASIEGyBCsAEiBBsgQrABIgQbIEKwASIEGyBCsAEiBBsgQrABIgQbIEKwASIEGyBCsAEiBBsgQrABIgQbIEKwASIEGyBCsAEiBBsgQrABIgQbIEKwASIEGyBCsAEiBBsgQrABIgQbIEKwASIEGyBCsAEixpxzfnsTAOx5wgaIEGyACMEGiHgCw3Cbz3KXNUAAAAAASUVORK5CYII=',
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
