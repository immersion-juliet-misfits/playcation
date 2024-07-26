import React, { useEffect } from 'react';
import axios from 'axios';


function Homepage({ add }) {
  useEffect(() => {
    axios.get('api/user')
      .then((res) => {
        const user = res.data;
        add(user)
      }).catch((err) => {
        console.error('Failed to GET user data: ', err);
      });
  }, []);

  return (
    <div>
      <h1>Homepage</h1>
    </div>
  );
};

export default Homepage;