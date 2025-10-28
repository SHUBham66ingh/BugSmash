const mongoose = require('mongoose');

async function main()
{
  mongoose.connect(process.env.DB_CONNECT_STRING)
}

main()
.then((console.log("db is connected")))
.catch((err)=>{console.log("error")});

module.exports = main;



