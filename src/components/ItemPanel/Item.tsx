import React, { useCallback } from 'react';
import { pick } from 'lodash';
import { NodeModel } from '@/common/interfaces';
import global from '@/common/global';
import { ItemType, GraphMode } from '@/common/constants';
import { useEditorContext } from '../EditorContext';

export interface ItemProps {
  style?: React.CSSProperties;
  className?: string;
  type?: ItemType;
  model: Partial<NodeModel>;
}
const Item:React.FC<ItemProps> = ({
  type = ItemType.Node,
  model, children, ...props
}) => {
  const { graph } = useEditorContext();

  const handleMouseDown = useCallback(() => {
    if (!graph) return;
    if (type === ItemType.Node) {
      global.component.itemPanel.model = model;
      graph.setMode(GraphMode.AddNode);
    }
  }, [type, model, graph]);

  return (
    <div
      {...pick(props, ['style', 'className'])}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
}


export default Item