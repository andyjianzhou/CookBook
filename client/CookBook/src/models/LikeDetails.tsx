// user can just like a post and not like any comment
export interface Like {
    uid: string;
    postId: string;
    commentId: string | null;
    replyId: string | null;
    createdAt: string;
    updatedAt: string;
}