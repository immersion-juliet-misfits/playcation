import React from 'react';
import axios from 'axios';

const Profile = () => {

  const getProfile = () => {
    axios.get()
    .then(() => {

    })
    .catch((err) => {
      console.error('Could not GET Profile: ', err);
    });
  };

  const editProfile = () => {
    axios.patch()
    .then(() => {

    })
    .catch((err) => {
      console.error('Could not edit Profile: ', err);
    });
  };

  const deleteProfile = () => {
    axios.delete()
    .then(() => {

    })
    .catch((err) => {
      console.error('Could not delete Profile: ', err);
    });
  }
  
  return (
    <>
      <h1>Profile</h1>
    </>
  )
};

export default Profile;
