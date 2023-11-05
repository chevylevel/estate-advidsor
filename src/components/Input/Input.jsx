import { useCallback, useState } from 'react';
import input from './Input.module.css';

export const Input = ({
    labelText,
    placeholderText,
    inintialValue = '',
    isChecked,
    onChange,
    ...otherProps
}) => {
    const [value, setValue] = useState(inintialValue);

    const handleInput = useCallback(
        (e) => setValue(e.target.value),
        [],
    )

    return (
        <div className={input.content}>
            <label className={input.label}>
                {labelText}
            </label>

            <input
                className={input.inputField}
                placeholder={placeholderText}
                value={value}
                onInput={handleInput}
                onChange={onChange}
                {...otherProps}
            />
        </div>
    );
}
