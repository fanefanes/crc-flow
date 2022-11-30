import { EdgeRegisterPros, NodeRegisterPros, ComboRegisterPros } from '@/hooks/useRegister';
declare function RegisterNode({ name, config, extend, }: NodeRegisterPros): null;
declare function RegisterEdge({ name, config, extend, }: EdgeRegisterPros): null;
declare function RegisterCombo({ name, config, extend, }: ComboRegisterPros): null;
export { RegisterNode, RegisterEdge, RegisterCombo, };
