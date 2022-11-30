import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';

import { EditorContext } from '@/components/EditorContext';
import CommandManager from '@/common/CommandManager';
import { EditorEvent } from '@/common/constants';

interface CommandProps {
  name: string;
  className?: string;
  disabledClassName?: string;
}

export default function Command({
  name,
  className = 'command',
  disabledClassName = 'command-disabled',
  children,
}: CommandProps & { children?: any }) {
  const [disabled, setDisabled] = useState<boolean>(false);

  const { graph, executeCommand } = useContext(EditorContext);

  useEffect(() => {
    if (!graph) return;
    const commandManager: CommandManager = graph.get('commandManager');
    setDisabled(!commandManager.canExecute(graph, name));

    graph.on(EditorEvent.onGraphStateChange as any, () => {
      setDisabled(!commandManager.canExecute(graph, name));
    });
  }, [name, graph]);

  const handleClick = useCallback(() => {
    if (!graph) return;
    executeCommand(name);
  }, [graph]);

  return (
    <div
      className={
        `${className}${disabled ? ` ${disabledClassName}` : ''}`
      }
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
