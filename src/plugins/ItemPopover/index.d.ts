import React from 'react';
import { Item } from '@antv/g6';
export declare enum ItemPopoverType {
    Node = "node",
    Edge = "edge",
    Combo = "combo"
}
interface ItemPopoverProps {
    /** 浮层类型 */
    type?: ItemPopoverType;
    /** 浮层延时 */
    showDelay?: number;
    /** 浮层内容 */
    renderContent: (item: Item, position: {
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
        centerX: number;
        centerY: number;
    }) => React.ReactNode;
}
export default function ItemPopover({ type, showDelay, renderContent, }: ItemPopoverProps): React.ReactPortal | null;
export {};
