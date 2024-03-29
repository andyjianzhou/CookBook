import { IPostServices } from './IPostServices'
import { PostDetails } from '../../models/PostDetails';
import axiosInstance from '../Utilities/axiosConfig';
import axios from 'axios';

class PostServices implements IPostServices {

    async createPost(post: PostDetails, csrfToken: string | null): Promise<PostDetails> {
        // transform the post to the format the backend expects
        const formData = new FormData();
        formData.append('post_data', JSON.stringify({
            postId: post.postId,
            userId: post.userId,
            content: post.description,
        }));
        
        if (post.file) {
            formData.append('media_file', post.file, post.file.name);
        } else {
            formData.append('media_file', '');
        }
        
        try {
            const response = await axiosInstance.post('http://127.0.0.1:8000/api/posts/', formData, {
                headers: {
                    'X-CSRFToken': csrfToken,
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error creating post:", error);
            throw error;
        }
    }
    

  async editPost(id: string, post: any): Promise<any> {
      // actual implementation here
      return Promise.resolve();
  }

  // TODO: 
    // later use openAPI to automatically 
    //generate types which we can map it to the 
    //post type view model
    async getPosts(page: number): Promise<any> {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/posts/?page=${page}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch posts:', error);
            throw error;
        }
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

