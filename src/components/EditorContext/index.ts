import { createContext, useContext } from 'react';
import { Graph } from '@/common/interfaces';
import CommandManager from '@/common/CommandManager';

export interface EditorPrivateContextProps {
  setGraph: (graph: Graph) => void;
  commandManager: CommandManager; // command实例
}

export const EditorPrivateContext = createContext<EditorPrivateContextProps>(
  {} as EditorPrivateContextProps
);

export const useEditorPrivateContext = () => useContext(EditorPrivateContext);

export interface EditorContextProps {
  graph: Graph; // 全局暴露 graph
  executeCommand: (name: string, params?: object) => void; // command执行方法
}

export const EditorContext = createContext<EditorContextProps>(
  {
    graph: null,
    executeCommand() { }
  },
);

export const useEditorContext = () => useContext(EditorContext);
