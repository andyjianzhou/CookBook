import React from 'react';
import Post from '../Post/Post';
import PostServices from '../Services/PostServices';
import { useQuery } from 'react-query';

const Feed: React.FC = () => {
    const postService = new PostServices();

    const { data, isLoading, isError, error, refetch } = useQuery('posts', postService.getPosts, {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: false,
    });

    React.useEffect(() => {
        const handleNewPost = () => {
            refetch();
        };

        // Listen for any event that signifies a new post has been made
        window.addEventListener('newPost', handleNewPost);

        return () => {
            window.removeEventListener('newPost', handleNewPost);
        };
    }, [refetch]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;

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
