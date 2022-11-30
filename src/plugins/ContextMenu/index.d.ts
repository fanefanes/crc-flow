import React from 'react';
import { Item } from '@antv/g6';
export declare enum ContextMenuType {
    Canvas = "canvas",
    Node = "node",
    Edge = "edge",
    Combo = "combo"
}
interface ContextMenuProps {
    /** 菜单类型 */
    type?: ContextMenuType;
    /** 菜单内容 */
    renderContent: (item: Item, position: {
        x: number;
        y: number;
    }, hide: () => void) => React.ReactNode;
}
export default function ContextMenu({ type, renderContent, }: ContextMenuProps): React.ReactPortal | null;
export {};
