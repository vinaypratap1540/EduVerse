import React, { useState } from 'react';
import { Avatar } from "@mui/material";
import Course from './Course.jsx';
import EditProfileDialog from "./EditProfileDialog.jsx";
import { useLoadUserQuery } from '../../features/api/authApi.js';

const Profile = () => {
  const { data } = useLoadUserQuery();
  const user = data?.user || {}; // Handle potential undefined data

  const [open, setOpen] = useState(false);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div className='profileAndAvatar'>
          <h2 style={{ marginTop: "25px", marginLeft: "180px" }}>Profile</h2>
          {user.photoUrl ? (
            <Avatar
              style={{ cursor: "pointer", height: "100px", width: "100px", marginLeft: "180px", marginTop: "10px" }}
              alt={user.name}
              src={user.photoUrl}
            />
          ) : (
            <Avatar
              style={{ cursor: "pointer", height: "100px", width: "100px", marginLeft: "180px", marginTop: "10px" }}
              alt="Default Avatar"
              src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png"
            />
          )}
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", marginLeft: "50px", marginTop: "50px" }}>
          <span><b>Name:</b> {user.name}</span>
          <span><b>Email:</b> {user.email}</span>
          <span><b>Role:</b> {user.role}</span>
          <button type="button" className="btn btn-outline-secondary" style={{ width: "130px", marginTop: "30px" }} onClick={() => setOpen(true)}>
            Edit Profile
          </button>
          <EditProfileDialog open={open} handleClose={() => setOpen(false)} />
        </div>
      </div>

      <h5 style={{ marginTop: "30px", marginLeft: "180px" }}>Courses You are enrolled in</h5>
      {user.enrolledCourse?.length === 0 ? (
        <p style={{marginTop: "30px", marginLeft: "200px"}}>You are not enrolled in any course yet</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "125px" }}>
          {user.enrolledCourse?.map((course) => (
            <Course course={course} key={course._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;

