// styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#121212',
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
        color: 'white',
    },
    cityItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        backgroundColor: '#333',  // Ensure visibility of items
    },
    label: {
        color: 'white',
        fontSize: 18,
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    closestCitiesContainer: {
        marginTop: 20,
    },
});
