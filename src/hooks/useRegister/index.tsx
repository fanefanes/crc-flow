import { useEffect } from 'react';
import G6 from '@antv/g6';
import { Behavior, Command, CustomCombo, CustomEdge, CustomNode } from '@/common/interfaces';
import { useEditorPrivateContext } from '@/components/EditorContext';

import behaviorManager from '@/common/behaviorManager';

interface RegisterProps {
  name: string;
  extend?: string;
}

export interface NodeRegisterPros extends RegisterProps {
  config: CustomNode
}

function useRegisterNode({ name, config, extend }: NodeRegisterPros) {
  useEffect(() => {
    G6.registerNode(name, config, extend);
  }, []);
}

export interface EdgeRegisterPros extends RegisterProps {
  config: CustomEdge
}

function useRegisterEdge({ name, config, extend }: EdgeRegisterPros) {
  useEffect(() => {
    G6.registerEdge(name, config, extend);
  }, []);
}

export interface ComboRegisterPros extends RegisterProps {
  config: CustomCombo
}

function useRegisterCombo({ name, config, extend }: ComboRegisterPros) {
  useEffect(() => {
    G6.registerCombo(name, config, extend);
  }, []);
}

export interface CommandRegisterPros extends RegisterProps {
  config: Command
}

function useRegisterCommand({ name, config }: CommandRegisterPros) {
  const { commandManager } = useEditorPrivateContext();

  useEffect(() => {
    commandManager.register(name, config);
  }, []);
}

export interface BehaviorRegisterPros extends RegisterProps {
  config: Behavior
}

function useRegisterBehavior({ name, config }: BehaviorRegisterPros) {
  useEffect(() => {
    behaviorManager.register(name, config);
  }, []);
}


export {
  useRegisterNode,
  useRegisterEdge,
  useRegisterCombo,
  useRegisterCommand,
  useRegisterBehavior,
};
