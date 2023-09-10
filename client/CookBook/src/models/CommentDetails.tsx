import { Like } from "./LikeDetails";

export interface Comment {
    uid: string;
    postId: string;
    commentId: string;
    comment: string;
    likes: Like[] | null;
    // replies: Replies[]; // is this how we do it?
    createdAt: string;
    updatedAt: string;
}