const express = require('express')
const problemRouter = express.Router()
const adminMiddleware = require("../middleware/adminMiddleware")
const createProblem = require("../controllers/userProblem")
const userMiddleware = require("../middleware/userMiddleware")


problemRouter.post("/create" , adminMiddleware , createProblem);
problemRouter.patch("/update/:id" ,  adminMiddleware , updateProblem);
problemRouter.delete("/delete/:id" ,  adminMiddleware , deleteProblem);


problemRouter.get("/problemById/:id"  ,userMiddleware , getProblemById);
problemRouter.get("/getAllProblem" , userMiddleware ,   getAllProblem);
problemRouter.get("/problemSolvedByUser" , userMiddleware , solvedAllProblembyUser);

module.exports = problemRouter;






//create

//fetch


//update

//delete