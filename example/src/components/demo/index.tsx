import React from 'react';
import { upperFirst } from 'lodash';
import { Divider, Tooltip } from 'antd';

import { createFromIconfontCN } from '@ant-design/icons';

import GGEditor, { Flow, Command, ContextMenu, constants, Item, ItemPanel } from '@cvte-ai/crc-flow';
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
      x: 250,
      y: 100,
    },
    {
      id: '1',
      comboId: 'combo1',
      label: 'Node',
      x: 250,
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
      <ItemPanel className={styles.itemPanel}>
        <Item
          className={styles.item}
          model={{
            type: 'circle',
            size: 50,
            label: 'circle',
          }}
        >
          <img
            src="https://gw.alicdn.com/tfs/TB1IRuSnRr0gK0jSZFnXXbRRXXa-110-112.png"
            width="55"
            height="56"
            draggable={false}
          />
        </Item>
        <Item
          className={styles.item}
          model={{
            type: 'rect',
            size: [80, 24],
            label: 'rect',
          }}
        >
          <img
            src="https://gw.alicdn.com/tfs/TB1reKOnUT1gK0jSZFrXXcNCXXa-178-76.png"
            width="89"
            height="38"
            draggable={false}
          />
        </Item>
        <Item
          className={styles.item}
          model={{
            type: 'ellipse',
            size: [100, 50],
            label: 'ellipse',
          }}
        >
          <img
            src="https://gw.alicdn.com/tfs/TB1AvmVnUH1gK0jSZSyXXXtlpXa-216-126.png"
            width="108"
            height="63"
            draggable={false}
          />
        </Item>
        <Item
          className={styles.item}
          model={{
            type: 'diamond',
            size: [80, 80],
            label: 'diamond',
          }}
        >
          <img
            src="https://gw.alicdn.com/tfs/TB1EB9VnNz1gK0jSZSgXXavwpXa-178-184.png"
            width="89"
            height="92"
            draggable={false}
          />
        </Item>
        <Item
          className={styles.item}
          model={{
            type: 'triangle',
            size: [30, 30],
            label: 'triangle',
          }}
        >
          <img
            src="https://gw.alicdn.com/tfs/TB12sC2nKH2gK0jSZJnXXaT1FXa-126-156.png"
            width="63"
            height="78"
            draggable={false}
          />
        </Item>
        <Item
          className={styles.item}
          model={{
            type: 'crcFlowNode',
            label: '自定义节点',
          }}
        >
          <div style={{ width: 80, height: 40, lineHeight: '40px', textAlign: 'center', border: '1px dashed red' }}>自定义节点</div>
        </Item>
      </ItemPanel>
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