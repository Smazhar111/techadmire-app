import axios from "axios";
import authHeader from './AuthHeader';
const REST_API_BASE_URL = "http://localhost:8080/tech-admire/api"

export const registerAPICall = (registerObj) => axios.post(REST_API_BASE_URL + '/auth/signup', registerObj);
export const loginAPICall = async (signInObj) => {
    const response = await fetch(REST_API_BASE_URL + '/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signInObj),
        credentials: 'include', // Include credentials (cookies)
    });

    return response; // Return the response object
};
export const saveApplicationCall = async (applicationObj) => {
    const token = localStorage.getItem('token'); 

    try {
        const response = await fetch(REST_API_BASE_URL + '/auth/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`, 
            },
            body: JSON.stringify(applicationObj), 
        });

        // Check if the response is OK
        if (!response.ok) {
            const errorText = await response.text(); // Get the error text
            throw new Error(errorText || 'Error saving application');
        }

        // Parse the response data
        const data = await response.json();
        return data; // Return success response
    } catch (error) {
        console.error('Error in saveApplicationCall:', error);
        throw error; // Propagate error
    }
};
