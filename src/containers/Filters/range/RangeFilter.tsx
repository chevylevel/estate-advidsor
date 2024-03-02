import { FC, useContext, useEffect, useState } from 'react';

import InputRange from '~/src/components/InputRange/InputRange';

import rangeFilterStyles from './RangeFilter.module.css';
import useRealtyFieldRange from '~/src/hooks/useRealtyFieldRange';
import { NumberRealtyField } from '~/src/types';
import { useDebounce } from 'ahooks';
import { Context } from '~/src/AppWrapper';

interface RangeFilterPropsType {
    step: number,
    label: string,
    name: string,
    minKey: NumberRealtyField;
    maxKey: NumberRealtyField;
    unit: string,
    onSetFilter: (range) => void;
}

const RangeFilter: FC<RangeFilterPropsType> = ({
    step,
    label,
    name,
    minKey,
    maxKey,
    unit,
    onSetFilter,
}) => {
    const { store } = useContext(Context);

    const [min, max] = useRealtyFieldRange(minKey, maxKey, store.realties);
    const [range, setRange] = useState([]);
    const debouncedRange = useDebounce(range, { wait: 500 });

    const handleChangeRange = (range) => {
        setRange(range);
    }

    useEffect(() => {
        onSetFilter({ [name]: range });
    }, [debouncedRange]);

    return (
        <div className={rangeFilterStyles.content}>
            <div className={rangeFilterStyles.name}>{label}</div>

            <InputRange
                onChangeRange={handleChangeRange}
                min={min}
                max={max}
                step={step}
            />

            <div className={rangeFilterStyles.values}>
                <div>{range[0]}</div>
                <div>{range[1]}{unit}</div>
            </div>
        </div>
    );
}

export default RangeFilter;
