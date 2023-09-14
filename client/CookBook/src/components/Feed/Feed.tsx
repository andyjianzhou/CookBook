import React from 'react';
import Post from '../Post/Post'; // or wherever your Post component is located
import PostServices from '../Services/PostServices'; // adjust the path as necessary

const Feed: React.FC = () => {
    const postServices = new PostServices();
    const [posts, setPosts] = React.useState<any[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await postServices.getPosts();
                // Sort posts by createdAt descending
                data.sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                });
                setPosts(data);
            } catch (err) {
                console.error("Failed to fetch posts:", err);
                setError('Failed to fetch posts. Please try again later.');
            }
        };

        fetchPosts();
    }, []);
    
    return (
        <div>
            {error && <div>{error}</div>}
            {posts.map((post) => (
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
