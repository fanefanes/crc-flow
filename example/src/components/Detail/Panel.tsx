import React from "react";
import { useEditorContext, useSelectCombos, useSelectEdges, useSelectNodes } from '@cvte-ai/crc-flow';
import { Input } from "antd";

export default () => {
  const { executeCommand } = useEditorContext()
  const { combos } = useSelectCombos()
  const { nodes } = useSelectNodes()
  const { edges } = useSelectEdges()

  const handleSubmit = ({ target }) => {
    if (!target.value) return

    const item = nodes[0] || edges[0] || combos[0];

    if (!item) {
      return;
    }

    executeCommand('update', {
      id: item.get('id'),
      updateModel: {
        label: target.value
      },
    });
  }

  return (
    <>
      {
        !!combos.length && <div>combo: <Input onBlur={handleSubmit} /></div>
      }
      {
        !!nodes.length && <div>node: <Input onBlur={handleSubmit} /></div>
      }
      {
        !!edges.length && <div>edge: <Input onBlur={handleSubmit} /></div>
      }
      {
        !combos.length && !nodes.length&&  !edges.length && <div>Select a node ，edge or combo :)</div>
      }
    </>
  )
}