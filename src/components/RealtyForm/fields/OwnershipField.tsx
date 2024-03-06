import { ChangeEvent, FC, useState } from 'react';

import { Input } from '../../Input/Input';
import { Realty } from '~/src/models/Realty';

interface OwnershipFieldPropsType {
    initialRealty: Realty;
};

const OwnershipField:FC<OwnershipFieldPropsType> = ({
    initialRealty,
}) => {
    const [isFreehold, setIsFreehold] = useState(initialRealty?.ownership === 'freehold');
    const [ownership, setOwnership] = useState(initialRealty?.ownership);

    const handleSelectOwnership = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value;

        setOwnership(value);
        setIsFreehold(value === 'freehold');
    }

    return(
        <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'space-between', alignItems: 'start'}}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label
                    htmlFor='ownership-select'
                    style={{ marginRight: '10px', fontSize: 'small' }}
                >
                    Тип владения
                </label>

                <select
                    id={'ownership-select'}
                    name={'ownership'}
                    style={{ padding: '5px'}}
                    value={ownership}
                    onChange={handleSelectOwnership}
                >
                    <option value={'freehold'}>freehold</option>
                    <option value={'leasehold'}>leasehold</option>
                </select>
            </div>

            <div style={{ marginTop: '5px' }}>
                <Input
                    label={'Срок'}
                    name={'ownershipPeriod'}
                    disabled={isFreehold}
                    initialValue={initialRealty?.ownershipPeriod ?? ''}
                />
            </div>
        </div>
    );
}

export default OwnershipField;
