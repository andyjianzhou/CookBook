import { IPostServices } from './IPostServices'
import { PostDetails } from '../../models/PostDetails';
import axios from '../Utilities/axiosConfig';

class PostServices implements IPostServices {

    async createPost(post: PostDetails): Promise<any> {
        // transform the post to the format the backend expects
        const postData = {
            id: post.postId,
            userId: post.userId,
            content: post.description,
            media_file: post.file,
        }

        axios.post('http://127.0.0.1:8000/api/posts/', postData)
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        );
    }

  async editPost(id: string, post: any): Promise<any> {
      // actual implementation here
      return Promise.resolve();
  }

  // TODO: 
    // later use openAPI to automatically 
    //generate types which we can map it to the 
    //post type view model
  async getPosts(): Promise<any> {
    const posts = await fetch('/api/posts');
    const data = await posts.json();
    return data;
  }

  async getPost(id: string): Promise<any> {
    // placeholder implementation
    return Promise.resolve();
  }
  
  async updatePost(id: string, post: any): Promise<any> {
    // placeholder implementation
    return Promise.resolve();
  }

  async deletePost(id: string): Promise<any> {
      // placeholder implementation
      return Promise.resolve();
  }

  async createComment(id: string, comment: any): Promise<any> {
      // placeholder implementation
      return Promise.resolve();
  }

  async deleteComment(id: string, commentId: string): Promise<any> {
      // placeholder implementation
      return Promise.resolve();
  }

  async likePost(id: string): Promise<any> {
      // placeholder implementation
      return Promise.resolve();
  }

  async unlikePost(id: string): Promise<any> {
      // placeholder implementation
      return Promise.resolve();
  }

  async likeComment(id: string, commentId: string): Promise<any> {
      // placeholder implementation
      return Promise.resolve();
  }

  async unlikeComment(id: string, commentId: string): Promise<any> {
      // placeholder implementation
      return Promise.resolve();
  }

  async replyComment(id: string, commentId: string, reply: any): Promise<any> {
      // placeholder implementation
      return Promise.resolve();
  }

  async deleteReply(id: string, commentId: string, replyId: string): Promise<any> {
      // placeholder implementation
      return Promise.resolve();
  }

}

export default PostServices;

