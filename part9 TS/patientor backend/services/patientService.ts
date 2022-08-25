import patients from '../data/patients';
import { NonSensitivePatientInfo, PatientEntry, NewPatientEntry, NewEntryForPatient, Entry } from '../types';
import { v1 as uuid } from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const id = uuid();

const getPatientEntries = (): PatientEntry[] => {
      return patients;
      };

const getNonSensitivePatientInfo = (): NonSensitivePatientInfo[] => {
      return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        dateOfBirth,
        name,
        gender,
        occupation
        }));
    };


const getPatientById = (id: string) => {
  const patient = patients.filter(p => p.id === id);
  return patient;
};

const addNewPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: id,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addNewEntryForPatient = (entry: NewEntryForPatient): Entry => {

  const newEntryPatient = {
    id: id,
    ...entry
    };

  patients.find(p => p.id === id)?.entries.push(newEntryPatient as Entry);
  
  return newEntryPatient;

};

export default {
  getPatientEntries,
  getNonSensitivePatientInfo,
  getPatientById,
  addNewPatient,
  addNewEntryForPatient
};