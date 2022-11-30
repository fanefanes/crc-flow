import React from 'react';
import { ModelConfig } from '@antv/g6';
import { ItemType } from '@/common/constants';
export interface ItemProps {
    style?: React.CSSProperties;
    className?: string;
    type?: ItemType;
    model: Partial<ModelConfig>;
}
export default function Item({ type, model, children, ...props }: ItemProps & {
    children: any;
}): JSX.Element;
