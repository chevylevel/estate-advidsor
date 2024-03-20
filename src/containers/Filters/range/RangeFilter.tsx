import { FC, useEffect, useState } from 'react';
import { useDebounce } from 'ahooks';

import InputRange from '~/src/components/InputRange/InputRange';

import rangeFilterStyles from './RangeFilter.module.css';
import useRealtyFieldRange from '~/src/hooks/useRealtyFieldRange';
import { NumberRealtyField } from '~/src/types';
import { Realty } from '~/src/models/Realty';

interface RangeFilterPropsType {
    step: number,
    label: string,
    minKey: NumberRealtyField;
    maxKey: NumberRealtyField;
    unit: string,
    filterName: string,
    realties: Realty[]
    onSetFilter: (range) => void;
}

const RangeFilter: FC<RangeFilterPropsType> = ({
    step,
    label,
    filterName,
    minKey,
    maxKey,
    unit,
    realties,
    onSetFilter,
}) => {
    console.log('======================!!', realties);

    const [min, max] = useRealtyFieldRange(minKey, maxKey);
    const [range, setRange] = useState([min, max]);
    const debouncedRange = useDebounce(range, { wait: 500 });

    const handleChangeRange = (range) => {
        setRange(range);
    }

    useEffect(() => {
        onSetFilter({ [filterName]: range });
    }, [debouncedRange]);

    return (
        <div className={rangeFilterStyles.content}>
            <div className={rangeFilterStyles.name}>
                {label}
            </div>

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
