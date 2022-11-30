import React from 'react';
interface EditableLabelProps {
    /** 标签图形类名 */
    labelClassName?: string;
    /** 标签最大宽度 */
    labelMaxWidth?: number;
}
export default function EditLabel({ labelClassName, labelMaxWidth }: EditableLabelProps): React.ReactPortal | null;
export {};
