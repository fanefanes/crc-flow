import React, { useCallback } from 'react';

import { merge, omit } from 'lodash';
import G6 from '@antv/g6';
import { guid } from '@/utils';
import global from '@/common/global';
import { GraphType, FLOW_CONTAINER_ID } from '@/common/constants';

import { GraphReactEventProps, FlowData, GraphOptions, GraphEvent } from '@/common/interfaces';

import behaviorManager from '@/common/behaviorManager';
import GraphComponent from '@/components/Graph';
import { useEditorContext } from '@/components/EditorContext';

/** 增加节点，线和组合 */
import './behavior';

interface FlowProps extends Partial<GraphReactEventProps> {
  style?: React.CSSProperties;
  className?: string;
  data: FlowData;
  graphConfig?: Partial<GraphOptions>;
  customModes?: (mode: string, behaviors: any) => object;
}

const Flow: React.FC<FlowProps> = ({
  data,
  customModes,
  graphConfig = {},
  ...props
}) => {
  const { graph } = useEditorContext();
  const containerId = `${FLOW_CONTAINER_ID}_${guid()}`;

  const canDragNode = useCallback((e: GraphEvent) => {
    return !['anchor', 'banAnchor'].some(item => item === e.target.get('className'));
  }, [])

  const canDragOrZoomCanvas = useCallback(() => {
    if (!graph) {
      return false;
    }

    return (
      global.plugin.itemPopover.state === 'hide' &&
      global.plugin.contextMenu.state === 'hide' &&
      global.plugin.editableLabel.state === 'hide'
    );
  }, [global, graph])

  const parseData = (d: FlowData) => {
    const { nodes = [], edges = [], combo = [] } = d;

    [...nodes, ...edges, ...combo].forEach((item) => {
      const { id } = item;

      if (id) {
        return;
      }

      // eslint-disable-next-line no-param-reassign
      item.id = guid();
    });
  };

  const initGraph = (width: number, height: number) => {
    const modes: any = merge(behaviorManager.getRegisteredBehaviors(GraphType.Flow), {
      default: {
        'click-select': true,
        'drag-combo': {
          type: 'drag-combo',
        },
        'drag-node': {
          type: 'drag-node',
          enableDelegate: true,
          shouldBegin: canDragNode,
        },
        'drag-canvas': {
          type: 'drag-canvas',
          shouldBegin: canDragOrZoomCanvas,
          shouldUpdate: canDragOrZoomCanvas,
        },
        'zoom-canvas': {
          type: 'zoom-canvas',
          shouldUpdate: canDragOrZoomCanvas,
        },
        'recall-edge': 'recall-edge',
        'brush-select': 'brush-select',
      },
    });

    Object.keys(modes).forEach((mode) => {
      const behaviors = modes[mode];

      modes[mode] = Object.values(customModes ? customModes(mode, behaviors) : behaviors);
    });

    const graph = new G6.Graph({
      container: containerId,
      width,
      height,
      modes,
      defaultNode: {
        type: 'crcFlowNode',
      },
      defaultEdge: {
        type: 'crcFlowEdge',
      },
      defaultCombo: {
        type: 'crcFlowCombo',
      },
      ...graphConfig,
    });

    return graph;
  };

  return (
    <GraphComponent
      data={data}
      containerId={containerId}
      initGraph={initGraph}
      parseData={parseData}
      {...omit(props, ['graphConfig', 'customModes'])}
    />
  );
};

export default Flow;
