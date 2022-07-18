// mass = (height * height) / 10000
// weight / mass

interface bmiValues {
    weight: number;
    height: number;
}

const parseArgumentsBmi = (args: Array<string>): bmiValues => {
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      weight: Number(args[2]),
      height: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (a: number, b: number) => {
    const mass = (b * b) / 10000;
    const calcBmi = (a / mass);

    if (calcBmi >= 18.5 && calcBmi <= 24.9) {
         return 'Healthy weight';
    } else if (calcBmi < 18.5) {
         return 'Underweight';
    } else if (calcBmi >= 25 && calcBmi <= 29.9){
         return 'Overweight';
    } else if (calcBmi > 29.9) {
         return 'Obese';
    }

    return "";
};

try {
    const { weight, height } = parseArgumentsBmi(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error : unknown) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
    }
    errorMessage;
}