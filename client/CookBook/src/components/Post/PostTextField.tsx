import React, { useState } from 'react';
import { TextField, Box, styled } from '@mui/material';

interface PostTextFieldProps {
    value: string;
    onChange: (value: string) => void;
    onFileChange: (file: File) => void;
    file: File | null;
}

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
          fontSize: '1.5rem',
          '& .MuiInputBase-input': {
            fontSize: '1.5rem',
            cursor: 'text',
          },
          '& .MuiFilledInput-root': {
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
              '@media (hover: none)': {
                  backgroundColor: 'transparent',
              },
            },
            '&.Mui-focused': {
              backgroundColor: 'transparent',
            }
          },
          '&:hover': {
            '& .MuiFilledInput-root': {
              backgroundColor: 'transparent',
            },
          },
          '&.Mui-focused': {
            '& .MuiFilledInput-root': {
              backgroundColor: 'transparent',
            },
          },
          '& .MuiFilledInput-underline': {
            '&:before': {
              display: 'none'
            },
            '&:after': {
              display: 'none'
            }
          },
          '& .MuiInputLabel-filled': {
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
            borderRadius: '5px',
            maxHeight: '60vh',
            overflowY: 'auto'
          }}
        />
      )}
    </Box>
  );
}

export default PostTextField;
