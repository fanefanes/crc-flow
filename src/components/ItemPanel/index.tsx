import React, { useCallback, useContext, useEffect } from 'react';
import { pick } from 'lodash';
import global from '@/common/global';
import { GraphMode } from '@/common/constants';
import { EditorContext } from '@/components/EditorContext';
import { GShape, GGroup } from '@/common/interfaces';
import Item from './Item';

export { Item };

interface ItemPanelProps {
  style?: React.CSSProperties;
  className?: string;
}

const ItemPanel: React.FC<ItemPanelProps> = ({ children, ...props }) =>{
  const { graph } = useContext(EditorContext);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp, false);
    return () => document.removeEventListener('mouseup', handleMouseUp, false);
  }, [graph]);

  const handleMouseUp = useCallback(() => {
    if (!graph || graph?.getCurrentMode() === GraphMode.Default) {
      return;
    }
    const group: GGroup = graph.get('group');
    const shape: GShape = group.findByClassName(
      global.component.itemPanel.delegateShapeClassName,
    ) as GShape;

    if (shape) {
      shape.remove(true);
      graph.paint();
    }

    global.component.itemPanel.model = null;
    graph.setMode(GraphMode.Default);
  }, [graph]);

  return (
    <div {...pick(props, ['style', 'className'])}>{children}</div>
  );
}

export default ItemPanel