import React from 'react';
import Post from '../Post/Post';
import PostServices from '../Services/PostServices';
import { useQuery } from 'react-query';

const Feed: React.FC = () => {
    const postServices = new PostServices();

    const { data, isLoading, isError, error } = useQuery('posts', postServices.getPosts);
        
    if (isLoading) return <div>Loading...</div>;
    if (isError || !data) return <div>Failed to fetch posts. Please try again later.</div>;
    
    const sortedPosts = [...data].sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div>
            {sortedPosts.map((post) => (
                <Post
                    key={post.id}
                    postId={post.id}
                    userId={post.userId}
                    userName={post.username}
                    content={post.content}
                    mediaFiles={post.media_file}
                    createdAt={new Date(post.createdAt)}
                />
            ))}
        </div>
    );
}

export default Feed;
