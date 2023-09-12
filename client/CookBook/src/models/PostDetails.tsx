import { Like } from "./LikeDetails";
import { Comment } from "./CommentDetails";

export interface PostDetails {
    uid: string;
    postId: string;
    title: string;
    description: string;
    file?: File | null;
    likes: Like[];
    comments: Comment[];
    createdAt: string;
    updatedAt: string;
}