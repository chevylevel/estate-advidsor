import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useLocations } from '~/src/hooks/useLocations';

import locationFilterStyles from './LocationFilter.module.css';

interface LocationFilterPropsType {
    onSetFilter: (filter) => void
}

const LocationFilter: FC<LocationFilterPropsType> = ({
    onSetFilter,
}) => {
    const { locations } = useLocations();
    const [checkedLocations, setCheckedLocations] = useState([])

    const handleChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
        const currentLocation = e.currentTarget.value

        if (e.currentTarget.checked) {
            setCheckedLocations(prev => [...prev, currentLocation])
        } else {
            setCheckedLocations(prev => prev.filter(location => location != currentLocation));
        }
    }

    useEffect(
        () => {
            onSetFilter({ locations: checkedLocations });
        },
        [checkedLocations],
    );

    return (
        <div className={locationFilterStyles.content}>
            <div>Location</div>

            {locations.map(({ _id, name }) => (
                <div
                    key={_id}
                    style={{ display: 'flex' }}
                >
                    <input
                        type={'checkbox'}
                        value={name}
                        onChange={handleChangeLocation}
                    />

                    {name}
                </div>
            ))}
        </div>
    );
}

export default LocationFilter;
