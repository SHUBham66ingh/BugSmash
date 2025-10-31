const {getLanguageById , submitBatch} =  require("../utils/ProblemUtility");
const Problem = require("../models/problem");


const createProblem = async (req , res)=>{

    const{title , description , difficulty , 
        tags , visibleTestCases , hiddenTestCases , startCode , referenceSolution , problemCreator,
     } = req.body

     try{

        for(const {language , completeCode} of referenceSolution)
        {

          const languageId = getLanguageById(language);


          const submissions =   visibleTestCases.map((testcase)=>({
                  source_code: completeCode,
                  language_Id: languageId,
                  stdin: testcase.input,
                  expected_output: testcase.output
       } ))

       const submitResult = await submitBatch(submissions);

       const resultToken = submitResult.map((value)=>value.token);

       const testResult = await submitToken(resultToken);


       for(const test of testResult)
       {
          if(test.status_id!=3)
          {
            return res.status(400).send("error occured");
          }
       }




                  


    }



      // we can store it in our db

      await Problem.create({
         ...req.body,
          problemCreator:req.result._id
      })

      res.status(201).send("Problem Saved Sucessfully");




     }
     catch(err)
     {
             res.status(400).send("error");
     }


}

module.exports = createProblem;