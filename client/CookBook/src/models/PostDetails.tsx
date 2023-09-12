import { Like } from "./LikeDetails";
import { Comment } from "./CommentDetails";
import { User as FirebaseUser } from 'firebase/auth';

export interface PostDetails {
    postId: string;
    userId: string | undefined;
    description: string;
    file?: File | null;
    likes: Like[];
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date | null; // The user doesn't need to have updated the post
}