import axios from 'axios';

const csrfToken = getCookie('csrftoken');

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
	const nameLenPlus = (name.length + 1);
	return document.cookie
		.split(';')
		.map(c => c.trim())
		.filter(cookie => {
			return cookie.substring(0, nameLenPlus) === `${name}=`;
		})
		.map(cookie => {
			return decodeURIComponent(cookie.substring(nameLenPlus));
		})[0] || null;
}
export default axiosInstance;
