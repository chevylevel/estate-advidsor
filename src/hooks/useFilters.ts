import { useCallback, useEffect, useMemo, useState } from 'react';

import { Realty } from '../models/Realty'

type FiltersType = {
    price: [min?: number, max?: number],
    livingSpace: [min?: number, max?: number],
    locations: string[],
    landSquare: [min?: number, max?: number],
}

export const useFilters = (
    realties: Realty[],
) => {
    const [filters, setFilters] = useState<FiltersType>({
        price: [],
        livingSpace: [],
        locations: [],
        landSquare: [],
    })

    const filteredRealties = useMemo(
        () => realties.filter((realty) => {
            const [minPrice, maxPrice] = filters.price;
            const [minLivingSpace, maxLivingSpace] = filters.livingSpace;

            return (
                (realty.priceMin >= minPrice
                && realty.priceMax <= maxPrice)

                && (realty.squareMin >= minLivingSpace
                && realty.squareMax <= maxLivingSpace)

                && (filters.locations.length
                    ? filters.locations.includes(realty.location)
                    : true)
            );
        }),
        [filters, realties],
    );

    const mergeFilters = (filter) => {
        setFilters(prev => ({...prev, ...filter}))
    };

    console.log(filters);

    return {
        filteredRealties,
        setFilters: mergeFilters,
    }
}
