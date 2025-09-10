const mongoose = require('mongoose');

async function main()
{
  mongoose.connect('mongodb+srv://ShubhamSingh:shubham@coddingadda.jgonpxo.mongodb.net/')
}

main()
.then((console.log("db is connected")))
.catch((err)=>{console.log("error")});



