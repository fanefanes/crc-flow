import React from 'react';
import GGEditor, {
  Flow,
  RegisterNode,
} from '@cvte-ai/crc-flow';

import styles from './index.module.scss';

const data = {
  nodes: [
    {
      id: '0',
      label: 'Node',
      comboId: 'combo1',
      x: 150,
      y: 200,
    },
    {
      id: '1',
      label: 'Node',
      comboId: 'combo1',
      x: 150,
      y: 350,
    },
  ],
  edges: [
    {
      label: 'Edge',
      source: '0',
      sourceAnchor: 1,
      target: '1',
      targetAnchor: 0,
    },
  ],
  combos: [
    {
      label: 'Combo',
      id: 'combo1'
    }
  ]
};
function App() {
  return (
    <GGEditor>
      {/* <RegisterNode
        name="customNode"
        config={{
          getCustomConfig(model) {
            return {
              wrapperStyle: {
                fill: '#000000',
              },
            };
          },
        }}
        extend="crcFlowNode"
      /> */}
      <RegisterNode
        name="customStartNode"
        config={{
          getCustomConfig(model) {
            return {
              size: [80, 40],
              wrapperStyle: {
                fill: '#5E6A7D',
              },
              contentStyle: {
                fill: '#5E6A7D',
              },
              labelStyle: {
                fill: '#FFFFFF',
              },
            };
          },
          getAnchorPoints() {
            return [
              [0.5, 0],
              [0.5, 1],
              [0, 0.5],
              [1, 0.5],
            ];
          },
        }}
        extend="crcFlowNode"
      />

      <Flow
        className={styles.graph}
        data={data}
        // graphConfig={{ defaultNode: { type: 'customNode' } }}
        graphConfig={{ defaultNode: { type: 'customStartNode' } }}
      />
    </GGEditor>
  );
}
export default App;