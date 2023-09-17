import { IUserServices } from "./IUserServices";
import { getAuth } from "@firebase/auth";
import axios from '../Utilities/axiosConfig';

class UserServices implements IUserServices {
    async register(userProfileData: any, csrfToken: string | null): Promise<any> {
        const formData = new FormData();

        // Convert the userProfileData to a JSON string
        const userDataJSON = JSON.stringify(userProfileData);
        
        // Append this JSON string to formData under the key 'user_data'
        formData.append('user_data', userDataJSON);

        // Creates the user in the backend
        const response = await axios.post('http://127.0.0.1:8000/api/user/', formData, {
            headers: {
                'X-CSRFToken': csrfToken,
            }
        });
        
        return response.data;
    }

    async login(user: any): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
    }

    async logout(): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
    }

    async getUser(id: string): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
    }

    async updateUser(id: string, user: any): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
    }

    async deleteUser(id: string): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
    }

    async followUser(id: string): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
    }

    async unfollowUser(id: string): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
    }

    async getFollowers(id: string): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
    }

    async getFollowing(id: string): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
    }

    async searchUsers(query: string): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
    }
}

export default UserServices;