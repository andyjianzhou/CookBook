import React, { useState } from 'react';
import { TextField, Box, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface PostTextFieldProps {
    value: string;
    onChange: (value: string) => void;
    onFileChange: (file: File) => void;
    file: File | null;
}

const ImageContainer = styled('div')({
    position: 'relative',
    maxWidth: '100%',
});

const PostTextField: React.FC<PostTextFieldProps> = ({ value, onChange, onFileChange, file }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  React.useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      }
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [file]);

  return (
    <Box sx={{ position: 'relative' }}>
      <TextField
        label="What's on your mind?"
        multiline
        variant="filled"
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{ 
          marginBottom: 2,
          background: 'transparent',
          '& .MuiFilledInput-root': { // Target the filled variant's styles
            backgroundColor: 'transparent', // <- Remove the shade of gray
            '&:before': { // This is targeting the underline
              display: 'none'
            },
            '&:hover': {
              backgroundColor: 'transparent', // <- Ensure it stays transparent even on hover
              '&:before': {
                display: 'none'
              }
            }
          },
          '& .MuiFilledInput-underline': { // This is targeting the underline after being clicked (focused state)
            '&:after': {
                display: 'none'
            }
          },
          '& .MuiInputLabel-filled': { // Adjust the label styling
            backgroundColor: 'transparent'
          }
        }}
      />
      {imagePreview && (
        <Box
          component="img"
          src={imagePreview}
          alt="Preview"
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: '5px' 
          }}
        />
      )}
    </Box>
  );
}

export default PostTextField;
