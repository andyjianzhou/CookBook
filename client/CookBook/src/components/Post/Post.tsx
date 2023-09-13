import React from 'react'
import { Avatar, Box, Typography, styled } from '@mui/material'
import { useAuth } from '../contexts/AuthContext';

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
  
  const formatDate = (date: Date) => {
    const now = new Date();
    
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

    // if date is yesterday, return yesterday
    if (diffInDays === 1 && now.getDate() - date.getDate() === 1) {
        return 'Yesterday';
    }

    // if date is this year, return month and day
    if (now.getFullYear() === date.getFullYear()) {
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}`;
    }

    // else return year, month, day
    return `${date.getFullYear()}, ${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}`;
}

// Test the function:
const testDate = new Date();
testDate.setHours(testDate.getHours() - 5);  // 5 hours ago
console.log

  
  return (
    // add underlines
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={userName} src={userAvatar ? userAvatar : ''} sx={{ width: 48, height: 48, marginRight: 2 }} />
          <Box>
            <Typography variant="h6">{userName}</Typography>
            <Typography variant="body2" color="text.secondary">{formatDate(createdAt)}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Post