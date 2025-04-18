import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { useUpdateUserMutation,useLoadUserQuery } from "../../features/api/authApi.js";
import { useEffect } from "react";
import { toast } from "react-toastify";
const EditProfileDialog = ({ open, handleClose }) => {
  const [
    updateUser,
    {
      data: updateUserData,
      isError,
      error,
      isSuccess,
    },
  ] = useUpdateUserMutation();
  const { refetch } = useLoadUserQuery(); // Add this to refetch data
   
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (profile) {
      formData.append("profile", profile);
    }

    try {
      const response = await updateUser(formData).unwrap();
      console.log("Response:", response);

      if (response.success) {
        await refetch(); // 🔥 Force refetch user data
        handleClose();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(updateUserData.message || "Profile updated.");
    }
    if (isError) {
      toast.error(error.message || "Failed to update profile");
    }
  }, [error, updateUserData, isSuccess, isError]);
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="dense"
          onChange={(e) => setName(e.target.value)}
        />
        Profile <TextField
          type="file"
          fullWidth
          variant="outlined"
          margin="dense"
          onChange={(e) => setProfile(e.target.files[0])} // Ensure single file
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">Cancel</Button>
        <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;



