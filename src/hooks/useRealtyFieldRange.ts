import { useContext } from 'react';
import { NumberRealtyField } from '~/src/types';
import { Context } from '../app/Context';

const useRealtyFieldRange = (
    minKey: NumberRealtyField,
    maxKey: NumberRealtyField,
): [number, number] => {
    const { store } = useContext(Context);

    const realties = store.realties;

    return realties.map(item => ({...item})).reduce(
        (range, realty) => {
            if (realty[minKey] && realty[minKey] < range[0]) {
                range[0] = realty[minKey];
            }

            if (realty[maxKey] && realty[maxKey] > range[1]) {
                range[1] = realty[maxKey];
            }

            return range;
        },
        [realties[0] ? realties[0][minKey] : 0, 0],
    );
};

export default useRealtyFieldRange;
