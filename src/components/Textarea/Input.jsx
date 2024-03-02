import textarea from './TextArea.module.css';

export const TextArea = ({
    labelTextNode,
    placeholderText,
    rows,
}) => {
    return (
        <div className={textarea.content}>
            <label className={textarea.label}>
                {labelTextNode}
            </label>

            <input
                className={` ${textarea.inputField} ${textarea[resize]}`}
                rows={rows}
                placeholder={placeholderText}
            />
        </div>
    );
}
