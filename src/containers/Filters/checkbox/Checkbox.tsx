import {
    ChangeEvent,
    FC,
} from 'react';

import checkboxStyles from './Checkbox.module.css';

interface CheckboxPropsType {
    onSetFilter: (filter) => void;
    filterName: string;
    label: string;
}

const Checkbox: FC<CheckboxPropsType> = ({
    onSetFilter,
    filterName,
    label,
}) => {
    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        onSetFilter({ [filterName]: e.currentTarget.checked })
    }

    return (
        <div className={checkboxStyles.content}>
            <input
                type={'checkbox'}
                onChange={handleCheck}
            />
            <label>{label}</label>
        </div>
    );
}

export default Checkbox;
