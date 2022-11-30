import React, { useEffect } from 'react';
import { pick } from 'lodash';

import { Graph, FlowData, GraphNativeEvent, GraphReactEvent, GraphReactEventProps } from '@/common/interfaces';
import {
  GraphCommonEvent, GraphNodeEvent, GraphEdgeEvent, GraphCanvasEvent, GraphCustomEvent, GraphMode, GraphComboEvent,
} from '@/common/constants';
import { useEditorContext, useEditorPrivateContext } from '@/components/EditorContext';

import commands from './command';

/** 增加item 行为 */
import './behavior';

interface GraphProps extends Partial<GraphReactEventProps> {  
  style?: React.CSSProperties;
  className?: string;
  containerId: string;
  data: FlowData;
  parseData: (d: FlowData) => void;
  initGraph(width: number, height: number): Graph;
}

const GraphComponent: React.FC<GraphProps> = ({
  containerId,
  data,
  initGraph,
  parseData,
  children,
  ...props
}) => {
  const { graph: propsGraph } = useEditorContext();
  const { setGraph, commandManager } = useEditorPrivateContext();

  const initGraphComponent = (d: FlowData) => {
    const { clientWidth = 0, clientHeight = 0 } = document.getElementById(containerId) || {};

    const graphData = { ...d };
    parseData(graphData);

    const graph = initGraph(clientWidth, clientHeight);

    graph.data(graphData);
    graph.render();

    graph.setMode(GraphMode.Default);

    setGraph(graph);

    // 注册命令 并 设置命令管理器
    graph.set('commandManager', commandManager);
    Object.keys(commands).forEach((name) => {
      // @ts-ignore
      commandManager?.register(name, commands[name]);
    });
  };

  const changeData = (d: FlowData) => {
    if (!propsGraph) {
      return;
    }

    const graphData = { ...d };
    parseData(graphData);

    propsGraph.changeData(graphData);
  };

  const bindEvent = () => {
    if (!propsGraph) {
      return;
    }

    // @ts-ignore
    const events: {
      [propName in GraphReactEvent]: GraphNativeEvent;
    } = {
      ...GraphCommonEvent,
      ...GraphNodeEvent,
      ...GraphEdgeEvent,
      ...GraphCanvasEvent,
      ...GraphCustomEvent,
      ...GraphComboEvent,
    };

    (Object.keys(events) as GraphReactEvent[]).forEach((event) => {
      if (typeof props[event] === 'function') {
        propsGraph.on(events[event], props[event]!);
      }
    });
  };

  useEffect(() => {
    if (propsGraph) {
      changeData(data);
    } else {
      initGraphComponent(data);
    }
  }, [data]);

  useEffect(() => {
    bindEvent();
  }, [propsGraph]);

  return (
    <div id={containerId} {...pick(props, ['className', 'style'])}>
      {children}
    </div>
  );
};

export default GraphComponent;
