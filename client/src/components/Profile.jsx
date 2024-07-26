import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Profile = ({ user }) => {
  // States for input
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [bio, setBio] = useState('');

  // Profile State
  const [profile, setProfile] = useState({
    firstName: fName,
    lastName: lName,
    bio: bio,
    user_id: user.id || 1,
  });

  const editState = (name, value) => {
    if (name === 'fName') {
      setFName(value);
    } else if (name === 'lName') {
      setLName(value);
    } else if (name === 'bio') {
      setBio(value);
    }
  };

  // GET request to /api/profile for profile data
  const getProfile = () => {
    axios
      .get(`/api/profile/${profile.user_id}`)
      .then(({ data }) => {
        setFName(data.firstName);
        setLName(data.lastName);
        setBio(data.bio);
        setProfile(data);
      })
      .catch((err) => {
        console.error('Could not GET Profile: ', err);
      });
  };

  // Create to /api/profile
  const createProfile = () => {
    axios
      .post('/api/profile', {
        firstName: fName,
        lastName: lName,
        bio: bio,
        user_id: user.id,
      })
      .then(({ data }) => {
        setProfile(data);
      })
      .catch((err) => {
        console.error('Cannot Create Profile', err);
      });
  };

  // Put request to /api/profile/${profile.id} to edit the profile data
  const editProfile = () => {
    axios
      .patch(`/api/profile/${profile.id}`, {
        firstName: fName,
        lastName: lName,
        bio,
      })
      .then(({ data }) => {
        setProfile(data);
      })
      .catch((err) => {
        console.error('Could not edit Profile: ', err);
      });
  };

  // Delete request to /api/profile/${profile.id} to delete profile
  const deleteProfile = () => {
    axios
      .delete(`/api/profile/${profile.id}`)
      .then(({ data }) => {
        setProfile(data);
      })
      .catch((err) => {
        console.error('Could not delete Profile: ', err);
      });
  };

  useEffect(() => {
    getProfile();
  }, [user.id]);

  return (
    <>
      <h1>Profile</h1>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <TextField
          id='input-with-icon-textfield'
          label='First Name'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant='standard'
          name='fName'
          value={fName}
          onChange={(e) => {
            editState(e.target.name, e.target.value);
          }}
        />
        <TextField
          id='input-with-icon-textfield2'
          label='Last Name'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant='standard'
          name='lName'
          value={lName}
          onChange={(e) => {
            editState(e.target.name, e.target.value);
          }}
        />
      </Box>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <div>
          <TextField
            id='standard-multiline-static'
            label='Bio'
            multiline
            rows={8}
            variant='standard'
            name='bio'
            value={bio}
            onChange={(e) => {
              editState(e.target.name, e.target.value);
            }}
          />
        </div>
      </Box>
      <Button variant='outlined' onClick={() => createProfile()}>
        Create profile
      </Button>
      <Button variant='outlined' onClick={() => editProfile()}>
        Edit profile
      </Button>
      <Button variant='outlined' onClick={() => deleteProfile()}>
        Delete profile
      </Button>
    </>
  );
};

export default Profile;
