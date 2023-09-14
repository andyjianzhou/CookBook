import { IUserServices } from "./IUserServices";
import { getAuth } from "@firebase/auth";

class UserServices implements IUserServices {
    async register(user: any): Promise<any> {
        // placeholder implementation
        return Promise.resolve();
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