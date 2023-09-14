export interface ProfileDetails {
    userId: string;
    userName: string;
    userAvatar: string;
    userEmail: string;
    userBio: string;
    userPosts: string[];
    userFollowers: string[];
    userFollowing: string[];
    createdAt: Date;
    updatedAt: Date | null;
    // comments: Comment[];
    // likes: Like[];
    // recipes: Recipe[];
}