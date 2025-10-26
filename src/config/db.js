const mongoose = require('mongoose');

async function main()
{
  mongoose.connect('mongodb+srv://rohitNegi:Shubham12@cluster0.qp6m4sl.mongodb.net/Leetcode')
}

main()
.then((console.log("db is connected")))
.catch((err)=>{console.log("error")});

module.exports = main;



