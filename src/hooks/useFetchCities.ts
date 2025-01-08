// src/hooks/useFetchCities.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { calculateDistance } from '../utils';
import { City } from '../interfaces';




const FIREBASE_URL = 'https://orbidi-7255f-default-rtdb.firebaseio.com/data.json';

export const useFetchCities = () => {
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<City[]>(FIREBASE_URL);
                setCities(response.data);
            } catch (err) {
                setError('Failed to fetch city data.');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const findClosestCities = (selectedCity: City) => {
        const distances = cities
            .map(city => ({
                ...city,
                distance: calculateDistance(
                    parseFloat(selectedCity.lat),
                    parseFloat(selectedCity.lng),
                    parseFloat(city.lat),
                    parseFloat(city.lng)
                ),
            }))
            .filter(city => city.name !== selectedCity.name)
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 4);

        return distances;
    };

    return { cities, loading, error, findClosestCities };
};
