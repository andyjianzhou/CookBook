import { PostDetails } from "../../models/PostDetails";

export interface IPostServices {
    createPost: (post: PostDetails) => Promise<any>;
    editPost: (id: string, post: PostDetails) => Promise<any>;
    getPosts: () => Promise<any>;
    getPost: (id: string) => Promise<any>;
    updatePost: (id: string, post: PostDetails) => Promise<any>;
    deletePost: (id: string) => Promise<any>;
    createComment: (id: string, comment: any) => Promise<any>;
    deleteComment: (id: string, commentId: string) => Promise<any>;
    likePost: (id: string) => Promise<any>;
    unlikePost: (id: string) => Promise<any>;
    likeComment: (id: string, commentId: string) => Promise<any>;
    unlikeComment: (id: string, commentId: string) => Promise<any>;
    replyComment: (id: string, commentId: string, reply: any) => Promise<any>;
    deleteReply: (id: string, commentId: string, replyId: string) => Promise<any>;
}