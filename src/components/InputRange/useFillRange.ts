import { FormEvent, useCallback, useEffect, useState } from 'react';

export default function useFillInputRange({
    fromRef,
    toRef,
    min,
    max,
}) {
    const getParsedValue = useCallback(
        () => {
            const fromValue = parseInt(fromRef.current?.value);
            const toValue = parseInt(toRef.current?.value);

            return [fromValue, toValue];
        },
        [
            fromRef.current?.value,
            toRef.current?.value,
        ],
    )

    const fillRange = useCallback(
        () => {
            const [fromValue, toValue] = getParsedValue();

            const from = (fromValue - min) / (max - min) * 100;
            const to = (toValue - min) / (max - min) * 100;

            const start = Math.min(from, to);
            const end = Math.max(from, to);

            toRef.current.style.background = `linear-gradient(
                to right,
                #a2a3ad,
                #a2a3ad ${start}%,
                #3e4cec ${start}%,
                #3e4cec ${end}%,
                #a2a3ad ${end}%,
                #a2a3ad 100%
            )`;
        },
        [
            getParsedValue,
            toRef.current
        ],
    );

    useEffect(
        () => {
            if (!fromRef.current || !toRef.current) {
                return;
            }

            fromRef.current.style.zIndex = '2';
            toRef.current.style.zIndex = '1';

            fillRange();
        },
        [
            fromRef.current?.value,
            toRef.current?.value,
        ]
    );
}
