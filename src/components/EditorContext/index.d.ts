/// <reference types="react" />
import { Graph } from '@antv/g6';
import CommandManager from '@/common/CommandManager';
export interface EditorPrivateContextProps {
    setGraph: (graph: Graph) => void;
    commandManager?: CommandManager;
}
export declare const EditorPrivateContext: import("react").Context<EditorPrivateContextProps>;
export declare const useEditorPrivateContext: () => EditorPrivateContextProps;
export interface EditorContextProps {
    graph: Graph | null;
    executeCommand: (name: string, params?: object) => void;
    commandManager: CommandManager;
}
export declare const EditorContext: import("react").Context<EditorContextProps>;
export declare const useEditorContext: () => EditorContextProps;
