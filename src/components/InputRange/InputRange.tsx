import { useEffect, useRef, useState } from 'react';

import inputRange from './InputRange.module.css';
import useFillInputRange from './useFillRange';

const InputRange = ({
    min,
    max,
    step,
    onChangeRange,
}) => {
    const fromRef = useRef<HTMLInputElement>(null);
    const toRef = useRef<HTMLInputElement>(null);

    const [from, setFrom] = useState<number>(min);
    const [to, setTo] = useState<number>(max);

    const handleChangeFrom = (e) => {
        const currentFrom = parseInt(e.currentTarget.value);
        setFrom(currentFrom);
    };

    const handleChangeTo = (e) => {
        const currentTo = parseInt(e.currentTarget.value);
        setTo(currentTo);
    };

    useEffect(() => {
        onChangeRange([Math.min(from, to), Math.max(from, to)]);
    }, [from, to]);

    useFillInputRange({
        fromRef,
        toRef,
        min,
        max,
    });

    return (
        <div className={inputRange.content}>
            <div className={inputRange.slider}>
                <input
                    ref={fromRef}
                    className={inputRange.sliderInput}
                    type={'range'}
                    min={min}
                    max={max}
                    step={step}
                    value={from}
                    onInput={handleChangeFrom}
                />

                <input
                    ref={toRef}
                    className={inputRange.sliderInput}
                    type={'range'}
                    min={min}
                    max={max}
                    step={step}
                    value={to}
                    onInput={handleChangeTo}
                />
            </div>
        </div>
    );
}

export default InputRange;
