import { NumberRealtyField } from '~/src/types';

const useRealtyFieldRange = (
    minKey: NumberRealtyField,
    maxKey: NumberRealtyField,
    realties,
): [number, number] => realties.reduce(
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

export default useRealtyFieldRange;
