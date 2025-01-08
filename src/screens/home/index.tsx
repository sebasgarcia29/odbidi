// src/components/Home.tsx
import React, { useState } from 'react';
import { Text, View, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFetchCities } from '../../hooks/useFetchCities';
//import cities from '../../data/data.json';
import { City } from '../../interfaces';
import { styles } from './styles';

export const Home = () => {
    const [query, setQuery] = useState('');
    const [filteredCities, setFilteredCities] = useState<City[]>([]);
    const [closestCities, setClosestCities] = useState<typeof filteredCities>([]);
    const { cities, loading, error, findClosestCities } = useFetchCities();

    const handleInputChange = (text: string) => {
        setQuery(text);
        if (text.trim() === '') {
            setFilteredCities([]);
            return;
        }
        const filtered = cities.filter(city =>
            city.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredCities(filtered);
    };

    const handleCitySelect = (city: City) => {
        setQuery(city.name);
        setFilteredCities([]);
        const nearestCities = findClosestCities(city);
        setClosestCities(nearestCities);
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter city name..."
                placeholderTextColor="gray"
                value={query}
                onChangeText={handleInputChange}
            />

            {error && <Text style={styles.error}>{error}</Text>}
            {loading ? (
                <ActivityIndicator size="large" color="white" />
            ) : (
                <>
                    {filteredCities.length > 0 && (
                        <FlatList
                            data={filteredCities}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        style={styles.cityItem}
                                        onPress={() => handleCitySelect(item)}
                                    >
                                        <Text style={styles.label}>{item.name}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    )}

                    {closestCities.length > 0 && (
                        <View style={styles.closestCitiesContainer}>
                            <Text style={styles.label}>Closest Cities:</Text>
                            <FlatList
                                data={closestCities}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <Text style={styles.label}>
                                        {item.name} ({(item?.distance ?? 0).toFixed(2)} km)
                                    </Text>
                                )}
                            />
                        </View>
                    )}
                </>
            )}
        </View>
    );
};



export default Home;
