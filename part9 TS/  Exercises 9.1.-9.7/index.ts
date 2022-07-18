import express from 'express';
import bodyParser from "body-parser";
const app = express();

app.use(express.json());
app.use(bodyParser.json());

import * as bmiCalculator from './bmiCalculator';
import {excerciseCalculator} from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Fullstack!');
});

app.get('/bmi', (req, res) => {
    const {weight, height} = req.query;
    const bmi = bmiCalculator.calculateBmi(Number(weight), Number(height));
    if (!weight || !height) {
        res.send({
            error: "missing values"
        });
    }
    if (isNaN(Number(weight)) || isNaN(Number(height))){
         res.send({
            error: "malformatted parameters"
        });
    }

    res.send({weight, height, bmi});

});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  const { dailyExercises, target } : any = req.body;

  if (!dailyExercises || !target) {
        return res.status(400).json({
            error: "missing values"
        });
    }


  if(isNaN(Number(target)) || Array.isArray(dailyExercises) && !dailyExercises.length){
         return res.status(400).json({
            error: "malformatted parameters"
        });
    }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = excerciseCalculator(dailyExercises, target);
  
  return res.json(result);
  
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});