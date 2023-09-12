import { IPostServices } from './IPostServices'
import { PostDetails } from '../../models/PostDetails';

class PostServices implements IPostServices {

    async createPost(post: PostDetails): Promise<any> {
        const formData = new FormData();
        if (post.file) {
            formData.append('file', post.file);
        }
        if (post.description) {
            formData.append('description', post.description);
        }
        
        const response = await fetch('/your-post-create-endpoint', {
            method: 'POST',
            body: formData,
        });
        return response.json();
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

