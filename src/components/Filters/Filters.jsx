import { useEffect, useState } from 'react';
import { Input } from '../Input/Input';
import filtersStyle from './Filters.module.css';
import { locations } from './filterData';

export const Filters = ({ onSelect }) => {
    const [filters, setFilters] = useState([]);

    const handleSelect = (e) => {
        setFilters(
            (prev) => {
                if (e?.target?.checked) {
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
