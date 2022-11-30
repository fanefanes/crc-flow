import React, {
  useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import ReactDOM from 'react-dom';
import { getSelectedNodes } from '@/utils';
import { EditorContext } from '@/components/EditorContext';
import global from '@/common/global';
import {
  EditorEvent, GraphMode, GraphNodeEvent, LabelState,
} from '@/common/constants';
import G6 from '@antv/g6';
import { LabelStateEvent } from '@/common/interfaces';

interface EditableLabelProps {
  /** 标签图形类名 */
  labelClassName?: string;
  /** 标签最大宽度 */
  labelMaxWidth?: number;
}

interface EditableLabelState {
  visible: boolean;
}

export default function EditLabel({ labelClassName, labelMaxWidth }: EditableLabelProps) {
  const elRef = useRef(null);

  const { graph, executeCommand } = useContext(EditorContext);

  const [{ visible }, setContent] = useState<EditableLabelState>({ visible: false });

  const update = useCallback(() => {
    if (!graph) return;
    const node = getSelectedNodes(graph)[0];
    const model = node.getModel();

    if (!elRef.current) return;

    const { textContent: label } = elRef.current;

    if (label === model.label) {
      return;
    }

    executeCommand('update', {
      id: model.id,
      updateModel: {
        label,
      },
      forceRefreshLayout: false,
    });
  }, [graph, executeCommand]);

  const hideEditableLabel = () => {
    global.plugin.editableLabel.state = 'hide';

    setContent({
      visible: false,
    });
  };

  const handleBlur = () => {
    update();
    hideEditableLabel();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const { key } = e;

    if (['Tab'].includes(key)) {
      e.preventDefault();
    }

    if (['Enter', 'Escape', 'Tab'].includes(key)) {
      update();
      hideEditableLabel();
    }
  };

  useEffect(() => {
    if (!graph) return;
    graph.on(EditorEvent.onLabelStateChange as any, ({ labelState }: LabelStateEvent) => {
      if (labelState === LabelState.Show) {
        showEditableLabel();
      } else {
        hideEditableLabel();
      }
    });

    graph.on(GraphNodeEvent.onNodeDoubleClick, () => {
      showEditableLabel();
    });
  }, [graph]);

  const showEditableLabel = () => {
    global.plugin.editableLabel.state = 'show';

    setContent(
      () => {
        if (elRef.current) {
          (elRef.current as HTMLDivElement).focus();
          document.execCommand('selectAll', false, undefined);
        }
        return {
          visible: true,
        };
      },
    );
  };

  const Label = useMemo(() => {
    if (!graph) return null;
    const mode = graph.getCurrentMode();
    const zoom = graph.getZoom();

    if (mode === GraphMode.Readonly) {
      return null;
    }

    const node = getSelectedNodes(graph)[0];

    if (!node) {
      return null;
    }

    const model = node.getModel();
    const group = node.getContainer();

    const { label } = model;
    const labelShape = group.findByClassName(labelClassName || '');

    if (!labelShape) {
      return null;
    }

    if (!visible) {
      return null;
    }

    // Get the label offset
    const { x: relativeX, y: relativeY } = labelShape.getBBox();
    const { x: absoluteX, y: absoluteY } = G6.Util.applyMatrix(
      {
        x: relativeX,
        y: relativeY,
      },
      node.getContainer().getMatrix(),
    );

    const { x: left, y: top } = graph.getCanvasByPoint(absoluteX, absoluteY);

    // Get the label size
    const { width, height } = labelShape.getBBox();

    // Get the label font
    const font = labelShape.attr('font');

    const style: React.CSSProperties = {
      position: 'absolute',
      top,
      left,
      width: 'auto',
      height: 'auto',
      minWidth: width,
      minHeight: height,
      maxWidth: labelMaxWidth,
      font,
      background: 'white',
      border: '1px solid #1890ff',
      outline: 'none',
      transform: `scale(${zoom})`,
      transformOrigin: 'left top',
    };

    return ReactDOM.createPortal(
      <div
        ref={elRef}
        style={style}
        contentEditable
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning
      >
        {label}
      </div>,
      graph?.get('container'),
    );
  }, [graph, labelClassName, labelMaxWidth]);

  return Label;
}
