import React from 'react';
import { Card, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useNavigate } from 'react-router-dom';

const Lecture = ({ lecture, courseId, index }) => {
    const navigate = useNavigate()
  const handleEdit = () => {
    navigate(`${lecture._id}`);
  };

  return (
    <Card sx={{ 
      width: '150vh', 
      height: '60px',
      borderBottom:"1px solid black",
      marginBottom:"4px",
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      backgroundColor: '#f3f4f6',
      borderRadius: '10px',
      boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
      transition: 'transform 0.3s',
      '&:hover': { transform: 'scale(1.01)', backgroundColor: '#e5e7eb' }
    }}>
      <Box display="flex" alignItems="center" gap={2}>
        <PlayCircleOutlineIcon color="primary" sx={{ fontSize: 28 }} />
        <Typography variant="body1" fontWeight="500">
          Lecture {index + 1}: {lecture.lectureTitle}
        </Typography>
      </Box>
      <IconButton color="primary" onClick={handleEdit}>
        <EditIcon />
      </IconButton>
    </Card>
  );
};

export default Lecture;
