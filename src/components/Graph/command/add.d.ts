import { ItemType } from '@/common/constants';
import { NodeModel, EdgeModel } from '@/common/interfaces';
import { BaseCommand } from '@/components/Graph/command/base';
export interface AddCommandParams {
    type: ItemType;
    model: NodeModel | EdgeModel;
}
declare const addCommand: BaseCommand<AddCommandParams>;
export default addCommand;
