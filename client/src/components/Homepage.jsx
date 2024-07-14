import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import LinkBar from './LinkBar.jsx';


function Homepage({ add }) {
  // const [userName, setUsername] = useState('');

  useEffect(() => {
    axios.get('api/user')
      .then((res) => {
        const user = res.data;
        // set username
        // setUsername(user.username);
        add(user)
      }).catch((err) => {
        console.error('Failed to GET user data: ', err);
      });
  }, []);

  return (
    <div>
      <h1>Homepage</h1>
      <LinkBar />
    </div>
  );
};

export default Homepage;