import React from 'react'
import { Avatar, Box, CardMedia, IconButton, Typography } from '@mui/material'
import { useAuth } from '../contexts/AuthContext';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

interface PostProps {
  postId: number,
  userId: number,
  userName: string,
  content: string,
  mediaFiles: File | File [] | null, // Can be bulk file in the future
  createdAt: Date,
  // title:string // have it in the future
}

const Post: React.FC<PostProps> = ({ postId, userId, userName, content, mediaFiles, createdAt }) => {
  const userAvatar = useAuth().currentUser?.photoURL;

  const renderMediaFiles = () => {
    if (!mediaFiles) return null;
  }

  const formatDate = (date: Date) => {
    const now = new Date();
    
    // If mediaFiles is just a single file, put it into an array for consistent processing
    const files = Array.isArray(mediaFiles) ? mediaFiles : [mediaFiles];

    // Calculate time difference in milliseconds
    const diffInMilliseconds = now.getTime() - date.getTime();

    // Calculate time difference in hours, minutes, etc.
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    // if date is today, return how many hours ago
    if (diffInHours < 24 && now.getDate() === date.getDate()) {
        if (diffInHours === 0) {
            return 'Just now';
        } else if (diffInHours === 1) {
            return '1 hour ago';
        }
        return `${diffInHours} hours ago`;
    }

    if (diffInDays === 1 && now.getDate() - date.getDate() === 1) {
        return 'Yesterday';
    }

    if (now.getFullYear() === date.getFullYear()) {
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}`;
    }

    return `${date.getFullYear()}, ${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}`;
  }

  return (
    <Box component="div"
      sx={{
        borderTop: '1px solid',
        borderLeft: '1px solid',
        borderRight: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      <Box component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}>
        <Box component="div" sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={userName} src={userAvatar || ''} sx={{ width: 32, height: 32, marginRight: 1.5 }} />
          <Box component="div">
            <Typography variant="subtitle1" display="inline">{userName}</Typography>
            <Typography variant="caption" color="text.secondary" display="inline" sx={{ ml: 0.5, fontSize: '1.1rem' }}>&middot;</Typography>
            <Typography variant="body2" color="text.secondary" display = "inline" sx={{ ml:0.5, fontSize: '0.8rem' }}>{formatDate(createdAt)}</Typography>
          </Box>
        </Box>
      </Box>
      <Box component="div" sx={{ padding: '0rem 4rem' }}>
        <Typography variant="body1">{content}</Typography>
        {mediaFiles && (
          <Box component="div" mt={2}>
            {Array.isArray(mediaFiles)
              ? mediaFiles.map((fileOrUrl, index) => (
                  <CardMedia
                      key={index}
                      component="img"
                      alt="Post media"
                      height="240"
                      src={
                          typeof fileOrUrl === 'string'
                              ? ((fileOrUrl as string).startsWith('/media_files') ? `http://127.0.0.1:8000${fileOrUrl}` : fileOrUrl)
                              : URL.createObjectURL(fileOrUrl)
                      }
                      title="Post media"
                  />
              ))
              : 
              <CardMedia
                component="img"
                alt="Post media"
                height={mediaFiles.size}
                sx={{ borderRadius: '1rem' }}
                src={
                    typeof mediaFiles === 'string'
                        ? ((mediaFiles as string).startsWith('/media_files') ? `http://127.0.0.1:8000${mediaFiles}` : mediaFiles)
                        : URL.createObjectURL(mediaFiles)
                }
                title="Post media"
              />
            }
          </Box>
        )}

        {/* Icons Container */}
        <Box component="div" mt={1} display="flex" justifyContent="space-between">
            <IconButton size="small">
                <ModeCommentOutlinedIcon />
            </IconButton>
            <IconButton size="small">
                <BookmarkBorderOutlinedIcon />
            </IconButton>
            <IconButton size="small">
                <ShareOutlinedIcon />
            </IconButton >
            <IconButton size="small">
                <SendOutlinedIcon />
            </IconButton>
        </Box>
    </Box>
  </Box>
  );
};

export default Post;