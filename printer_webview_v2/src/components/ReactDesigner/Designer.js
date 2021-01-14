import React, { Component } from 'react';
import _ from 'lodash';
import { HotKeys } from 'react-hotkeys';

import InsertMenu from './panels/InsertMenu';
import PanelList from './panels/PanelList';
import SVGRenderer from './SVGRenderer';
import Handler from './Handler';
import { MODES } from './constants';
import * as actions from './actions';
import { Text, Path, Rect, Circle, Image, Qrcode, Barcode } from './objects';

export default class Designer extends Component {
  static defaultProps = {
    objectTypes: {
      text: Text,
      rectangle: Rect,
      circle: Circle,
      polygon: Path,
      image: Image,
      qrcode: Qrcode,
      barcode: Barcode,
    },
    snapToGrid: 1,
  };

  state = {
    mode: MODES.FREE,
    handler: {
      top: 200,
      left: 200,
      width: 50,
      height: 50,
      rotate: 0,
    },
    currentObjectIndex: null,
    selectedObjectIndex: null,
    selectedTool: null,
  };

  keyMap = {
    removeObject: ['del', 'backspace'],
    moveLeft: ['left', 'shift+left'],
    moveRight: ['right', 'shift+right'],
    moveUp: ['up', 'shift+up'],
    moveDown: ['down', 'shift+down'],
    closePath: ['enter'],
  };

  componentDidMount() {
    this.objectRefs = {};
  }

  showHandler(index) {
    const { mode } = this.state;
    const { objects } = this.props;
    const object = objects[index];

    if (mode !== MODES.FREE) {
      return;
    }

    this.updateHandler(index, object);
    this.setState({
      currentObjectIndex: index,
      showHandler: true,
    });
  }

  hideHandler() {
    const { mode } = this.state;
    if (mode === MODES.FREE) {
      this.setState({
        showHandler: false,
      });
    }
  }

  getStartPointBundle(event, object) {
    const { currentObjectIndex } = this.state;
    const { objects } = this.props;
    const mouse = this.getMouseCoords(event);
    object = object || objects[currentObjectIndex];
    return {
      clientX: mouse.x,
      clientY: mouse.y,
      objectX: object.x,
      objectY: object.y,
      width: object.width,
      height: object.height,
      rotate: object.rotate,
    };
  }

  startDrag(mode, event) {
    const { currentObjectIndex } = this.state;
    this.setState({
      mode: mode,
      startPoint: this.getStartPointBundle(event),
      selectedObjectIndex: currentObjectIndex,
    });
  }

  resetSelection() {
    this.setState({
      selectedObjectIndex: null,
    });
  }

