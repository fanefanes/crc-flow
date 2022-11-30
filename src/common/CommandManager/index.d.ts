import { Graph } from '@antv/g6';
export interface Command<P = object, G = Graph> {
    /** 命令名称 */
    name: string;
    /** 命令参数 */
    params: P;
    /** 是否可以执行 */
    canExecute(graph: G): boolean;
    /** 是否应该执行 */
    shouldExecute(graph: G): boolean;
    /** 是否可以撤销 */
    canUndo(graph: G): boolean;
    /** 初始命令 */
    init(graph: G): void;
    /** 执行命令 */
    execute(graph: G): void;
    /** 撤销命令 */
    undo(graph: G): void;
    /** 命令快捷键 */
    shortcuts: string[] | string[][];
}
declare class CommandManager {
    command: {
        [propName: string]: Command;
    };
    commandQueue: Command[];
    commandIndex: number;
    constructor();
    /** 注册命令 */
    register(name: string, command: Command): void;
    /** 执行命令 */
    execute(graph: Graph, name: string, params?: object): void;
    /** 判断是否可以执行 */
    canExecute(graph: Graph, name: string): boolean;
    /** 注入是否应该执行 */
    injectShouldExecute(name: string, shouldExecute: (graph: Graph) => boolean): void;
}
export default CommandManager;
