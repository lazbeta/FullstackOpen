import patients from '../data/patients';
import { NonSensitivePatientInfo, PatientEntry } from '../types';

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
const addNewPatient = () => {
  return null;
};

export default {
  getPatientEntries,
  getNonSensitivePatientInfo,
  addNewPatient
};