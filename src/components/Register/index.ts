import {
  EdgeRegisterPros, NodeRegisterPros,
  ComboRegisterPros, CommandRegisterPros,
  BehaviorRegisterPros,
  useRegisterEdge, useRegisterNode,
  useRegisterCombo, useRegisterCommand,
  useRegisterBehavior,
} from '@/hooks/useRegister';

function RegisterNode({
  name, config, extend,
}: NodeRegisterPros) {
  useRegisterNode({ name, config, extend });
  return null;
}

function RegisterEdge({
  name, config, extend,
}: EdgeRegisterPros) {
  useRegisterEdge({ name, config, extend });
  return null;
}

function RegisterCombo({
  name, config, extend,
}: ComboRegisterPros) {
  useRegisterCombo({ name, config, extend });
  return null;
}


function RegisterCommand({
  name, config,
}: CommandRegisterPros) {
  useRegisterCommand({ name, config })
  return null;
}

function RegisterBehavior({
  name, config
}: BehaviorRegisterPros) {
  useRegisterBehavior({ name, config });
  return null;
}

export {
  RegisterNode,
  RegisterEdge,
  RegisterCombo,
  RegisterCommand,
  RegisterBehavior
};
