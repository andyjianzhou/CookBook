import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const csrfToken = getCookie('csrftoken');

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true, // This ensures cookies are sent with requests
    headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': csrfToken, // Set the token fetched from the cookie
    },
    // any other defaults you want
});

function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length > 1) return parts[1].split(';')[0];
    return null;
}

export default axiosInstance;