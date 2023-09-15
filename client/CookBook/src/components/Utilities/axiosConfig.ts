import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true, // This ensures cookies are sent with requests
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    // any other defaults you want
});

axiosInstance.interceptors.request.use((config) => {
    // Assuming getCookie is available in this file
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
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

function setCSRFToken(token: string) {
    axiosInstance.defaults.headers['X-CSRFToken'] = token;
}

export default axiosInstance;
export { setCSRFToken, getCookie };
