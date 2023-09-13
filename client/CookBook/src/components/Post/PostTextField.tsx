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
      {imagePreview && (
        <Box
          component="img"
          src={imagePreview}
          alt="Preview"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 'auto',
            zIndex: -1,
            borderRadius: '5px' 
          }}
        />
      )}
      <TextField
        label="What's on your mind?"
        multiline
        variant="outlined"
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{ 
          marginBottom: 2,
          backgroundColor: 'transparent'
        }}
      />
    </Box>
  );
}

export default PostTextField;
