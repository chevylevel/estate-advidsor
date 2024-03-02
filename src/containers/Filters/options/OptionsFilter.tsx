import {
    ChangeEvent,
    FC,
    useEffect,
    useState,
} from 'react';

import locationFilterStyles from './LocationFilter.module.css';

interface OptionFilterPropsType {
    onSetFilter: (filter) => void,
    options: [{
        _id: string,
        name: string,
    }],
    filterName: string,
}

const OptionFilter: FC<OptionFilterPropsType> = ({
    onSetFilter,
    options,
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
            onSetFilter({ filterName: checkedOptions });
        },
        [checkedOptions],
    );

    return (
        <div className={locationFilterStyles.content}>
            <div>{filterName}</div>

            {options.map(({ _id, name }) => (
                <div
                    key={_id}
                    style={{ display: 'flex' }}
                >
                    <input
                        type={'checkbox'}
                        value={name}
                        onChange={handleCheckOption}
                    />

                    {name}
                </div>
            ))}
        </div>
    );
}

export default OptionFilter;
