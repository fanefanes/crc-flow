
import React from 'react';

import Editor, { Flow } from '../../';



export const Start = () => {
  const data = {
    nodes: [
      {
        id: '0',
        comboId: 'combo1',
        label: 'Node',
        x: 55,
        y: 55,
      },
      {
        id: '1',
        comboId: 'combo1',
        label: 'Node',
        x: 55,
        y: 255,
      },
    ],
    edges: [
      {
        label: 'Label',
        source: '0',
        target: '1',
      },
    ],
    combo: [
      {
        id: 'combo1'
      }
    ]
  };

  return (
    <Editor>
      <Flow data={data} />
    </Editor>
  );
};
