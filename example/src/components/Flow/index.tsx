import React from 'react';
import GGEditor, { Flow } from '@cvte-ai/crc-flow';
import styles from './index.module.scss';

const data = {
  nodes: [
    {
      id: '0',
      comboId: 'combo1',
      label: 'Node',
      x: 50,
      y: 100,
    },
    {
      id: '1',
      comboId: 'combo1',
      label: 'Node',
      x: 50,
      y: 250,
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
      <Flow className={styles.graph} data={data} />
    </GGEditor>
  );
}
export default App;