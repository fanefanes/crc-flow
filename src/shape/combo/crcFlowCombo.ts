import G6 from '@antv/g6';

import { GShape, CustomCombo } from '@/common/interfaces';

const WRAPPER_NAME = 'combo-keyShape';
const WRAPPER_CLASS_NAME = 'combo-keyShape-className';

const crcFlowCombo: CustomCombo = {

  drawShape(cfg, group) {
    const model = cfg;
    if (model) {
      model.padding = model.padding || [50, 20, 20, 20];
    }
    const style = this.getShapeStyle(model);
    const rect = group && group.addShape('rect', {
      attrs: {
        ...style,
        // @ts-ignore
        x: -style.width / 2 - (model.padding[3] - model.padding[1]) / 2,
        // @ts-ignore
        y: -style.height / 2 - (model.padding[0] - model.padding[2]) / 2,
        width: style.width,
        height: style.height,
        lineDash: [2, 5],
        lineWidth: 2,
        stroke: '#999',
      },
      draggable: true,
      name: WRAPPER_NAME,
      className: WRAPPER_CLASS_NAME,
    });
    return rect as GShape;
  },

  setState(name, value, item) {
    if (!item) {
      return;
    }

    const group = item?.getContainer();
    const shapes = group?.findAllByName(WRAPPER_NAME);

    if (shapes) {
      const shape = shapes[0];

      if (value) {
        shape.attr({
          lineDash: 2,
          lineWidth: 2,
          stroke: '#216DD9',
        });
      } else {
        shape.attr({
          lineDash: [2, 5],
          lineWidth: 2,
          stroke: '#999',
        });
      }
    }

    if (this.afterSetState) {
      this.afterSetState(name, value, item);
    }
  },
};

G6.registerCombo('crcFlowCombo', crcFlowCombo, 'rect');
