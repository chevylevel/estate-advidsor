import textarea from './Textarea.module.css';

export const Textarea = ({
    labelText,
    placeholderText,
    value,
    rows,
}) => {
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
            />
        </div>
    );
}
