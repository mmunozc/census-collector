import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetZoneData } from './APIconection';

// Save data to AsyncStorage
const saveData = async (key, data) => {
    try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem(key, jsonValue);
        //console.log(`Data saved with key: ${key}`);
    } catch (error) {
        console.error('Error saving data: ', error);
    }
};

// Retrieve data from AsyncStorage
const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error('Error retrieving data: ', error);
    }
};

// Remove data from AsyncStorage
const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        //console.log(`Data removed with key: ${key}`);
    } catch (error) {
        console.error('Error removing data: ', error);
    }
};

async function fetchDataAndStoreLocally(user) {
    const data = await GetZoneData(user);
    //console.log("data", data);
    await saveData(user, data);
    // Testing, print everything in Async Storage
    //getAllAsyncStorageContents();
}

// Function to get all AsyncStorage keys and their values
async function getAllAsyncStorageContents() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const contents = await AsyncStorage.multiGet(keys);

        // contents is an array of [key, value] pairs
        console.log('AsyncStorage Contents:', contents);
    } catch (error) {
        console.error('Error fetching AsyncStorage contents:', error);
        throw error;
    }
}


export { saveData, getData, removeData, fetchDataAndStoreLocally };
