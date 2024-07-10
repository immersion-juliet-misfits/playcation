const express = require('express');
const path = require('path');
//const routes = require('./routes/testRoutes.js')

require('dotenv').config();

// Constants
// Port
const PORT = 8000;

// Start Express app
const app = express();

//app.use(routes);
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
});

// Server listen
app.listen(PORT, () => {
  console.info(`Server listening on http://localhost:${PORT}`); 
});
