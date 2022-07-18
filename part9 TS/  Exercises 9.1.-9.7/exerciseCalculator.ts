interface excerciseValues {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  ratingText: string | undefined;
  rating: number | undefined;
}
export const excerciseCalculator = (
    excerciseHours: number[],
    target: number)
    :excerciseValues => {
  
  const periodLength = excerciseHours.length;
  const trainingDays = excerciseHours.filter(hours => hours > 0).length;
  const average = excerciseHours.reduce((a, b) => a + b, 0) / excerciseHours.length;
  const success = average >= target;
  let rating;
  let ratingText;
  if (target > average){
    rating = 1;
    ratingText = "You can do better!";
  } else if (target <= average) {
    rating = 2;
    ratingText = "You did it, nice one!";
  } else if (target < average){
    rating = 3;
    ratingText = "You've outdone yourself, great job!";
  }
  
  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    ratingText,
    rating
  };
};

  const parseArguments = (args: Array<string>) => {
    // if (args.length < 4) throw new Error ("Not enough arguments");
    
    if (isNaN(Number(args))){
        return {
            target: Number(args[2]),
            excerciseHours: args.slice(3).map(hour => Number(hour))
        };
      
    } else {
        throw new Error('Provided values were not numbers.');
    }
  };
  const { target, excerciseHours} = parseArguments(process.argv);
  if (excerciseHours.length !== 0){
    try {
    console.log(excerciseCalculator(excerciseHours, target));
  } catch (error: unknown){
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += 'Error' + error.message;
        }
    console.log(errorMessage);
  }
  }

