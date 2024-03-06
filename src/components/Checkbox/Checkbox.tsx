import { ChangeEvent, useState } from 'react';

const Checkbox = ({
    initialValue,
    label,
    name,
}) => {
    const [isChecked, setIsChecked] = useState(initialValue);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.currentTarget.checked);
    }

    return (
        <div style={{ marginTop: '40px' }}>
            <label htmlFor={`${name}Checkbox`}>{label}</label>
            <input
                id={`${name}Checkbox`}
                name={name}
                type={'checkbox'}
                onChange={handleChange}
                checked={isChecked}
            />
        </div>
    );
}

export default Checkbox;
