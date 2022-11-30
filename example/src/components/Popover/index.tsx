import React from 'react';
import { Popover } from 'antd';
import GGEditor, { Flow, ItemPopover } from '@cvte-ai/crc-flow';
import styles from './index.module.scss';

const data = {
  nodes: [
    {
      id: '0',
      label: 'Node',
      comboId: 'combo1',
      x: 50,
      y: 100,
    },
    {
      id: '1',
      label: 'Node',
      comboId: 'combo1',
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
      <ItemPopover
        renderContent={(item, position) => {
          const { minY: top, centerX: left } = position;
          return (
            <Popover visible={true} title="Node" content="Node">
              <div style={{ position: 'absolute', top, left }} />
            </Popover>
          );
        }}
      />
      <ItemPopover
        // @ts-ignore
        type="combo"
        renderContent={(item, position) => {
          const { minY: top, centerX: left } = position;
          return (
            <Popover visible={true} title="Combo" content="Combo">
              <div style={{ position: 'absolute', top, left }} />
            </Popover>
          );
        }}
      />
      <ItemPopover
        // @ts-ignore
        type="edge"
        renderContent={(item, position) => {
          const { minY: top, centerX: left } = position;
          return (
            <Popover visible={true} title="Edge" content="Edge">
              <div style={{ position: 'absolute', top, left }} />
            </Popover>
          );
        }}
      />
    </GGEditor>
  );
}
export default App;