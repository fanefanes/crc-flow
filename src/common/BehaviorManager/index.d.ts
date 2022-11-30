import { Graph, BehaviorOption } from '@antv/g6';
import { GraphType } from '@/common/constants';
export interface Behavior extends BehaviorOption {
    graph?: Graph;
    graphType?: GraphType;
    graphMode?: string;
    [propName: string]: any;
}
declare class BehaviorManager {
    behaviors: {
        [propName: string]: Behavior;
    };
    constructor();
    getRegisteredBehaviors(type: GraphType): Record<string, any>;
    wrapEventHandler: (type: GraphType, behavior: Behavior) => Behavior;
    register(name: string, behavior: Behavior): void;
}
declare const _default: BehaviorManager;
export default _default;
