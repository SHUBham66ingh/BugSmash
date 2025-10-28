const express = require('express');
const app = express();
require('dotenv').config();
const main = require('./config/db');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/userAuth');

app.use(express.json());
app.use(cookieParser());
app.use('/user', authRouter); // ✅ Correct route path

main()
  .then(async () => {
    app.listen(process.env.PORT, () => {
      console.log(`server listening at port number: ${process.env.PORT}`);
    });
  })
  .catch(err => console.log("this is my error", err));
