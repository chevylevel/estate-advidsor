import  { useState, type FC, type InputHTMLAttributes, type ReactNode, useCallback, forwardRef, Ref } from 'react';

import input from './Input.module.css';

interface InputPropsType extends InputHTMLAttributes<HTMLInputElement> {
    className?: string,
    label?: string,
    initialValue?: string | number,
    onChange?: (value) => void,
}

export const Input = forwardRef <HTMLInputElement, InputPropsType>(({
    className = '',
    label = '',
    initialValue = '',
    onChange = (e) => {},
    ...otherProps
}, ref) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
        setValue(e.currentTarget.value);
        onChange(e.currentTarget.value);
    }

    return (
        <div className={className + input.content}>
            {label && (
                <div className={input.label}>
                    <label>{label}</label>
                </div>
            )}

            <input
                ref={ref}
                className={input.inputField}
                value={value}
                onChange={handleChange}
                {...otherProps}
            />
        </div>
    );
});
