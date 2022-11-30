import G6 from '@antv/g6';
import merge from 'lodash/merge';
import isArray from 'lodash/isArray';
import { ItemState } from '@/common/constants';
import { GGroup, NodeModel, ModelConfig, CustomNode, Item } from '@/common/interfaces';
import { optimizeMultilineText } from '../utils';
import { setAnchorPointsState } from '../common/anchor';

const WRAPPER_BORDER_WIDTH = 2;
const WRAPPER_HORIZONTAL_PADDING = 10;

const WRAPPER_CLASS_NAME = 'node-wrapper';
const CONTENT_CLASS_NAME = 'node-content';
const LABEL_CLASS_NAME = 'node-label';

const crcFlowNode: CustomNode = {
  options: {
    size: [120, 60],
    wrapperStyle: {
      fill: '#216DD9',
      radius: 8,
    },
    contentStyle: {
      fill: '#ffffff',
      radius: 6,
    },
    labelStyle: {
      fill: '#000000',
      textAlign: 'center',
      textBaseline: 'middle',
    },
    stateStyles: {
      [ItemState.Active]: {
        wrapperStyle: {},
        contentStyle: {},
        labelStyle: {},
      } as any,
      [ItemState.Selected]: {
        wrapperStyle: {},
        contentStyle: {},
        labelStyle: {},
      } as any,
    },
  },

  getOptions(cfg: NodeModel) {
    return merge({}, this.options, this.getCustomConfig ? this.getCustomConfig(cfg) : {}, cfg);
  },

  draw(cfg, group) {
    const keyShape = this.drawWrapper(cfg, group);

    this.drawContent(cfg, group);
    if (this.drawLabel && cfg && group) this.drawLabel(cfg, group);

    return keyShape;
  },

  drawWrapper(cfg: NodeModel, group: GGroup) {
    const [width, height] = this.getSize ? this.getSize(cfg) : [];
    const { wrapperStyle } = this.getOptions(cfg);

    const shape = group.addShape('rect', {
      className: WRAPPER_CLASS_NAME,
      draggable: true,
      attrs: {
        x: 0,
        y: -WRAPPER_BORDER_WIDTH * 2,
        width,
        height: height + WRAPPER_BORDER_WIDTH * 2,
        ...wrapperStyle,
      },
    });

    return shape;
  },

  drawContent(cfg: NodeModel, group: GGroup) {
    const [width, height] = this.getSize ? this.getSize(cfg) : [];
    const { contentStyle } = this.getOptions(cfg);

    const shape = group.addShape('rect', {
      className: CONTENT_CLASS_NAME,
      draggable: true,
      attrs: {
        x: 0,
        y: 0,
        width,
        height,
        ...contentStyle,
      },
    });

    return shape;
  },

  drawLabel(cfg, group) {
    const [width, height] = this.getSize ? this.getSize(cfg) : [];
    const { labelStyle } = this.getOptions(cfg);

    const shape = group.addShape('text', {
      className: LABEL_CLASS_NAME,
      draggable: true,
      attrs: {
        x: width / 2,
        y: height / 2,
        text: cfg.label,
        ...labelStyle,
      },
    });

    return shape;
  },

  setLabelText(cfg: NodeModel, group: GGroup) {
    const shape = group.findByClassName(LABEL_CLASS_NAME);

    if (!shape) {
      return;
    }

    const [width] = this.getSize ? this.getSize(cfg) : [];

    const {
      fontStyle, fontWeight, fontSize, fontFamily,
    } = shape.attr();

    const text = cfg.label as string;
    const font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;

    shape.attr('text', optimizeMultilineText(text, font, 2, width - WRAPPER_HORIZONTAL_PADDING * 2));
  },

  update(cfg, item) {
    const group = item.getContainer();

    this.setLabelText(cfg, group);
  },

  setState(name, value, item) {
    if (!item) return;
    const group = item.getContainer();
    const cfg = item.getModel();
    const states = item.getStates() as ItemState[];

    [WRAPPER_CLASS_NAME, CONTENT_CLASS_NAME, LABEL_CLASS_NAME].forEach((className) => {
      const shape = group.findByClassName(className);
      const options = this.getOptions(cfg);

      const shapeName = className.split('-')[1];

      shape.attr({
        ...options[`${shapeName}Style`],
      });

      states.forEach((state) => {
        if (options.stateStyles[state] && options.stateStyles[state][`${shapeName}Style`]) {
          shape.attr({
            ...options.stateStyles[state][`${shapeName}Style`],
          });
        }
      });
    });

    if (name === ItemState.Selected) {
      const wrapperShape = group.findByClassName(WRAPPER_CLASS_NAME);

      const [width, height] = this.getSize ? this.getSize(cfg) : [];

      if (value) {
        wrapperShape.attr({
          x: -WRAPPER_BORDER_WIDTH,
          y: -WRAPPER_BORDER_WIDTH * 2,
          width: width + WRAPPER_BORDER_WIDTH * 2,
          height: height + WRAPPER_BORDER_WIDTH * 3,
        });
      } else {
        wrapperShape.attr({
          x: 0,
          y: -WRAPPER_BORDER_WIDTH * 2,
          width,
          height: height + WRAPPER_BORDER_WIDTH * 2,
        });
      }
    }

    if (this.afterSetState) {
      this.afterSetState(name, value, item);
    }
  },

  getSize(cfg: ModelConfig) {
    const { size } = this.getOptions(cfg);

    if (!isArray(size)) {
      return [size, size];
    }

    return size;
  },

  afterSetState(name: string, value: string | boolean, item: Item) {
    setAnchorPointsState.call(this, name, value, item);
  },

  getAnchorPoints() {
    return [
      [0.5, 0],
      [0.5, 1],
      [0, 0.5],
      [1, 0.5],
    ];
  },
};

G6.registerNode('crcFlowNode', crcFlowNode);
