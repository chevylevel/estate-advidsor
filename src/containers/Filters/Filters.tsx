import {
    FC, useContext,
} from 'react';

import filtersStyles from './Filters.module.css';
import RangeFilter from './range/RangeFilter';
import CheckboxGroup from './checkboxGroup/CheckboxGroup';
import { Context } from '../../AppWrapper';
import Checkbox from './checkbox/Checkbox';
import filters from './filtersData';
import Limit from './limit/Limit';

type FilterPropsType = {
    onSetFilters: (filter) => void;
};

const Filters: FC<FilterPropsType> = ({
    onSetFilters,
}) => {
    const { store } = useContext(Context);

    return (
        <div className={filtersStyles.content}>
            <div className={filtersStyles.block}>

            </div>

            <div className={filtersStyles.block}>
                <div className={filtersStyles.ranges}>
                    <RangeFilter
                        step={10000}
                        unit={'$'}
                        label={'Price'}
                        filterName={'price'}
                        minKey={'priceMin'}
                        maxKey={'priceMax'}
                        onSetFilter={onSetFilters}
                    />

                    <Checkbox
                        onSetFilter={onSetFilters}
                        filterName={'withInstallment'}
                        label={'With installment'}
                    />
                </div>
            </div>

            <div className={filtersStyles.block}>
                <RangeFilter
                    step={10}
                    unit={' sq. m'}
                    label={'Living space'}
                    filterName={'livingSpace'}
                    minKey={'squareMin'}
                    maxKey={'squareMax'}
                    onSetFilter={onSetFilters}
                />

                <RangeFilter
                    step={10}
                    unit={' sq. m'}
                    label={'Land square'}
                    filterName={'landSquare'}
                    minKey={'landSquareMin'}
                    maxKey={'landSquareMax'}
                    onSetFilter={onSetFilters}
                />
            </div>

            <div className={filtersStyles.block}>
                <CheckboxGroup
                    label={'Ownership'}
                    options={filters.ownership}
                    onSetFilter={onSetFilters}
                    filterName={'ownership'}
                />
            </div>

            <div className={filtersStyles.block}>
                <CheckboxGroup
                    label={'Location'}
                    options={store.locations}
                    filterName={'location'}
                    onSetFilter={onSetFilters}
                />
            </div>

            <div className={filtersStyles.block}>
                <CheckboxGroup
                    label={'type'}
                    options={filters.type}
                    filterName={'type'}
                    onSetFilter={onSetFilters}
                />
            </div>

            <div className={filtersStyles.block}>

                <Checkbox
                    filterName={'withView'}
                    label={'With view'}
                    onSetFilter={onSetFilters}
                />
                <Checkbox
                    filterName={'isPossibleToStay'}
                    label={'Possible to stay'}
                    onSetFilter={onSetFilters}
                />
            </div>

            <div className={filtersStyles.block}>
                <CheckboxGroup
                    label={'Bedrooms'}
                    options={filters.bedrooms}
                    filterName={'bedrooms'}
                    onSetFilter={onSetFilters}
                />
            </div>

            <div className={filtersStyles.block}>
                <Limit
                    label={'Construction deadline'}
                    filterName={'constructionDeadline'}
                    onSetFilter={onSetFilters}
                />
            </div>
        </div>
    );
}

export default Filters;
