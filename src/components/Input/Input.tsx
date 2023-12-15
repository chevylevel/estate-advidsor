import type  { ChangeEvent, FC, HTMLInputTypeAttribute } from 'react';

import input from './Input.module.css';

interface InputPropsType {
    labelText?: string;
    placeholderText?: string;
    type: HTMLInputTypeAttribute
    value?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputPropsType> = ({
    labelText,
    placeholderText,
    type,
    value,
    onChange,
}) => (
    <div className={input.content}>
        <label className={input.label}>
            {labelText}
        </label>

        <input
            className={input.inputField}
            placeholder={placeholderText}
            type={type}
            value={value}
            onChange={onChange}
        />
    </div>
);

