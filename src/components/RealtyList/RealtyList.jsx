import { List } from '../List/List';
import { RealtyCard } from '../RealtyCard/RealtyCard';

const RealtyList = ({ realties }) => {
    return (
        <List>
            {realties.map((realty) => {
                const {
                    _id,
                    name,
                    realtyType,
                    ownership,
                    ownershipPeriod,
                    roiSale,
                    roiRent,
                    priceMin,
                    priceMax,
                    squareMin,
                    squareMax,
                    bedrooms,
                    windowView,
                    landSquare,
                    location,
                    occupancy,
                    beachDistance,
                    livingPossibility,
                    constructionStatus,
                    description,
                    images,
                } = realty;

                return  (
                    <RealtyCard
                        key={_id}
                        id={_id}
                        name={name}
                        realtyType={realtyType}
                        ownership={ownership}
                        ownershipPeriod={ownershipPeriod}
                        roiSale={roiSale}
                        roiRent={roiRent}
                        priceMin={priceMin}
                        priceMax={priceMax}
                        squareMin={squareMin}
                        squareMax={squareMax}
                        bedrooms={bedrooms}
                        windowView={windowView}
                        landSquare={landSquare}
                        location={location}
                        occupancy={occupancy}
                        beachDistance={beachDistance}
                        livingPossibility={livingPossibility}
                        constructionStatus={constructionStatus}
                        description={description}
                        images={images}
                    />
                );
            })}
        </List>
    );
}

export default RealtyList;
