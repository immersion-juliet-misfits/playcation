const express = require('express');

require('dotenv').config();

// Constants
// Port
const PORT = 8000;

// Start Express app
const app = express();

app.use(express.json())
app.use(express.static('client/dist'))

// Server listen
app.listen(PORT, () => {console.info(`Server listening on http://localhost:${PORT}`)})
