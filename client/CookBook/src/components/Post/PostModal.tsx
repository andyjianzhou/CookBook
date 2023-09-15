import React, { useRef } from 'react';
import { Modal, Box, Typography, IconButton, TextField, Button, styled } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { EmojiEmotions, GifBox } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import PostServices from '../Services/PostServices';
import { PostDetails } from '../../models/PostDetails';
import {v4 as uuidv4} from 'uuid';
import { useAuth } from '../contexts/AuthContext';
import PostTextField from './PostTextField';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

interface PostModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = React.useState<File | null>(null);
    const [desc, setDesc] = React.useState('');
    const [imagePreview, setImagePreview] = React.useState<string | null>(null); // Added this for storing the image preview URL

    const { csrfToken } = useAuth();
    const PostService = new PostServices();
    const { currentUser } = useAuth();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const createPostMutation = useMutation(
        (newPost: PostDetails) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    PostService.createPost(newPost, csrfToken)
                        .then(resolve)
                        .catch(reject);
                }, 1000); // 2 seconds delay
            });
        },
        {
            onMutate: (newPost) => {
                console.log("Mutation started");
                // Backup the current cache
                const previousPosts = queryClient.getQueryData('posts');
    
                // Update the cache optimistically
                queryClient.setQueryData('posts', (oldData: PostDetails[] | undefined) => {
                    if (!oldData) return [newPost];
                    
                    return [
                      newPost,
                      ...oldData
                    ];
                  });                  
    
                // Return a context object with the previous posts
                return { previousPosts };
            },
            onError: (error, newPost, context: any) => {
                console.log("Mutation error:", error);
                // On error, roll back to the previous value
                queryClient.setQueryData('posts', context.previousPosts);
            },
            onSuccess: () => {
                console.log("Mutation settled");
                // Refetch all todos to sync the cache with the server
                queryClient.invalidateQueries('posts');
            }
        }
    );
    

    const handleImageClick = () => {
        fileInputRef.current?.click();
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const objectUrl = URL.createObjectURL(file); // Convert the file into an object URL for preview
            setFile(file);
            setImagePreview(objectUrl); // Set the image preview URL
            
            // Clear the input value after processing
            event.target.value = "";
        }
    };
    

    const handlePostClick = () => {
        if (!file && !desc) return;  // If there's no file and no description, exit

        const postDetails: PostDetails = {
            postId: uuidv4(),
            userId: currentUser?.uid,
            file: file,
            description: desc,
            likes: [],
            comments: [],
            createdAt: new Date(),
            updatedAt: null
        };
      
        // Use the mutation to create the post.
        createPostMutation.mutate(postDetails);
        onClose();
        navigate('/dashboard');
    };
        

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: '600px',
                    width: '90%',
                    minHeight: '260px',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',  // make sure children are stacked vertically
                }}
            >
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <Typography variant="h6">Create Post</Typography>
                    <IconButton size="small" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                
                <Box sx={{ flex: 1, overflowY: 'auto' }}>
                    {/* Input fields and buttons for creating a post */}
                    <PostTextField
                        value={desc}
                        onChange={setDesc}
                        onFileChange={setFile} 
                        file={file} 
                    />
                </Box>
                {/* Sticky Controls */}
                <Box 
                    sx={{ 
                        position: 'sticky',
                        bottom: 0,
                        backgroundColor: 'background.paper',
                        padding: '1rem',
                        borderTop: '1px solid rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'  // space between controls
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Container for media buttons */}
                        <Box sx={{ display: 'flex', gap: '8px' }}>
                            {/* Invisible file input */}
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                style={{ display: 'none' }}
                                accept="image/*, video/*"
                            />
                            <IconButton size="small" onClick={handleImageClick}>
                                <ImageIcon />
                            </IconButton>
                            <IconButton size="small">
                                <GifBox />
                            </IconButton>
                            <IconButton size="small">
                                <EmojiEmotions /> {/* Replace with actual icon for emojis */}
                            </IconButton>
                        </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ width: '20%', textTransform: 'none' }}
                            onClick={handlePostClick}
                        >
                            Post
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}

export default PostModal;
