import React from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Profile = () => {
  const getProfile = () => {
    axios
      .get()
      .then(() => {})
      .catch((err) => {
        console.error("Could not GET Profile: ", err);
      });
  };

  const editProfile = () => {
    axios
      .patch()
      .then(() => {})
      .catch((err) => {
        console.error("Could not edit Profile: ", err);
      });
  };

  const deleteProfile = () => {
    axios
      .delete()
      .then(() => {})
      .catch((err) => {
        console.error("Could not delete Profile: ", err);
      });
  };

  return (
    <>
      <h1>Profile</h1>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <TextField
          id="input-with-icon-textfield"
          label="First Name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <TextField
          id="input-with-icon-textfield"
          label="Last Name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </Box>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="standard-multiline-static"
            label="Bio"
            multiline
            rows={8}
            defaultValue="Tell us about yourself"
            variant="standard"
          />
        </div>
      </Box>
      <Button variant="outlined" onClick={() => editProfile()}>
        Edit profile
      </Button>
      <Button variant="outlined" onClick={() => deleteProfile()}>
        Delete profile
      </Button>
    </>
  );
};

export default Profile;
