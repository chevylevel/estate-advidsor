import { useEffect, useState } from 'react';
import { Input } from '../Input/Input';
import filtersStyle from './Filters.module.css';
import { locations } from './filterData';

export const Filters = ({ onSelect }) => {
    const [filters, setFilters] = useState([]);

    const handleSelect = (e) => {
        console.log(e?.target?.checked, e?.target?.value);

        setFilters(
            (prev) => {
                if (e?.target?.checked) {
                    console.log('######prev:', prev);
                    return [...prev, e.target.value,];
                }

                return prev.filter((id) => e.target.value !== id);
            }
        );
    };

    useEffect(
        () => {
            onSelect(filters);
        },
        [filters],
    );

    return (
        <div className={filtersStyle.content}>
            { locations.map(({ id, name }) => (
                <Input
                    type='checkbox'
                    labelText={name}
                    value={id}
                    onChange={handleSelect}
                />
            ))}
        </div>
    );
}
