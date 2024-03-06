import { ChangeEvent, FC, useContext, useState } from 'react';
import { Realty } from '~/src/models/Realty';

interface TypeFieldPropsType {
    initialRealty: Realty;
};

const TypeField:FC<TypeFieldPropsType> = ({
    initialRealty,
}) => {
    const [type, setType] = useState(initialRealty?.type);

    const handleSelectType = (e: ChangeEvent<HTMLSelectElement>) => {
        setType(e.currentTarget.value);
    }

    return(
        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
            <label
                htmlFor='realty-type-select'
                style={{ marginRight: '10px', fontSize: 'small' }}
            >
                Тип недвижимости
            </label>

            <select
                id='realty-type-select'
                name={'type'}
                style={{ padding: '5px'}}
                value={type}
                onChange={handleSelectType}
            >
                <option value={'apartment'}>apartment</option>
                <option value={'penthouse'}>penthouse</option>
                <option value={'villa'}>villa</option>
            </select>
        </div>
    );
}

export default TypeField;
