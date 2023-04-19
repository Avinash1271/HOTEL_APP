const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const roomsRoute = require('./routes/roomsRoute')
const userRoute = require('./routes/userRoutes')

const db = require('./db/connection.js');
app.use(cors());
app.use(express.json()); //because we have to receive data from body only

app.use(express.static(path.join(__dirname, "../client/build")));

app.use('/api/rooms',roomsRoute);
app.use('/api/users',userRoute);



// start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
