import axios from 'axios';

const BASE_URL = 'http://13.232.249.114:5000/arccerts/v1';

export const registerUser = async(mobileNumber) => {
    try {
        const response = await axios.post(`${BASE_URL}/user/register`, {
            mobileNumber: mobileNumber,
        });
        console.log('Register User response:', response.data); // Log the response data
        return response.data; // Return the response data
    } catch (error) {
        throw new Error(error.message);
    }
};

export const checkHealthStatus = async() => {
    try {
        const response = await axios.get(`${BASE_URL}/health`);
        return response.data; // Return the response data
    } catch (error) {
        throw new Error(error.message);
    }
};