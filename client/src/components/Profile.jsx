import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Typography,
  Box,
  InputAdornment,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Profile = ({ user }) => {
  // States for input
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [bio, setBio] = useState('');
  const profileRef = useRef(profile);

  // Profile State
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    user_id: user.id,
  });

  const editState = (name, value) => {
    if (name === 'fName') {
      setFName(value);
      console.log(value);
    } else if (name === 'lName') {
      setLName(value);
      console.log(value);
    } else if (name === 'bio') {
      setBio(value);
      console.log(value);
    }
  };

  // GET request to /api/profile for profile data
  const getProfile = () => {
    axios
      .get(`/api/profile/${profile.user_id}`)
      .then((data) => {
        setProfile(data);
        console.log('Profile Retrieved', data);
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
        user_id: 1,
      })
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => {
        console.error('Cannot Create Profile', err);
      });
  };

  // Put request to /api/profile/${profile.id} to edit the profile data
  const editProfile = () => {
    axios
      .put(`/api/profile/${profile.id}`)
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => {
        console.error('Could not edit Profile: ', err);
      });
  };

  // Delete request to /api/profile/${profile.id} to delete profile
  const deleteProfile = () => {
    axios
      .delete('/api/profile/${profile.id}')
      .then(() => {})
      .catch((err) => {
        console.error('Could not delete Profile: ', err);
      });
  };

  useEffect(() => {
    getProfile();
  }, [profileRef]);

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
          id='input-with-icon-textfield'
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