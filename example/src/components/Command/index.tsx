import React from 'react';
import { upperFirst } from 'lodash';
import { Divider, Tooltip } from 'antd';

import { createFromIconfontCN } from '@ant-design/icons';

import GGEditor, { Flow, Command, ContextMenu, constants } from '@cvte-ai/crc-flow';
import styles from './index.module.scss';
const { EditorCommand } = constants;


const IconFont = createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/font_1518433_oa5sw7ezue.js',
});

const FLOW_COMMAND_LIST = [
  EditorCommand.Undo,
  EditorCommand.Redo,
  '|',
  EditorCommand.Copy,
  EditorCommand.Paste,
  EditorCommand.Remove,
  '|',
  EditorCommand.ZoomIn,
  EditorCommand.ZoomOut,
];

const flowData = {
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
      <div className={styles.toolbar}>
        {FLOW_COMMAND_LIST.map((name, index) => {
          if (name === '|') {
            return <Divider key={index} type="vertical" />;
          }
          return (
            <Command key={name} name={name} className={styles.command} disabledClassName={styles.commandDisabled}>
              <Tooltip title={upperFirst(name)}>
                <IconFont
                  type={`icon-${name}`}
                  style={{
                    width: 27,
                    height: 27,
                    margin: '0 6px'
                  }} />
              </Tooltip>
            </Command>
          );
        })}
      </div>
      <Flow className={styles.graph} data={flowData} />
      <ContextMenu
        renderContent={(item, position, hide) => {
          const { x: left, y: top } = position;
          return (
            <div className={styles.contextMenu} style={{ position: 'absolute', top, left }}>
              {[EditorCommand.Undo, EditorCommand.Redo, EditorCommand.PasteHere].map(name => {
                return (
                  <Command key={name} name={name} className={styles.command} disabledClassName={styles.commandDisabled}>
                    <div onClick={hide}>
                      <IconFont
                        type={`icon-${name}`}
                        style={{
                          marginRight: '6px'
                        }}
                      />
                      <span>{upperFirst(name)}</span>
                    </div>
                  </Command>
                );
              })}
            </div>
          );
        }}
      />
    </GGEditor>
  );
}
export default App;