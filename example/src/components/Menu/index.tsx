import React from 'react';
import { Menu } from 'antd';
import GGEditor, { Flow, ContextMenu } from '@cvte-ai/crc-flow';
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
      <ContextMenu
        renderContent={(item, position, hide) => {
          const { x: left, y: top } = position;
          return (
            <div style={{ position: 'absolute', top, left }}>
              <Menu mode="vertical" selectable={false} onClick={hide} theme="dark">
                <Menu.Item key="canvas">Canvas</Menu.Item>
              </Menu>
            </div>
          );
        }}
      />
      <ContextMenu
        // @ts-ignore
        type="combo"
        renderContent={(item, position, hide) => {
          const { x: left, y: top } = position;
          return (
            <div style={{ position: 'absolute', top, left }}>
              <Menu mode="vertical" selectable={false} onClick={hide} theme="dark">
                <Menu.Item key="combo">Combo</Menu.Item>
              </Menu>
            </div>
          );
        }}
      />
      <ContextMenu
        // @ts-ignore
        type="node"
        renderContent={(item, position, hide) => {
          const { x: left, y: top } = position;
          return (
            <div style={{ position: 'absolute', top, left }}>
              <Menu mode="vertical" selectable={false} onClick={hide} theme="dark">
                <Menu.Item key="node">Node</Menu.Item>
              </Menu>
            </div>
          );
        }}
      />
      <ContextMenu
        // @ts-ignore
        type="edge"
        renderContent={(item, position, hide) => {
          const { x: left, y: top } = position;
          return (
            <div style={{ position: 'absolute', top, left }}>
              <Menu mode="vertical" selectable={false} onClick={hide} theme="dark">
                <Menu.Item key="edge">edge</Menu.Item>
              </Menu>
            </div>
          );
        }}
      />
    </GGEditor>
  );
}
export default App;