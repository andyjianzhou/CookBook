import React from 'react';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { EmojiEmotions, GifBox } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

interface PostModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose }) => {
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
                    height: '260px',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '20px',
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
                <TextField
                    label="What's on your mind?"
                    multiline
                    rows={2}
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                
                    {/* Container for media buttons */}
                    <Box sx={{ display: 'flex', gap: '8px' }}>
                        <IconButton size="small">
                            <ImageIcon /> {/* Replace with actual icon for images */}
                        </IconButton>
                        <IconButton size="small">
                            <GifBox /> {/* Replace with actual icon for gifs */}
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
                    >
                        Post
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default PostModal;
