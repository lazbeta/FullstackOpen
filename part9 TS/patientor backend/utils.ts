import { NewPatientEntry, Gender, HealthCheckRating, NewEntryForPatient, SickLeave, Discharge } from "./types";

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
      throw new Error('Incorrect or missing date: ' + date);
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

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
      throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
      throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealcheckRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealcheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || !isHealcheckRating(healthCheckRating)){
      throw new Error('Incorrect or missing diagnoses health check rating: ' + healthCheckRating);
    }

    return healthCheckRating;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
      throw new Error('Incorrect or missing criteria: ' + criteria);
  }
  return criteria;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
      throw new Error('Incorrect or missing employer name: ' + employerName);
  }
  return employerName;
};


type Fields = {
    name: unknown,
    dateOfBirth: unknown,
    gender: unknown,
    occupation: unknown,
    ssn: unknown
};

export const toNewPatientEntry = ({name, dateOfBirth, gender, occupation, ssn}: Fields): NewPatientEntry => {

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

export const addEntryForPatient = (entry: NewEntryForPatient) => {
                            switch (entry.type) {
                              case "Hospital":
                                const dischargeValues: Discharge = {
                                      date: parseDate(entry.discharge.date),
                                      criteria: parseCriteria(entry.discharge.criteria)
                                    };
                                const newEntryHospital: NewEntryForPatient = {
                                  type: entry.type,
                                  date: parseDate(entry.date),
                                  specialist: parseSpecialist(entry.specialist),
                                  description: parseDescription(entry.description),
                                  diagnosisCodes: entry.diagnosisCodes,
                                  discharge: dischargeValues
                                  
                                };
                                return newEntryHospital;

                              case "OccupationalHealthcare":
                                const sickLeaveValues: SickLeave = {
                                  startDate: parseDate(entry.sickLeave?.startDate),
                                  endDate: parseDate(entry.sickLeave?.endDate)
                                };
                                const newEntryOccupational: NewEntryForPatient = {
                                  type: entry.type,
                                  date: parseDate(entry.date),
                                  specialist: parseSpecialist(entry.specialist),
                                  employerName: parseEmployerName(entry.employerName),
                                  diagnosisCodes: entry.diagnosisCodes,
                                  description: parseDescription(entry.description),
                                  sickLeave: sickLeaveValues
                                };
                                return newEntryOccupational;

                              case "HealthCheck":
                                const newEntryHealthCheck: NewEntryForPatient = {
                                  type: entry.type,
                                  date: parseDate(entry.date),
                                  specialist: parseSpecialist(entry.specialist),
                                  description: parseDescription(entry.description),
                                  healthCheckRating: parseHealcheckRating(entry.healthCheckRating)
                                };
                                return newEntryHealthCheck;

                              default:
                                return console.log(entry, "entry");
                            }             
                            
};