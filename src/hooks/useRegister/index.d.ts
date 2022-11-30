import { ShapeDefine, ShapeOptions } from '@antv/g6';
interface RegisterProps {
    name: string;
    extend?: string;
}
export interface NodeRegisterPros extends RegisterProps {
    config: ShapeOptions | ShapeDefine;
}
declare function useRegisterNode({ name, config, extend }: NodeRegisterPros): void;
export interface EdgeRegisterPros extends RegisterProps {
    config: ShapeOptions;
}
declare function useRegisterEdge({ name, config, extend }: EdgeRegisterPros): void;
export interface ComboRegisterPros extends RegisterProps {
    config: ShapeOptions;
}
declare function useRegisterCombo({ name, config, extend }: ComboRegisterPros): void;
export { useRegisterNode, useRegisterEdge, useRegisterCombo, };
