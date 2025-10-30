const express = require('express');
const app = express();
require('dotenv').config();
const main = require('./config/db');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/userAuth');
const redisClient = require('./config/redis');

app.use(express.json());
app.use(cookieParser());
app.use('/user', authRouter); // ✅ Correct route path




const InitializeConnections = async () => {
  try {
    await Promise.all([main(), redisClient.connect()]);
    console.log('Databases connected successfully');

    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Error initializing connections:", err);
  }
};

InitializeConnections();




// main()
//   .then(async () => {
//     app.listen(process.env.PORT, () => {
//       console.log(`server listening at port number: ${process.env.PORT}`);
//     });
//   })
//   .catch(err => console.log("this is my error", err));
