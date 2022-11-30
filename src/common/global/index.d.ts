import { ModelConfig } from '@antv/g6';
declare class Global {
    /** 当前版本 */
    // version: string;
    /** 埋点开关 */
    trackable: boolean;
    /** 剪贴板 */
    clipboard: {
        point: {
            x: number;
            y: number;
        };
        models: ModelConfig[];
    };
    /** 组件数据 */
    component: {
        itemPanel: {
            model: Partial<ModelConfig>;
            delegateShapeClassName: string;
        };
    };
    /** 插件数据 */
    plugin: {
        itemPopover: {
            state: 'show' | 'hide';
        };
        contextMenu: {
            state: 'show' | 'hide';
        };
        editableLabel: {
            state: 'show' | 'hide';
        };
    };
}
declare const _default: Global;
export default _default;
