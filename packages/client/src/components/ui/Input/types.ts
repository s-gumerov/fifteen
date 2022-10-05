import { KeyboardEvent, FocusEvent, ChangeEvent, MouseEvent } from 'react';

export type IInputProps = {
    id: string;
    name: string;
    className: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    value?: string;
    pattern?: string;
    title?: string;
    required?: boolean;
    accept?: string;
    multiple?: boolean;
    clickHandler?: (e: MouseEvent<HTMLInputElement>) => void;
    focusHandler?: (e: FocusEvent<HTMLInputElement>) => void;
    changeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyUpHandler?: (e: KeyboardEvent<HTMLInputElement>) => void;
}