  generateUUID() {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now(); //use high-precision timer if available
    }
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      },
    );
    return uuid;
  }

  newObject(event) {
    const { mode, selectedTool } = this.state;

    this.resetSelection(event);

    if (mode !== MODES.DRAW) {
      return;
    }

    const { meta } = this.getObjectComponent(selectedTool);
    const mouse = this.getMouseCoords(event);

    const { objects, onUpdate } = this.props;
    const object = {
      ...meta.initial,
      type: selectedTool,
      x: mouse.x,
      y: mouse.y,
      uuid: this.generateUUID(),
    };

    onUpdate([...objects, object]);

    this.setState({
      currentObjectIndex: objects.length,
      selectedObjectIndex: objects.length,
      startPoint: this.getStartPointBundle(event, object),
      mode: meta.editor ? MODES.EDIT_OBJECT : MODES.SCALE,
      selectedTool: null,
    });
  }

  updatePath(object) {
    const { path } = object;
    const diffX = object.x - object.moveX;
    const diffY = object.y - object.moveY;

    const newPath = path.map(({ x1, y1, x2, y2, x, y }) => ({
      x1: diffX + x1,
      y1: diffY + y1,
      x2: diffX + x2,
      y2: diffY + y2,
      x: diffX + x,
      y: diffY + y,
    }));

    return {
      ...object,
      path: newPath,
      moveX: object.x,
      moveY: object.y,
    };
  }

  updateObject(objectIndex, changes, updatePath) {
    const { objects, onUpdate } = this.props;
    onUpdate(
      objects.map((object, index) => {
        if (index === objectIndex) {
          const newObject = {
            ...object,
            ...changes,
          };

          return updatePath ? this.updatePath(newObject) : newObject;
        } else {
          return object;
        }
      }),
    );
  }

  getOffset() {
    const parent = this.svgElement.getBoundingClientRect();
    const { width, height } = this.props;
    return {
      x: parent.left,
      y: parent.top,
      width: width,
      height: height,
    };
  }

  applyOffset(bundle) {
    const offset = this.getOffset();
    return {
      ...bundle,
      x: bundle.x - offset.x,
      y: bundle.y - offset.y,
    };
  }

  updateHandler(index, object) {
    const target = this.objectRefs[index];
    const bbox = target.getBoundingClientRect();

    let handler = {
      ...this.state.handler,
      width: object.width || bbox.width,
      height: object.height || bbox.height,
      top: object.y,
      left: object.x,
      rotate: object.rotate,
    };

    if (!object.width) {
      const offset = this.getOffset();
      handler = {
        ...handler,
        left: bbox.left - offset.x,
        top: bbox.top - offset.y,
      };
    }

    this.setState({
      handler: handler,
    });
  }

  getMouseCoords({ clientX, clientY }) {
    const coords = this.applyOffset({
      x: clientX,
      y: clientY,
    });

    const snapCoordinates = ({ x, y }) => {
      const { snapToGrid } = this.props;
      return {
        x: x - (x % snapToGrid),
        y: y - (y % snapToGrid),
      };
    };

    return snapCoordinates(coords);
  }

  onDrag(event) {
    const { currentObjectIndex, startPoint, mode } = this.state;
    const { objects } = this.props;
    const object = objects[currentObjectIndex];
    const mouse = this.getMouseCoords(event);

    const { scale, rotate, drag } = actions;

    const MAP = {
      [MODES.SCALE]: scale,
      [MODES.ROTATE]: rotate,
      [MODES.DRAG]: drag,
    };

    const action = MAP[mode];

    if (action) {
      const newObject = action({
        object,
        startPoint,
        mouse,
        objectIndex: currentObjectIndex,
        objectRefs: this.objectRefs,
      });

      this.updateObject(currentObjectIndex, newObject);
      this.updateHandler(currentObjectIndex, newObject);
    }

    if (currentObjectIndex !== null) {
      this.detectOverlappedObjects(event);
    }
  }

  detectOverlappedObjects(event) {
    const { currentObjectIndex } = this.state;
    const mouse = this.getMouseCoords(event);

    const refs = this.objectRefs;
    const keys = Object.keys(refs);
    const offset = this.getOffset();

    const currentRect = refs[currentObjectIndex].getBoundingClientRect();

    keys
      .filter((object, index) => index !== currentObjectIndex)
      .forEach((key) => {
        const rect = refs[key].getBoundingClientRect();
        let { left, top, width, height } = rect;

        left -= offset.x;
        top -= offset.y;

        const isOverlapped =
          mouse.x > left &&
          mouse.x < left + width &&
          mouse.y > top &&
          mouse.y < top + height &&
          currentRect.width > width &&
          currentRect.height > height;

        if (isOverlapped) {
          this.showHandler(Number(key));
        }
      });
  }

  stopDrag() {
    const { mode } = this.state;

    if (_.includes([MODES.DRAG, MODES.ROTATE, MODES.SCALE], mode)) {
      this.setState({
        mode: MODES.FREE,
      });
    }
  }

  showEditor() {
    const { selectedObjectIndex } = this.state;

    const { objects } = this.props;
    const currentObject = objects[selectedObjectIndex];
    const objectComponent = this.getObjectComponent(currentObject.type);

    if (objectComponent.meta.editor) {
      this.setState({
        mode: MODES.EDIT_OBJECT,
        showHandler: false,
      });
    }
  }

  getObjectComponent(type) {
    return this.props.objectTypes[type];
  }

  renderSVG() {
    const { width, height, background, objects, objectTypes } = this.props;

    return (
      <SVGRenderer
        background={background}
        width={width}
        height={height}
        objects={objects}
        onMouseOver={this.showHandler.bind(this)}
        objectTypes={objectTypes}
        objectRefs={this.objectRefs}
        onRender={(ref) => {
          this.svgElement = ref;
        }}
        onMouseDown={this.newObject.bind(this)}
      />
    );
  }

  selectTool(tool) {
    this.setState({
      selectedTool: tool,
      mode: MODES.DRAW,
      currentObjectIndex: null,
      showHandler: false,
      handler: null,
    });
  }

  handleObjectChange(key, value) {
    const { selectedObjectIndex } = this.state;
    this.updateObject(selectedObjectIndex, {
      [key]: value,
    });
  }

  handleArrange(arrange) {
    const { selectedObjectIndex } = this.state;
    const { objects, onUpdate } = this.props;
    const object = objects[selectedObjectIndex];

    const arrangers = {
      front: (rest, object) => [[...rest, object], rest.length],
      back: (rest, object) => [[object, ...rest], 0],
    };

    const rest = objects.filter(
      (object, index) => selectedObjectIndex !== index,
    );

    this.setState(
      {
        selectedObjectIndex: null,
      },
      () => {
        const arranger = arrangers[arrange];
        const [arranged, newIndex] = arranger(rest, object);
        onUpdate(arranged);
        this.setState({
          selectedObjectIndex: newIndex,
        });
      },
    );
  }

  removeCurrent() {
    const { selectedObjectIndex } = this.state;
    const { objects, onUpdate } = this.props;

    const rest = objects.filter(
      (object, index) => selectedObjectIndex !== index,
    );

    this.setState(
      {
        currentObjectIndex: null,
        selectedObjectIndex: null,
        showHandler: false,
        handler: null,
      },
      () => {
        this.objectRefs = {};
        onUpdate(rest);
      },
    );
  }

  moveSelectedObject(attr, points, event, key) {
    const { selectedObjectIndex } = this.state;
    const { objects } = this.props;
    const object = objects[selectedObjectIndex];

    if (key.startsWith('shift')) {
      points *= 10;
    }

    const changes = {
      ...object,
      [attr]: object[attr] + points,
    };

    this.updateObject(selectedObjectIndex, changes);
    this.updateHandler(selectedObjectIndex, changes);
  }

  getKeymapHandlers() {
    const handlers = {
      removeObject: this.removeCurrent.bind(this),
      moveLeft: this.moveSelectedObject.bind(this, 'x', -1),
      moveRight: this.moveSelectedObject.bind(this, 'x', 1),
      moveUp: this.moveSelectedObject.bind(this, 'y', -1),
      moveDown: this.moveSelectedObject.bind(this, 'y', 1),
      closePath: () => this.setState({ mode: MODES.FREE }),
    };

    return _.mapValues(handlers, (handler) => (event, key) => {
      if (event.target.tagName !== 'INPUT') {
        event.preventDefault();
        handler(event, key);
      }
    });
  }

  render() {
    const {
      showHandler,
      handler,
      mode,
      selectedObjectIndex,
      selectedTool,
    } = this.state;

    const { objects, objectTypes } = this.props;

    const currentObject = objects[selectedObjectIndex];
    const isEditMode = mode === MODES.EDIT_OBJECT;
    const showPropertyPanel = selectedObjectIndex !== null;

    const { width, height } = this.props;

    let objectComponent, objectWithInitial, ObjectEditor;
    if (currentObject) {
      objectComponent = this.getObjectComponent(currentObject.type);
      objectWithInitial = {
        ...objectComponent.meta.initial,
        ...currentObject,
      };
      ObjectEditor = objectComponent.meta.editor;
    }

    return (
      <HotKeys
        keyMap={this.keyMap}
        style={styles.keyboardManager}
        handlers={this.getKeymapHandlers()}>
        <div
          className={'container'}
          style={{
            ...styles.container,
            ...this.props.style,
            padding: 0,
          }}
          onMouseMove={this.onDrag.bind(this)}
          onMouseUp={this.stopDrag.bind(this)}>
          {/* Left Panel: Displays insertion tools (shapes, images, etc.) */}
          <InsertMenu
            tools={objectTypes}
            currentTool={selectedTool}
            onSelect={this.selectTool.bind(this)}
          />

          {/* Center Panel: Displays the preview */}
          <div style={styles.canvasContainer}>
            {isEditMode && ObjectEditor && (
              <ObjectEditor
                object={currentObject}
                offset={this.getOffset()}
                onUpdate={(object) =>
                  this.updateObject(selectedObjectIndex, object)
                }
                onClose={() => this.setState({ mode: MODES.FREE })}
                width={width}
                height={height}
              />
            )}

            {showHandler && (
              <Handler
                boundingBox={handler}
                canResize={
                  _(currentObject).has('width') ||
                  _(currentObject).has('height')
                }
                canRotate={_(currentObject).has('rotate')}
                onMouseLeave={this.hideHandler.bind(this)}
                onDoubleClick={this.showEditor.bind(this)}
                onDrag={this.startDrag.bind(this, MODES.DRAG)}
                onResize={this.startDrag.bind(this, MODES.SCALE)}
                onRotate={this.startDrag.bind(this, MODES.ROTATE)}
              />
            )}

            {this.renderSVG()}
          </div>

          {/* Right Panel: Displays text, styling and sizing tools */}
          {showPropertyPanel && (
            <PanelList
              id={this.props.id}
              object={objectWithInitial}
              onArrange={this.handleArrange.bind(this)}
              onChange={this.handleObjectChange.bind(this)}
              objectComponent={objectComponent}
            />
          )}
        </div>
      </HotKeys>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  canvasContainer: {
    position: 'relative',
  },
  keyboardManager: {
    outline: 'none',
  },
};
