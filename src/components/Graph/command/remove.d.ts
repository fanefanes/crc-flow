import { MindData, NodeModel, EdgeModel } from '@/common/interfaces';
import { BaseCommand } from '@/components/Graph/command/base';
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
declare const removeCommand: BaseCommand<RemoveCommandParams>;
export default removeCommand;
