const { getLanguageById, submitBatch } = require("../utils/ProblemUtility");
const Problem = require("../models/problem");

const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    visibleTestCases,
    hiddenTestCases,
    startCode,
    referenceSolution,
    problemCreator,
  } = req.body;

  try {
    for (const { language, completeCode } of referenceSolution) {
      const languageId = getLanguageById(language);

      const submissions = visibleTestCases.map((testcase) => ({
        source_code: completeCode,
        language_Id: languageId,
        stdin: testcase.input,
        expected_output: testcase.output,
      }));

      const submitResult = await submitBatch(submissions);
      console.log(submitResult);

      const resultToken = submitResult.map((value) => value.token);

      const testResult = await submitToken(resultToken);
      console.log(testResult);

      for (const test of testResult) {
        if (test.status_id != 3) {
          return res.status(400).send("error occured");
        }
      }
    }

    // we can store it in our db

    await Problem.create({
      ...req.body,
      problemCreator: req.result._id,
    });

    res.status(201).send("Problem Saved Sucessfully");
  } catch (err) {
    res.status(400).send("error");
  }
};

const updateProblem = async (req, res) => {
  const { id } = req.params;

  const {
    title,
    description,
    difficulty,
    tags,
    visibleTestCases,
    hiddenTestCases,
    startCode,
    referenceSolution,
    problemCreator,
  } = req.body;

  try {

     if(!id)
     {
      return   res.status(400).send("invalid Id");
     }

     const DsaProblem =  await Problem.findById(id);
     if(!DsaProblem)
     {
       return res.status(404).send("id is not valid");
     }  



    for (const { language, completeCode } of referenceSolution) {
      const languageId = getLanguageById(language);

      const submissions = visibleTestCases.map((testcase) => ({
        source_code: completeCode,
        language_Id: languageId,
        stdin: testcase.input,
        expected_output: testcase.output,
      }));

      const submitResult = await submitBatch(submissions);
      console.log(submitResult);

      const resultToken = submitResult.map((value) => value.token);

      const testResult = await submitToken(resultToken);
      console.log(testResult);

      for (const test of testResult) {
        if (test.status_id != 3) {
          return res.status(400).send("error occured");
        }
      }
    }

     const  newProblem =  await  Problem.findByIdAndUpdate( id , {...req.body} ,{runValidators:true , new:true} );

     res.status(200).send(newProblem);





  } catch(err) {
       res.status(404).send("error"+err);
  }
};




module.exports = createProblem;
