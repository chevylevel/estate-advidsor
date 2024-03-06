import { ChangeEvent, FC, useContext, useState } from 'react';
import { Input } from '../../Input/Input';
import { Realty } from '~/src/models/Realty';
import { Context } from '~/src/AppWrapper';

interface LocationFieldPropsType {
    initialRealty: Realty;
};

const LocationField:FC<LocationFieldPropsType> = ({
    initialRealty,
}) => {
    const { store } = useContext(Context)

    const [location, setLocation] = useState(initialRealty?.location);

    const handleChangeLocation = (e) => {
        setLocation(e.currentTarget.value);
    }

    return(
        <div style={{ marginTop: '40px' }}>
            <label
                htmlFor='location'
                style={{ marginRight: '10px', fontSize: 'small' }}
            >
                Расположение
            </label>

            <select
                id='location-select'
                name={'location'}
                style={{ padding: '5px'}}
                value={location}
                onChange={handleChangeLocation}
            >
                {store.locations.map(location => (
                    <option
                        key={location._id}
                        value={location.name}
                    >
                        {location.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default LocationField;
