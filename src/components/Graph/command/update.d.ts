import { Graph, TreeGraph, NodeModel, EdgeModel } from '@/common/interfaces';
import { BaseCommand } from '@/components/Graph/command/base';
export interface UpdateCommandParams {
    id: string;
    originModel: Partial<NodeModel> | EdgeModel;
    updateModel: Partial<NodeModel> | EdgeModel;
    forceRefreshLayout: boolean;
}
declare const updateCommand: BaseCommand<UpdateCommandParams, Graph & TreeGraph>;
export default updateCommand;
