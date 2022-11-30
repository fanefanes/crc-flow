import { NodeModel } from '@/common/interfaces';
import { BaseCommand } from '@/components/Graph/command/base';
export interface PasteHereCommandParams {
    models: NodeModel[];
}
declare const pasteHereCommand: BaseCommand<PasteHereCommandParams>;
export default pasteHereCommand;
