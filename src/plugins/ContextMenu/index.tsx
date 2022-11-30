import { EditorContext } from '@/components/EditorContext';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import global from '@/common/global';
import { IG6GraphEvent, Item } from '@antv/g6';
import { clearSelectedState, getGraphState } from '@/utils';

import {
  EditorEvent,
  GraphCanvasEvent,
  GraphComboEvent,
  GraphCommonEvent,
  GraphEdgeEvent,
  GraphNodeEvent,
  ItemState,
} from '@/common/constants';

interface ContextMenuState {
  visible: boolean;
  content: React.ReactNode;
}

export enum ContextMenuType {
  Canvas = 'canvas',
  Node = 'node',
  Edge = 'edge',
  Combo = 'combo'
}

interface ContextMenuProps {
  /** 菜单类型 */
  type?: ContextMenuType;
  /** 菜单内容 */
  renderContent: (
    item: Item, position: { x: number; y: number }, hide: () => void
  ) => React.ReactNode;
}

export default function ContextMenu({
  type = ContextMenuType.Canvas,
  renderContent,
}: ContextMenuProps) {
  const { graph } = useContext(EditorContext);

  const [{ visible, content }, setContent] = useState<ContextMenuState>({
    visible: false,
    content: null,
  });

  const showContextMenu = useCallback((x: number, y: number, item?: Item) => {
    if (!graph) return;

    clearSelectedState(graph);

    if (item) {
      graph.setItemState(item, ItemState.Selected, true);

      graph.emit(EditorEvent.onGraphStateChange, {
        graphState: getGraphState(graph),
      });
    }

    global.plugin.contextMenu.state = 'show';
    global.clipboard.point = {
      x,
      y,
    };

    const position = graph.getCanvasByPoint(x, y);

    setContent({
      visible: true,
      content: renderContent(item, position, hideContextMenu),
    });
  }, [renderContent])

  useEffect(() => {
    if (!graph) return;

    switch (type) {
      case ContextMenuType.Canvas:
        graph.on(GraphCanvasEvent.onCanvasContextMenu, (e: IG6GraphEvent) => {
          e.preventDefault();

          const { x, y } = e;

          showContextMenu(x, y);
        });
        break;

      case ContextMenuType.Node:
        graph.on(GraphNodeEvent.onNodeContextMenu, (e: IG6GraphEvent) => {
          e.preventDefault();

          const { x, y, item } = e;
          if (!item) return;
          showContextMenu(x, y, item);
        });
        break;

      case ContextMenuType.Edge:
        graph.on(GraphEdgeEvent.onEdgeContextMenu, (e: IG6GraphEvent) => {
          e.preventDefault();

          const { x, y, item } = e;

          if (!item) return;
          showContextMenu(x, y, item);
        });
        break;

      case ContextMenuType.Combo:
        graph.on(GraphComboEvent.onComboContextMenu, (e: IG6GraphEvent) => {
          e.preventDefault();

          const { x, y, item } = e;

          if (!item) return;
          showContextMenu(x, y, item);
        });
        break;

      default:
        break;
    }

    graph.on(GraphCommonEvent.onClick, () => {
      hideContextMenu();
    });
  }, [graph, type, showContextMenu]);

  const hideContextMenu = () => {
    global.plugin.contextMenu.state = 'hide';

    setContent({
      visible: false,
      content: null,
    });
  };

  return (visible ? ReactDOM.createPortal(content, graph?.get('container')) : null);
}
