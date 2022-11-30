/// <reference types="react" />
interface CommandProps {
    name: string;
    className?: string;
    disabledClassName?: string;
}
export default function Command({ name, className, disabledClassName, children, }: CommandProps & {
    children?: any;
}): JSX.Element;
export {};
