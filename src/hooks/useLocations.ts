import { useEffect, useState } from 'react';
import { API_URL } from '~/config';

export const useLocations = () => {
    const [locations, setLocations] = useState([]);

    const fetchLocations = async () => {
        try {
            const res = await fetch(`${API_URL}/locations`);
            const data =  await res.json();

            setLocations(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(
        () => {
            fetchLocations();
        },
        [],
    )

    return {
        locations,
        fetchLocations,
    }
}
