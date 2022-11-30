import React from "react";

import { useEditorContext } from '@cvte-ai/crc-flow';

export default () => {
  const context = useEditorContext()

  console.log('context', context)

  return (<div />)
}