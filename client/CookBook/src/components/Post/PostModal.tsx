import React, { useRef } from 'react';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { EmojiEmotions, GifBox } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import PostServices from '../Services/PostServices';
import { PostDetails } from '../../models/PostDetails';
import {v4 as uuidv4} from 'uuid';
import { useAuth } from '../contexts/AuthContext';
import PostTextField from './PostTextField';


interface PostModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = React.useState<File | null>(null);
    const [desc, setDesc] = React.useState('');
    const [imagePreview, setImagePreview] = React.useState<string | null>(null); // Added this for storing the image preview URL

    const PostService = new PostServices();
    const { currentUser } = useAuth();

    const handleImageClick = () => {
        fileInputRef.current?.click();
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const objectUrl = URL.createObjectURL(file); // Convert the file into an object URL for preview
            setFile(file);
            setImagePreview(objectUrl); // Set the image preview URL
        }
    };

    const deleteFile = () => {
        setFile(null);
        setImagePreview(null);
    }

    const handlePostClick = async () => {
        if (!file && !desc) return;  // If there's no file and no description, exit
        console.log("Uploading post...");
        try {
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
            const result = await PostService.createPost(postDetails);
            console.log(result);
        } catch (error) {
            console.error("Error uploading the post:", error);
        }
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
                minHeight: '260px',  // minimum height
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: '20px',
                overflowY: 'auto',  // Add scrolling if content overflows modal's max height
            }}
            >
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <Typography variant="h6">Create Post</Typography>
                    <IconButton size="small" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Input fields and buttons for creating a post */}
                <PostTextField
                    value={desc}
                    onChange={setDesc}
                    onFileChange={setFile} 
                    file={file} 
                />
                
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
        </Modal>
    );
}

export default PostModal;
