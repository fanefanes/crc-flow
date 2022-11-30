import React from 'react';
import { Graph, GraphData } from '@antv/g6';
import { GraphReactEventProps } from '@/common/interfaces';
import './behavior';
interface GraphProps extends Partial<GraphReactEventProps> {
    containerId: string;
    data: GraphData;
    parseData: (d: GraphData) => void;
    initGraph(width: number, height: number): Graph;
}
declare const GraphComponent: React.FC<GraphProps>;
export default GraphComponent;
