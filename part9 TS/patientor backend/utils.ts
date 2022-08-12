import { NewPatientEntry, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name'); 
    }
    return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseSsn = (ssn : unknown): string => {
     if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing SSN: ' + ssn);
  }
  return ssn;
};

const parseOccupation = (occupation : unknown): string => {
     if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};


type Fields = {
    name: unknown,
    dateOfBirth: unknown,
    gender: unknown,
    occupation: unknown,
    ssn: unknown

};
const toNewPatientEntry = ({name, dateOfBirth, gender, occupation, ssn}: Fields): NewPatientEntry => {

    const newEntry: NewPatientEntry = {
      dateOfBirth: parseDate(dateOfBirth),
      name: parseName(name),
      ssn: parseSsn(ssn),
      gender: parseGender(gender),
      occupation: parseOccupation(occupation),
      entries: []
    };

    return newEntry;
};

export default toNewPatientEntry;