import { useCallback, useEffect, useMemo, useState } from 'react';

import { Realty } from '../models/Realty'

type FiltersType = {
    price: [min?: number, max?: number],
    withInstallment: boolean | null,
    livingSpace: [min?: number, max?: number],
    landSquare: [min?: number, max?: number],
    ownership: string[],
    location: string[],
    type: string[],
    withView: boolean | null,
    isPossibleToStay: boolean | null,
    bedrooms: string[],
    constructionDeadline: [year: number, quarter: number],
}

export const useFilters = (
    realties: Realty[],
) => {
    const [filters, setFilters] = useState<FiltersType>({
        price: [],
        livingSpace: [],
        landSquare: [],
        ownership: [],
        location: [],
        type: [],
        bedrooms: [],
        constructionDeadline: [(new Date()).getFullYear() + 5, 0],
        withInstallment: null,
        withView: null,
        isPossibleToStay: null,
    });

    const filteredRealties = useMemo(
        () => realties.filter((realty) => {
            const [minPrice, maxPrice] = filters.price;
            const [minLivingSpace, maxLivingSpace] = filters.livingSpace;
            const [minLandSquare, maxLandSquare] = filters.landSquare;

            return (
                (
                    (realty.priceMin &&  minPrice)
                        ? realty.priceMin >= minPrice
                        : true
                            && (realty.priceMax && maxPrice)
                                ? realty.priceMax <= maxPrice
                                : true
                )

                && (
                    (realty.landSquareMin && minLivingSpace)
                        ? realty.squareMin >= minLivingSpace
                        : true
                            && (realty.squareMax && maxLivingSpace)
                                ? realty.squareMax <= maxLivingSpace
                                : true
                )

                && (
                    (realty.landSquareMin && minLandSquare)
                        ? realty.landSquareMin >= minLandSquare
                        : true
                            && (realty.landSquareMax && maxLandSquare)
                                ? realty.landSquareMax <= maxLandSquare
                                : true
                )

                && (
                    filters.location.length
                        ? filters.location.includes(realty.location)
                        : true
                )

                && (filters.withInstallment ? realty.withInstallment : true)

                && (filters.withView ? realty.withView : true)

                && (filters.isPossibleToStay ? realty.isPossibleToStay : true)

                && (
                    !!filters.ownership.length
                        ? filters.ownership.includes('freehold') && realty.ownership === 'freehold'
                            || filters.ownership.includes('leasehold') && realty.ownership === 'leasehold'
                        : true
                )

                && (
                    !!filters.type.length
                        ? filters.type.includes('villa') && realty.type === 'villa'
                            || filters.type.includes('apartment') && realty.type === 'apartment'
                            || filters.type.includes('penthouse') && realty.type === 'penthouse'
                        : true
                )

                && (
                    !!filters.bedrooms.length
                        ? filters.bedrooms.includes('1') && realty.bedrooms === 1
                            || filters.bedrooms.includes('2') && realty.bedrooms === 2
                            || filters.bedrooms.includes('3') && realty.bedrooms === 3
                            || filters.bedrooms.includes('4') && realty.bedrooms === 4
                            || filters.bedrooms.includes('5+') && realty.bedrooms >= 5
                        : true
                )

                && (
                    !!filters.constructionDeadline.length && !!realty.constructionDeadlineYear
                        ? realty.constructionDeadlineYear <= filters.constructionDeadline[0]
                            && realty.constructionDeadlineQuarter <= filters.constructionDeadline[1]
                        : true
                )

                );
        }),
        [filters, realties],
    );

    const mergeFilters = useCallback((filter) => {
        setFilters(prev => ({...prev, ...filter}))
    }, [setFilters]);

    return {
        filteredRealties,
        setFilters: mergeFilters,
    }
}
