import G6 from '@antv/g6';

import '@/shape';

import * as Util from '@/utils';

import Editor from '@/components/Editor';
import Flow from '@/components/Flow';
import Command from '@/components/Command';

import ItemPanel, { Item } from '@/components/ItemPanel';

import {
  RegisterNode,
  RegisterEdge,
  RegisterCombo,
  RegisterCommand,
  RegisterBehavior
} from '@/components/Register';

import { useEditorContext } from '@/components/EditorContext';

import ItemPopover from '@/plugins/ItemPopover';
import ContextMenu from '@/plugins/ContextMenu';
import EditLabel from '@/plugins/EditableLabel';

import global from '@/common/global';
import * as constants from '@/common/constants';

// import { setAnchorPointsState } from '@/shape/common/anchor';

import { useSelectCombos, useSelectEdges, useSelectNodes } from './hooks/useDetail';

export {
  G6,
  Flow,

  // 添加节点
  Item,
  ItemPanel,

  // 选中
  useSelectCombos,
  useSelectEdges,
  useSelectNodes,

  // 上下文
  useEditorContext,

  // 操作
  Command,
  ItemPopover,
  ContextMenu,
  EditLabel,

  // 注册
  RegisterNode,
  RegisterEdge,
  RegisterCombo,
  RegisterCommand,
  RegisterBehavior,

  // 全局状态
  global,

  // 接口
  constants,

  // 工具
  Util,
};

export default Editor;
