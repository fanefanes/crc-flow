import { executeBatch } from '@/utils';
import { ItemType } from '@/common/constants';
import {
  TreeGraph, MindData, NodeModel, EdgeModel,
} from '@/common/interfaces';
import { BaseCommand, baseCommand } from '@/components/Graph/command/base';

export interface RemoveCommandParams {
  flow: {
    nodes: {
      [id: string]: NodeModel;
    };
    edges: {
      [id: string]: EdgeModel;
    };
  };
  mind: {
    model: MindData | null;
    parent: string;
  };
}

const removeCommand: BaseCommand<RemoveCommandParams> = {
  ...baseCommand,

  params: {
    flow: {
      nodes: {},
      edges: {},
    },
    mind: {
      model: null,
      parent: '',
    },
  },

  canExecute(graph) {
    const selectedNodes = this.getSelectedNodes(graph);
    const selectedEdges = this.getSelectedEdges(graph);

    return !!(selectedNodes.length || selectedEdges.length);
  },

  init(graph) {
    const selectedNodes = this.getSelectedNodes(graph);
    const selectedEdges = this.getSelectedEdges(graph);

    const { nodes, edges } = this.params.flow;

    selectedNodes.forEach((node) => {
      const nodeModel = node.getModel() as NodeModel;
      const nodeEdges = node.getEdges();

      nodes[nodeModel.id] = nodeModel;

      nodeEdges.forEach((edge) => {
        const edgeModel = edge.getModel();
        if (!edgeModel || !edgeModel.id) return;
        edges[edgeModel.id] = edgeModel;
      });
    });

    selectedEdges.forEach((edge) => {
      const edgeModel = edge.getModel();
      if (!edgeModel || !edgeModel.id) return;
      edges[edgeModel.id] = edgeModel;
    });

  },

  execute(graph) {
    const { nodes, edges } = this.params.flow;

    executeBatch(graph, () => {
      [...Object.keys(nodes), ...Object.keys(edges)].forEach((id) => {
        graph.removeItem(id);
      });
    });
  },

  undo(graph) {
    const { nodes, edges } = this.params.flow;

    executeBatch(graph, () => {
      Object.keys(nodes).forEach((id) => {
        const model = nodes[id];

        graph.addItem(ItemType.Node, model);
      });

      Object.keys(edges).forEach((id) => {
        const model = edges[id];

        graph.addItem(ItemType.Edge, model);
      });
    });
  },

  shortcuts: ['Delete', 'Backspace'],
};

export default removeCommand;
