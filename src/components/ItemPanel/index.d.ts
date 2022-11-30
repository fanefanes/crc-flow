import React from 'react';
import Item from './Item';
export { Item };
interface ItemPanelProps {
    style?: React.CSSProperties;
    className?: string;
}
export default function ItemPanel({ children, ...props }: ItemPanelProps & {
    children: any;
}): JSX.Element;
