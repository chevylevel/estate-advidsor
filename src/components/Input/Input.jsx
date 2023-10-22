import { useState } from 'react';
import input from './Input.module.css';

export const Input = ({
    labelText,
    placeholderText,
    value,
    isChecked,
    onChange,
    ...otherProps
}) => {
    return (
        <div className={input.content}>
            <label className={input.label}>
                {labelText}
            </label>

            <input
                className={input.inputField}
                placeholder={placeholderText}
                value={value}
                onChange={onChange}
                {...otherProps}
            />
        </div>
    );
}
