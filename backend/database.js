import AsyncStorage from "@react-native-async-storage/async-storage";

export async function loadDataFromStorage(key) {
    try {
        let data = await AsyncStorage.getItem(key); //Possibly return written
        console.log("Loaded data: ");
        console.log(data);
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function writeDataToStorage(key, value) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value)); //Possibly return written}
    } catch (error) {
        console.error(error);
    }
}