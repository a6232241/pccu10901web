import React, { Component } from 'react';

export default class Icon extends Component {
  static defaultProps = {
    size: 16,
  };

  renderGraphic() {
    switch (this.props.icon) {
      case 'image':
        return (
          <g>
            <path d="M21 19v-14c0-1.1-.9-2-2-2h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-12.5-5.5l2.5 3.01 3.5-4.51 4.5 6h-14l3.5-4.5z"></path>
          </g>
        );
      case 'my-icon':
        return (
          <g>
            <path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
          </g>
        );
      case 'another-icon':
        return (
          <g>
            <path d="M7.41 15.41l4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6z" />
          </g>
        );
      case 'format-bold':
        return (
          <g>
            <path
              d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4h-6.25v14h7.04c2.09
          0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zm-5.6-4.29h3c.83 0 1.5.67 1.5 1.5s-.67
          1.5-1.5 1.5h-3v-3zm3.5 9h-3.5v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"></path>
          </g>
        );
      case 'format-italic':
        return (
          <g>
            <path d="M10 4v3h2.21l-3.42 8h-2.79v3h8v-3h-2.21l3.42-8h2.79v-3z"></path>
          </g>
        );
      case 'format-underline':
        return (
          <g>
            <path
              d="M12 17c3.31 0 6-2.69 6-6v-8h-2.5v8c0 1.93-1.57 3.5-3.5
          3.5s-3.5-1.57-3.5-3.5v-8h-2.5v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2h-14z"></path>
          </g>
        );
      case 'format-align-left':
        return (
          <g>
            <path
              d="M15 15h-12v2h12v-2zm0-8h-12v2h12v-2zm-12
          6h18v-2h-18v2zm0 8h18v-2h-18v2zm0-18v2h18v-2h-18z"></path>
          </g>
        );
      case 'format-align-center':
        return (
          <g>
            <path d="M7 15v2h10v-2h-10zm-4 6h18v-2h-18v2zm0-8h18v-2h-18v2zm4-6v2h10v-2h-10zm-4-4v2h18v-2h-18z"></path>
          </g>
        );
      case 'format-align-right':
        return (
          <g>
            <path d="M3 21h18v-2h-18v2zm6-4h12v-2h-12v2zm-6-4h18v-2h-18v2zm6-4h12v-2h-12v2zm-6-6v2h18v-2h-18z"></path>
          </g>
        );
      case 'add-box':
        return (
          <g>
            <path
              d="M19 3h-14c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm-2
          10h-4v4h-2v-4h-4v-2h4v-4h2v4h4v2z"></path>
          </g>
        );
      case 'add':
        return (
          <g>
            <path d="M19 13h-6v6h-2v-6h-6v-2h6v-6h2v6h6v2z"></path>
          </g>
        );
      case 'text-format':
        return (
          <g>
            <path
              d="M5 17v2h14v-2h-14zm4.5-4.2h5l.9 2.2h2.1l-4.75-11h-1.5l-4.75
          11h2.1l.9-2.2zm2.5-6.82l1.87 5.02h-3.74l1.87-5.02z"></path>
          </g>
        );
      case 'text':
        return (
          <g>
            <path
              d="M5 17v2h14v-2h-14zm4.5-4.2h5l.9 2.2h2.1l-4.75-11h-1.5l-4.75
           11h2.1l.9-2.2zm2.5-6.82l1.87 5.02h-3.74l1.87-5.02z"></path>
          </g>
        );
      case 'rectangle':
        return <rect width={14} height={14} x={4} y={5} rx={3} ry={3} />;
      case 'circle':
        return <circle r={8} cx={11} cy={12} />;
      case 'polygon':
        return (
          <g transform={'scale(0.034) translate(100 25)'}>
            <path
              d="M477.043,219.205L378.575,48.677c-7.974-13.802-22.683-22.292-38.607-22.292H143.041c-15.923,
                    0-30.628,8.49-38.608,22.292 L5.971,219.205c-7.961,13.801-7.961,30.785,0,44.588l98.462,
                    170.543c7.98,13.802,22.685,22.293,38.608,22.293h196.926 c15.925,0,30.634-8.491,
                    38.607-22.293l98.469-170.543C485.003,249.99,485.003,233.006,477.043,219.205z"
            />
          </g>
        );
      case 'rotate':
        return (
          <g>
            <path
              d="M18.4 10.6c-1.85-1.61-4.25-2.6-6.9-2.6-4.65 0-8.58 3.03-9.96
           7.22l2.36.78c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88l-3.62
           3.62h9v-9l-3.6 3.6z"></path>
          </g>
        );
      case 'send-to-back':
        return (
          <g>
            <rect
              x={7}
              y={7}
              width={13}
              height={13}
              fill="#ababab"
              strokeWidth={1}
              stroke="black"
            />
            <rect
              x={1}
              y={1}
              width={13}
              height={13}
              fill="white"
              stroke="black"
              strokeWidth={1}
            />
          </g>
        );
      case 'bring-to-front':
        return (
          <g>
            <rect
              x={7}
              y={7}
              width={13}
              height={13}
              fill="white"
              strokeWidth={1}
              stroke="black"
            />
            <rect
              x={1}
              y={1}
              width={13}
              height={13}
              fill="#ababab"
              stroke="black"
              strokeWidth={1}
            />
          </g>
        );
      case 'qrcode':
        return (
          <svg viewBox="0 0 512 512">
            <path d="m488 16h-48a8 8 0 0 0 0 16h40v40a8 8 0 0 0 16 0v-48a8 8 0 0 0 -8-8z" />
            <path d="m24 80a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 0-16h-48a8 8 0 0 0 -8 8v48a8 8 0 0 0 8 8z" />
            <path d="m488 432a8 8 0 0 0 -8 8v40h-40a8 8 0 0 0 0 16h48a8 8 0 0 0 8-8v-48a8 8 0 0 0 -8-8z" />
            <path d="m24 496h48a8 8 0 0 0 0-16h-40v-40a8 8 0 0 0 -16 0v48a8 8 0 0 0 8 8z" />
            <path d="m48 56v144a8 8 0 0 0 8 8h144a8 8 0 0 0 8-8v-144a8 8 0 0 0 -8-8h-144a8 8 0 0 0 -8 8zm16 8h128v128h-128z" />
            <path d="m168 80h-80a8 8 0 0 0 -8 8v80a8 8 0 0 0 8 8h80a8 8 0 0 0 8-8v-80a8 8 0 0 0 -8-8zm-8 80h-64v-64h64z" />
            <path d="m168 336h-80a8 8 0 0 0 -8 8v80a8 8 0 0 0 8 8h80a8 8 0 0 0 8-8v-80a8 8 0 0 0 -8-8zm-8 80h-64v-64h64z" />
            <path d="m424 80h-80a8 8 0 0 0 -8 8v80a8 8 0 0 0 8 8h80a8 8 0 0 0 8-8v-80a8 8 0 0 0 -8-8zm-8 80h-64v-64h64z" />
            <path d="m312 207.5h144a8 8 0 0 0 8-8v-143.5a8 8 0 0 0 -8-8h-144a8 8 0 0 0 -8 8v143.5a8 8 0 0 0 8 8zm8-143.5h128v127.5h-128z" />
            <path d="m48 456a8 8 0 0 0 8 8h144a8 8 0 0 0 8-8v-144a8 8 0 0 0 -8-8h-144a8 8 0 0 0 -8 8zm16-136h128v128h-128z" />
            <path d="m232 112a8 8 0 0 0 8-8v-40h8a8 8 0 0 0 0-16h-16a8 8 0 0 0 -8 8v48a8 8 0 0 0 8 8z" />
            <circle cx="280" cy="56" r="8" />
            <path d="m264 112h16a8 8 0 0 0 8-8v-16a8 8 0 0 0 -16 0v8h-8a8 8 0 0 0 0 16z" />
            <path d="m280 136h-16a8 8 0 0 0 -8 8v32a8 8 0 0 0 16 0v-24h8a8 8 0 0 0 0-16z" />
            <path d="m232 208h48a8 8 0 0 0 0-16h-40v-56a8 8 0 0 0 -16 0v64a8 8 0 0 0 8 8z" />
            <path d="m296 400a8 8 0 0 0 -8 8v40h-24a8 8 0 0 0 0 16h32a8 8 0 0 0 8-8v-48a8 8 0 0 0 -8-8z" />
            <circle cx="232" cy="456" r="8" />
            <path d="m232 432a8 8 0 0 0 8-8v-8h24a8 8 0 0 0 0-16h-32a8 8 0 0 0 -8 8v16a8 8 0 0 0 8 8z" />
            <path d="m232 320a8 8 0 0 0 8-8v-40h16a8 8 0 0 0 0-16h-24a8 8 0 0 0 -8 8v48a8 8 0 0 0 8 8z" />
            <path d="m232 240h48v40a8 8 0 0 0 16 0v-48a8 8 0 0 0 -8-8h-56a8 8 0 0 0 0 16z" />
            <path d="m48 280a8 8 0 0 0 8 8h48a8 8 0 0 0 0-16h-40v-8a8 8 0 0 0 -16 0z" />
            <path d="m88 256a8 8 0 0 0 8-8v-16a8 8 0 0 0 -8-8h-32a8 8 0 0 0 0 16h24v8a8 8 0 0 0 8 8z" />
            <path d="m120 224a8 8 0 0 0 -8 8v16a8 8 0 0 0 8 8h48a8 8 0 0 0 0-16h-40v-8a8 8 0 0 0 -8-8z" />
            <path d="m208 232a8 8 0 0 0 -16 0v40h-56a8 8 0 0 0 0 16h64a8 8 0 0 0 8-8z" />
            <path d="m464 232a8 8 0 0 0 -8-8h-48a8 8 0 0 0 0 16h40v8a8 8 0 0 0 16 0z" />
            <circle cx="320" cy="312" r="8" />
            <path d="m432 280v-16a8 8 0 0 0 -16 0v8h-32a8 8 0 0 0 0 16h40a8 8 0 0 0 8-8z" />
            <path d="m424 368h-32a8 8 0 0 0 0 16h24v8a8 8 0 0 0 16 0v-16a8 8 0 0 0 -8-8z" />
            <circle cx="424" cy="424" r="8" />
            <circle cx="360" cy="376" r="8" />
            <path d="m392 416h-24v-8a8 8 0 0 0 -16 0v16a8 8 0 0 0 8 8h32a8 8 0 0 0 0-16z" />
            <path d="m352 256a8 8 0 0 0 -8 8v48a8 8 0 0 0 8 8h39a8 8 0 0 0 0-16h-31v-40a8 8 0 0 0 -8-8z" />
            <path d="m376 224h-56a8 8 0 0 0 -8 8v48a8 8 0 0 0 16 0v-40h48a8 8 0 0 0 0-16z" />
            <path d="m232 384h64a8 8 0 0 0 8-8v-32a8 8 0 0 0 -8-8h-64a8 8 0 0 0 -8 8v32a8 8 0 0 0 8 8zm8-32h48v16h-48z" />
            <path d="m328 464h128a8 8 0 0 0 8-8v-112a8 8 0 0 0 -8-8h-128a8 8 0 0 0 -8 8v112a8 8 0 0 0 8 8zm8-112h112v96h-112z" />
            <path d="m288 304h-15a8 8 0 0 0 0 16h15a8 8 0 0 0 0-16z" />
            <path d="m464 280a8 8 0 0 0 -16 0v24h-24a8 8 0 0 0 0 16h32a8 8 0 0 0 8-8z" />
          </svg>
        );
      case 'barcode':
        return (
          <svg viewBox="0 0 512 512">
            <rect x="42.667" y="102.4" width="17.067" height="281.6" />
            <rect x="85.333" y="102.4" width="25.6" height="238.933" />
            <rect x="136.533" y="102.4" width="17.067" height="238.933" />
            <rect x="170.667" y="102.4" width="25.6" height="238.933" />
            <rect x="213.333" y="102.4" width="17.067" height="238.933" />
            <path d="M8.533,51.2C3.413,51.2,0,54.613,0,59.733V102.4h17.067V68.267H51.2V51.2H8.533z" />
            <rect x="247.467" y="102.4" width="17.067" height="281.6" />
            <rect x="324.267" y="102.4" width="25.6" height="238.933" />
            <rect x="375.467" y="102.4" width="17.067" height="238.933" />
            <rect x="409.6" y="102.4" width="25.6" height="238.933" />
            <rect x="452.267" y="102.4" width="17.067" height="281.6" />
            <path d="M17.067,443.733V409.6H0v42.667c0,5.12,3.413,8.533,8.533,8.533H51.2v-17.067H17.067z" />
            <path d="M494.933,409.6v34.133H460.8V460.8h42.667c5.12,0,8.533-3.413,8.533-8.533V409.6H494.933z" />
            <path d="M503.467,51.2H460.8v17.067h34.133V102.4H512V59.733C512,54.613,508.587,51.2,503.467,51.2z" />
            <rect x="76.8" y="358.4" width="17.067" height="25.6" />
            <rect x="110.933" y="358.4" width="17.067" height="25.6" />
            <rect x="145.067" y="358.4" width="17.067" height="25.6" />
            <rect x="179.2" y="358.4" width="17.067" height="25.6" />
            <rect x="213.333" y="358.4" width="17.067" height="25.6" />
            <rect x="281.6" y="358.4" width="17.067" height="25.6" />
            <rect x="315.733" y="358.4" width="17.067" height="25.6" />
            <rect x="349.867" y="358.4" width="17.067" height="25.6" />
            <rect x="384" y="358.4" width="17.067" height="25.6" />
            <rect x="418.133" y="358.4" width="17.067" height="25.6" />
            <rect x="290.133" y="102.4" width="17.067" height="238.933" />
          </svg>
        );
      default:
        return null;
    }
  }
  render() {
    const styles = {
      fill: this.props.active ? 'black' : '#b5b5b5',
      verticalAlign: 'middle',
      width: this.props.size,
      height: this.props.size,
    };
    return (
      <svg
        viewBox="0 0 24 24"
        onClick={this.props.onClick}
        preserveAspectRatio="xMidYMid meet"
        style={{ ...styles, ...this.props.style }}>
        {this.renderGraphic()}
      </svg>
    );
  }
}
