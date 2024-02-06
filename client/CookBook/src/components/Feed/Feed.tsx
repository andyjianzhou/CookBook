import React from 'react';
import Post from '../Post/Post';
import PostServices from '../Services/PostServices';
import { useInfiniteQuery } from 'react-query';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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

    // This entire useEffect's purpose is to observe the trigger element that is at the bottom of the page
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

    if (isLoading) return <Box component="div" sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;
    
    if (isError) return <p>Error: {(error as Error).message}</p>;

    const allPosts = data?.pages?.flat() || [];

    return (
        <div>
            {allPosts?.map((post, index) => (
                <Post
                    key={index}
                    postId={post.id}
                    userId={post.userId}
                    userName={post.username}
                    content={post.content}
                    mediaFiles={post.media_file}
                    createdAt={new Date(post.createdAt)}
                />
            ))}
            <div id="load-more-trigger"></div>
            <Box component="div" sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        </div>
    );
}

export default Feed;