const express = require('express');
const path = require('path');
const CommunityRoutes = require('./routes/communityRoutes/community.js');

require('dotenv').config();

// Constants
// Port
const PORT = 8000;

// Start Express app
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/community', CommunityRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
});

// Server listen
app.listen(PORT, () => {
  console.info(`Server listening on http://localhost:${PORT}`); 
});
