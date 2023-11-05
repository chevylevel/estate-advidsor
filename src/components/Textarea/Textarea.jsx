import { useState } from 'react';
import textarea from './Textarea.module.css';

export const Textarea = ({
    labelText,
    placeholderText,
    initialValue,
    rows,
}) => {
    const [value, setValue] = useState(initialValue);

    return (
        <div className={textarea.content}>
            <label className={textarea.label}>
                {labelText}
            </label>

            <textarea
                className={textarea.inputField}
                rows={rows}
                placeholder={placeholderText}
                value={value}
                onChange={setValue}
            />
        </div>
    );
}
