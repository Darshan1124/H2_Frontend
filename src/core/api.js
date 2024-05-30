import { Platform } from 'react-native';

export const ADDRESS = Platform.OS === 'ios' ? '192.168.213.184:8000' : '192.168.213.184:8000';

const baseUrl = `http://${ADDRESS}`;

// Function for making a GET request
export const getApi = async (url) => {
  try {
    const response = await fetch(baseUrl + url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('GET request error:', error);
    throw error;
  }
};

// Function for making a POST request
export const postApi = async (url, data) => {
  try {
    const response = await fetch(baseUrl + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('POST request error:', error);
    throw error;
  }
};
