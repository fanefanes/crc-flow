import { useEffect, useState } from 'react';
import {  G6Event } from '@antv/g6';

import { Node, Edge, Combo } from '@/common/interfaces';

import { EditorEvent } from '@/common/constants';
import { getSelectedCombos, getSelectedEdges, getSelectedNodes } from '@/utils';
import { useEditorContext } from '../components/EditorContext';

export const useSelectNodes = () => {
  const { graph } = useEditorContext();
  const [nodes, setNodes] = useState<Node[]>([]);
  useEffect(() => {
    if (!graph) {
      return () => {};
    }
    const handler = () => {
      setNodes(getSelectedNodes(graph));
    };

    graph.on(EditorEvent.onGraphStateChange as unknown as G6Event, handler);

    return () => {
      graph.off(EditorEvent.onGraphStateChange as unknown as G6Event, handler);
    };
  }, [graph]);
  return { nodes };
};

export const useSelectEdges = () => {
  const { graph } = useEditorContext();
  const [edges, setEdges] = useState<Edge[]>([]);
  useEffect(() => {
    if (!graph) {
      return () => {};
    }
    const handler = () => {
      setEdges(getSelectedEdges(graph));
    };

    graph.on(EditorEvent.onGraphStateChange as unknown as G6Event, handler);

    return () => {
      graph.off(EditorEvent.onGraphStateChange as unknown as G6Event, handler);
    };
  }, [graph]);
  return { edges };
};

export const useSelectCombos = () => {
  const { graph } = useEditorContext();
  const [combos, setCombos] = useState<Combo[]>([]);
  useEffect(() => {
    if (!graph) {
      return () => {};
    }
    const handler = () => {
      setCombos(getSelectedCombos(graph));
    };

    graph.on(EditorEvent.onGraphStateChange as unknown as G6Event, handler);

    return () => {
      graph.off(EditorEvent.onGraphStateChange as unknown as G6Event, handler);
    };
  }, [graph]);
  return { combos };
};
