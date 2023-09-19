import React, { useState } from 'react';
import { TextField, Box, styled, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface PostTextFieldProps {
    value: string;
    onChange: (value: string) => void;
    onFileChange: (file: File | null) => void;
    file: File | null;
}

const PostTextField: React.FC<PostTextFieldProps> = ({ value, onChange, onFileChange, file }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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

  const handleFileDelete = () => {
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the input value
    }
    onFileChange(null);
};
  return (
    <Box component="div" sx={{ position: 'relative' }}>
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
        <Box component="div"
          sx={{
            position: 'relative',  // Relative positioning for image container
            width: '100%',
            height: 'auto',
            borderRadius: '5px'
          }}
        >
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
          
          {/* Delete button */}
          <IconButton 
            size="small" 
            sx={{
              position: 'absolute', 
              top: 0, 
              left: 0
            }}
            onClick={handleFileDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

export default PostTextField;
