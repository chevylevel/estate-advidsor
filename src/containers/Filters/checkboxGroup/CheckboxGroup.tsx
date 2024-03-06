import {
    ChangeEvent,
    FC,
    useEffect,
    useState,
} from 'react';

import checkboxGroupStyles from './CheckboxGroup.module.css';

interface CheckboxGroupPropsType {
    onSetFilter: (filter) => void,
    options: {
        _id: string,
        name: string,
    }[],
    label: string;
    filterName: string,
}

const CheckboxGroup: FC<CheckboxGroupPropsType> = ({
    onSetFilter,
    options,
    label,
    filterName,
}) => {
    const [checkedOptions, setCheckedOptions] = useState([])

    const handleCheckOption = (e: ChangeEvent<HTMLInputElement>) => {
        const currentOption = e.currentTarget.value

        if (e.currentTarget.checked) {
            setCheckedOptions(prev => [...prev, currentOption])
        } else {
            setCheckedOptions(prev => prev.filter(location => location != currentOption));
        }
    }

    useEffect(
        () => {
            onSetFilter({ [filterName]: checkedOptions });
        },
        [checkedOptions],
    );

    return (
        <div className={checkboxGroupStyles.content}>
            <label>{label}</label>

            {options.map(({ _id, name }) => (
                <div
                    key={_id}
                    style={{ display: 'flex' }}
                >
                    <input
                        type={'checkbox'}
                        onChange={handleCheckOption}
                        value={name}
                    />

                    {name}
                </div>
            ))}
        </div>
    );
}

export default CheckboxGroup;
