import React from 'react';
import Post from '../Post/Post';
import PostServices from '../Services/PostServices';
import { useInfiniteQuery } from 'react-query';

const Feed: React.FC = () => {
    const postService = new PostServices();

    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery('posts', 
        ({ pageParam = 1 }) => postService.getPosts(pageParam),
        {
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.length > 0) {
                    return pages.length + 1;
                }
                return false;
            },
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
        }
    );

    const observer = new IntersectionObserver(
        entries => {
            if (entries[0].isIntersecting) {
                if (hasNextPage) {
                    fetchNextPage();
                }
            }
        },
        { threshold: 1 }
    );

    React.useEffect(() => {
        const trigger = document.getElementById('load-more-trigger');
        if (trigger) {
            observer.observe(trigger);
        }

        return () => {
            if (trigger) {
                observer.unobserve(trigger);
            }
        };
    }, [observer]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;

    const allPosts = data?.pages?.flat() || [];

    return (
        <div>
            {allPosts?.map((post) => (
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
            <div id="load-more-trigger"></div>
            {isFetchingNextPage && <p>Loading more...</p>}
        </div>
    );
}

export default Feed;