import React, {
  useCallback,
  useContext, useEffect, useRef, useState,
} from 'react';
import ReactDOM from 'react-dom';
import delay from 'lodash/delay';
import global from '@/common/global';
import { GraphComboEvent, GraphEdgeEvent, GraphNodeEvent } from '@/common/constants';
import { EditorContext } from '@/components/EditorContext';
import { Item } from '@antv/g6';

export enum ItemPopoverType {
  Node = 'node',
  Edge = 'edge',
  Combo = 'combo',
}

interface ItemPopoverProps {
  /** 浮层类型 */
  type?: ItemPopoverType;
  /** 浮层延时 */
  showDelay?: number;
  /** 浮层内容 */
  renderContent: (
    item: Item,
    position: {
      minX: number; minY: number; maxX: number; maxY: number; centerX: number; centerY: number
    },
  ) => React.ReactNode;
}

interface ItemPopoverState {
  visible: boolean;
  content: React.ReactNode;
}

export default function ItemPopover({
  type = ItemPopoverType.Node,
  showDelay = 500,
  renderContent,
}: ItemPopoverProps) {
  const { graph } = useContext(EditorContext);

  const [{ visible, content }, setContent] = useState<ItemPopoverState>({
    visible: false, content: null,
  });

  const mouseEnterTimeoutIDRef = useRef<number>();
  const mouseLeaveTimeoutIDRef = useRef<number>();

  const showItemPopover = useCallback((item: Item) => {
    if (!graph) return;

    global.plugin.itemPopover.state = 'show';

    const {
      minX, minY, maxX, maxY, centerX = 0, centerY = 0,
    } = item.getBBox();

    const { x: itemMinX, y: itemMinY } = graph.getCanvasByPoint(minX, minY);
    const { x: itemMaxX, y: itemMaxY } = graph.getCanvasByPoint(maxX, maxY);
    const { x: itemCenterX, y: itemCenterY } = graph.getCanvasByPoint(centerX, centerY);

    const position = {
      minX: itemMinX,
      minY: itemMinY,
      maxX: itemMaxX,
      maxY: itemMaxY,
      centerX: itemCenterX,
      centerY: itemCenterY,
    };

    setContent({
      visible: true,
      content: renderContent(item, position),
    });
  }, [global, graph])

  const hideItemPopover = useCallback(() => {
    if (!global) return
    global.plugin.itemPopover.state = 'hide';

    setContent({
      visible: false,
      content: null,
    });
  }, [global])

  useEffect(() => {
    if (!graph) return () => { };

    const overHandler = ({ item }: { item: any }) => {
      clearTimeout(mouseLeaveTimeoutIDRef.current);
      mouseEnterTimeoutIDRef.current = delay(showItemPopover, showDelay, item);
    };
    const leaveHandler = () => {
      clearTimeout(mouseEnterTimeoutIDRef.current);
      mouseLeaveTimeoutIDRef.current = delay(hideItemPopover, showDelay);
    };

    if (type === ItemPopoverType.Combo) {
      graph.on(GraphComboEvent.onComboMouseOver, overHandler);
      graph.on(GraphComboEvent.onComboMouseLeave, leaveHandler);
    }

    if (type === ItemPopoverType.Edge) {
      graph.on(GraphEdgeEvent.onEdgeMouseOver, overHandler);
      graph.on(GraphEdgeEvent.onEdgeMouseLeave, leaveHandler);
    }

    if (type === ItemPopoverType.Node) {
      graph.on(GraphNodeEvent.onNodeMouseOver, overHandler);
      graph.on(GraphNodeEvent.onNodeMouseLeave, leaveHandler);
    }

    return () => {
      if (type === ItemPopoverType.Node) {
        graph.off(GraphNodeEvent.onNodeMouseOver, overHandler);
        graph.off(GraphNodeEvent.onNodeMouseLeave, leaveHandler);
      }


      if (type === ItemPopoverType.Combo) {
        graph.off(GraphComboEvent.onComboMouseOver, overHandler);
        graph.off(GraphComboEvent.onComboMouseLeave, leaveHandler);
      }

      if (type === ItemPopoverType.Edge) {
        graph.off(GraphEdgeEvent.onEdgeMouseOver, overHandler);
        graph.off(GraphEdgeEvent.onEdgeMouseLeave, leaveHandler);
      }
    };
  }, [graph, type, mouseLeaveTimeoutIDRef, showItemPopover, hideItemPopover]);

  return (visible ? ReactDOM.createPortal(content, graph?.get('container')) : null);
}
