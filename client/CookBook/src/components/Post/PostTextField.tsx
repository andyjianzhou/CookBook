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
        variant="filled" // Use filled variant for a cleaner look without outline
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{ 
          marginBottom: 2,
          backgroundColor: 'transparent',
          '& .MuiOutlinedInput-root': { // Remove the border of the textfield
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
            },
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
