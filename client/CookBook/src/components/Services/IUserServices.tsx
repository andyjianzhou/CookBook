export interface IUserServices {
    register: (user: any) => Promise<any>;
    login: (user: any) => Promise<any>;
    logout: () => Promise<any>;
    getUser: (id: string) => Promise<any>;
    updateUser: (id: string, user: any) => Promise<any>;
    deleteUser: (id: string) => Promise<any>;
    followUser: (id: string) => Promise<any>;
    unfollowUser: (id: string) => Promise<any>;
    getFollowers: (id: string) => Promise<any>;
    getFollowing: (id: string) => Promise<any>;
    searchUsers: (query: string) => Promise<any>;
}