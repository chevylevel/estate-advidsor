import {
    FC,
} from 'react';

import filtersStyles from './Filters.module.css';
import LocationFilter from './location/LocationFilter';
import RangeFilter from './range/RangeFilter';

type FilterPropsType = {
    onSetFilters: (filter) => void;
};

const Filters: FC<FilterPropsType> = ({
    onSetFilters,
}) => {
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
                        name={'price'}
                        minKey={'priceMin'}
                        maxKey={'priceMax'}
                        onSetFilter={onSetFilters}
                    />

                    <RangeFilter
                        step={10}
                        unit={' sq. m'}
                        label={'Living space'}
                        name={'livingSpace'}
                        minKey={'squareMin'}
                        maxKey={'squareMax'}
                        onSetFilter={onSetFilters}
                    />

                    <RangeFilter
                        step={10}
                        unit={' sq. m'}
                        label={'Land square'}
                        name={'landSquare'}
                        minKey={'landSquareMin'}
                        maxKey={'landSquareMax'}
                        onSetFilter={onSetFilters}
                    />
                </div>
            </div>

            <div className={filtersStyles.block}>
                <LocationFilter onSetFilter={onSetFilters}/>
            </div>
        </div>
    );
}

export default Filters;
