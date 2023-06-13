// hooks.js
import { useState } from 'react';
import { registerUser, checkHealthStatus } from '../Service';

export const useRegistration = () => {
    const register = async(mobileNumber) => {
        try {
            const response = await registerUser(mobileNumber);
            console.log('Registration response:', response); // Log the response data
            return response; // Return only the response data
        } catch (error) {
            throw new Error(error.message);
        }
    };

    return {
        register,
    };
};

export const useHealthStatus = () => {
    const [healthStatus, setHealthStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchHealthStatus = async() => {
        try {
            setIsLoading(true);
            const response = await checkHealthStatus();
            console.log('Health Status response:', response.data); // Log the response data
            setHealthStatus(response.status);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        healthStatus,
        isLoading,
        error,
        fetchHealthStatus,
    };
};