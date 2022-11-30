import G6 from '@antv/g6';

import {
  EditorEvent, GraphState, ItemState, ItemType,
} from '@/common/constants';
import { EdgeModel, Graph, Item, Node, Edge, Combo } from '@/common/interfaces';

/** 生成唯一标识 */
export function guid() {
  return 'xxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** 执行批量处理 */
export function executeBatch(graph: Graph, execute: Function) {
  const autoPaint = graph.get('autoPaint');

  graph.setAutoPaint(false);

  execute();

  graph.paint();
  graph.setAutoPaint(autoPaint);
}

/** 判断是否流程图 */
export function isFlow(graph: Graph) {
  return graph.constructor === G6.Graph;
}

/** 判断是否节点 */
export function isNode(item: Item) {
  return item.getType() === ItemType.Node;
}

/** 判断是否边线 */
export function isEdge(item: Item) {
  return item.getType() === ItemType.Edge;
}

/** 是否是组合 */
export function isCombo(item: Item) {
  return item.getType() === ItemType.Combo;
}

/** 获取选中节点 */
export function getSelectedNodes(graph: Graph): Node[] {
  return graph.findAllByState(ItemType.Node, ItemState.Selected);
}

/** 获取选中边线 */
export function getSelectedEdges(graph: Graph): Edge[] {
  return graph.findAllByState(ItemType.Edge, ItemState.Selected);
}

/** 获取选中边线 */
export function getSelectedCombos(graph: Graph): Combo[] {
  return graph.findAllByState(ItemType.Combo, ItemState.Selected);
}

/** 获取高亮边线 */
export function getHighlightEdges(graph: Graph): Edge[] {
  return graph.findAllByState(ItemType.Edge, ItemState.HighLight);
}

/** 获取图表状态 */
export function getGraphState(graph: Graph): GraphState {
  let graphState: GraphState = GraphState.MultiSelected;

  const selectedNodes = getSelectedNodes(graph);
  const selectedEdges = getSelectedEdges(graph);
  const selectedCombos = getSelectedCombos(graph);

  if (selectedNodes.length === 1 && !selectedEdges.length && !selectedCombos.length) {
    graphState = GraphState.NodeSelected;
  }

  if (selectedEdges.length === 1 && !selectedNodes.length && !selectedCombos.length) {
    graphState = GraphState.EdgeSelected;
  }

  if (selectedCombos.length === 1 && !(selectedEdges.length || selectedEdges.length)) {
    graphState = GraphState.ComboSelected;
  }

  if (!selectedNodes.length && !selectedEdges.length && !selectedCombos.length) {
    graphState = GraphState.CanvasSelected;
  }

  return graphState;
}

/** 设置选中元素 */
export function setSelectedItems(graph: Graph, items: Item[] | string[]) {
  executeBatch(graph, () => {
    const selectedNodes = getSelectedNodes(graph);
    const selectedEdges = getSelectedEdges(graph);
    const selectedCombos = getSelectedCombos(graph);

    [...selectedNodes, ...selectedEdges, ...selectedCombos].forEach((node) => {
      graph.setItemState(node, ItemState.Selected, false);
    });

    items.forEach((item) => {
      graph.setItemState(item, ItemState.Selected, true);
    });
  });

  graph.emit(EditorEvent.onGraphStateChange, {
    graphState: getGraphState(graph),
  });
}


/** 清除选中状态 */
export function clearSelectedState(
  graph: Graph,
  shouldUpdate: (item: Item) => boolean = () => true,
) {
  const selectedNodes = getSelectedNodes(graph);
  const selectedEdges = getSelectedEdges(graph);
  const selectedCombos = getSelectedCombos(graph);

  executeBatch(graph, () => {
    [...selectedNodes, ...selectedEdges, ...selectedCombos].forEach((item) => {
      if (shouldUpdate(item)) {
        graph.setItemState(item, ItemState.Selected, false);
      }
    });
  });
}
/** 获取回溯路径 - Flow */
export function getFlowRecallEdges(
  graph: Graph, node: Node, targetIds: string[] = [], edges: Edge[] = [],
) {
  const inEdges: Edge[] = node.getInEdges();

  if (!inEdges.length) {
    return [];
  }

  inEdges.forEach((edge) => {
    const sourceId = (edge.getModel() as EdgeModel).source;
    if (!sourceId) return;
    const sourceNode = graph.findById(sourceId) as Node;

    edges.push(edge);

    const targetId = node.get('id');

    targetIds.push(targetId);

    if (!targetIds.includes(sourceId)) {
      getFlowRecallEdges(graph, sourceNode, targetIds, edges);
    }
  });

  return edges;
}
