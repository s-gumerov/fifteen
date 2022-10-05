import { IInputProps } from './types';

export const Input = (
    {
        id,
        name,
        type = 'text',
        className,
        placeholder='',
        disabled=false,
        value='',
        accept,
        multiple,
        pattern,
        title,
        required,
        focusHandler,
        changeHandler,
        onKeyUpHandler,
    }: IInputProps
): JSX.Element => (
    <input
        id={id}
        name={name}
        type={type}
        className={className}
        placeholder={placeholder}
        disabled={disabled}
        pattern={pattern}
        title={title}
        value={value}
        accept={accept}
        multiple={multiple}
        required={required}
        onFocus={focusHandler}
        onChange={changeHandler}
        onKeyUp={onKeyUpHandler}
    />
)