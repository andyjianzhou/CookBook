import { Like } from "./LikeDetails";
import { Comment } from "./CommentDetails";

export interface PostDetails {
    uid: string;
    postId: string;
    title: string;
    description: string;
    // ingredients: string;
    // steps: string;
    likes: Like[];
    comments: Comment[];
    createdAt: string;
    updatedAt: string;
}