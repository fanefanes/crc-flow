import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { isArray, pick } from 'lodash';

import { EditorContext, EditorPrivateContext } from '@/components/EditorContext';
import CommandManager from '@/common/CommandManager';
import { EditorEvent, GraphCommonEvent, RendererType } from '@/common/constants';
import { CommandEvent, Graph, GraphNativeEvent } from '@/common/interfaces';

interface EditorProps {
  style?: React.CSSProperties;
  className?: string;
  [EditorEvent.onBeforeExecuteCommand]?: (e: CommandEvent) => void;
  [EditorEvent.onAfterExecuteCommand]?: (e: CommandEvent) => void;
  children?: React.ReactNode
}

const Editor: React.FC<EditorProps> = ({
  children,
  ...props
}) => {

  /** EditorContext */
  const [graph, setGraph] = useState<Graph | null>(null);
  const commandManager = useMemo(() => new CommandManager(), []);
  const executeCommand = useCallback((name: string, params?: object) => {
    if (graph) {
      commandManager.execute(graph, name, params);
    }
  }, [commandManager, graph]);

  /** EditorPrivateContext */
  const bindEvent = (g: Graph) => {
    const [before, after] = [
      props[EditorEvent.onBeforeExecuteCommand], props[EditorEvent.onAfterExecuteCommand],
    ];
    if (before) {
      g.on(EditorEvent.onBeforeExecuteCommand as unknown as GraphNativeEvent, before);
    }
    if (after) {
      g.on(EditorEvent.onAfterExecuteCommand as unknown as GraphNativeEvent, after);
    }
  };

  const shouldTriggerShortcut = useCallback((target: HTMLElement | undefined) => {
    if (!graph) {
      return false;
    }

    const renderer: RendererType = graph.get('renderer');
    const canvasElement = graph.get('canvas').get('el');

    if (!target) {
      return false;
    }

    if (target === canvasElement) {
      return true;
    }

    if (renderer === RendererType.Svg) {
      if (target.nodeName === 'svg') {
        return true;
      }

      let { parentNode } = target;

      while (parentNode && parentNode.nodeName !== 'BODY') {
        if (parentNode.nodeName === 'svg') {
          return true;
        }
        parentNode = parentNode.parentNode;
      }

      return false;
    }

    return false;
  }, [graph]);

  const lastMousedownTargetRef = useRef<HTMLElement>();
  const bindShortcut = (g: Graph) => {
    g.on(GraphCommonEvent.onKeyDown, (e) => {

      if (!shouldTriggerShortcut(lastMousedownTargetRef.current)) {
        return;
      }

      Object.values(commandManager.command).forEach((command) => {
        const { name, shortcuts } = command;

        const flag = shortcuts.some((shortcut: string | string[]) => {
          const { key } = e;

          if (!isArray(shortcut)) {
            return shortcut === key;
          }

          return shortcut.every((item, index) => {
            if (index === shortcut.length - 1) {
              return item === key;
            }

            return e[item];
          });
        });

        if (flag) {
          if (commandManager.canExecute(g, name)) {
            // Prevent default
            e.preventDefault();
            // Execute command
            executeCommand(name);
            return true;
          }
        }

        return false;
      });
    });
  };

  const handleSetGraph = (g: Graph) => {
    setGraph(g);
    bindEvent(g);
    bindShortcut(g);
  };

  useEffect(() => {
    const catchTarget = ({ target }: MouseEvent) => {
      lastMousedownTargetRef.current = target as HTMLElement;
    };
    window.addEventListener(GraphCommonEvent.onMouseDown, catchTarget);

    return () => window.removeEventListener(GraphCommonEvent.onMouseDown, catchTarget);
  }, []);

  return (
    <EditorContext.Provider
      value={{
        graph,
        executeCommand,
      }}
    >
      <EditorPrivateContext.Provider
        value={{
          setGraph: handleSetGraph,
          commandManager,
        }}
      >
        <div {...pick(props, ['className', 'style'])}>{children}</div>
      </EditorPrivateContext.Provider>
    </EditorContext.Provider>
  );
};

export default Editor;
