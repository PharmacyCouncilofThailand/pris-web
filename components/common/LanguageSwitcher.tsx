'use client';
import Switch from 'react-switch';

// Isolate the "any" cast here so it doesn't pollute the rest of the app
const ReactSwitch = Switch as any;

interface LanguageSwitcherProps {
    onChange: (checked: boolean) => void;
    checked: boolean;
    offColor?: string;
    onColor?: string;
    offHandleColor?: string;
    onHandleColor?: string;
    handleDiameter?: number;
    checkedHandleIcon?: React.ReactNode;
    uncheckedHandleIcon?: React.ReactNode;
    uncheckedIcon?: React.ReactNode;
    checkedIcon?: React.ReactNode;
    boxShadow?: string;
    activeBoxShadow?: string;
    height?: number;
    width?: number;
    className?: string;
    id?: string;
}

export default function LanguageSwitcher(props: LanguageSwitcherProps) {
    return <ReactSwitch {...props} />;
}
