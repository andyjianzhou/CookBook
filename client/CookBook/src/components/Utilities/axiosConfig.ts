import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const csrfToken = 'uQ8iq38kfgfi4VnPruJ6vwV9G83qhEni';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true, // This ensures cookies are sent with requests
    headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': csrfToken // Set the token fetched from the cookie
    },
    // any other defaults you want
});

function getCookie(name: string): string | null {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
}

export default axiosInstance;