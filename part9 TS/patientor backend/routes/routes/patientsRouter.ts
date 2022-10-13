import express from 'express';
import patientService from '../../services/patientService';
import { Entry } from '../../types';
import { toNewPatientEntry } from '../../utils';
import { addEntryForPatient } from '../../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientInfo());
});

router.get("/:id", (req, res) => {
  const id: string = (req.params.id);

  try {
    const item = patientService.getPatientById(id);
 
    if (item) {
      return res.status(200).send(item);
    }

    return res.status(404).send("item not found");
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(400).send(errorMessage);
  }
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addNewPatient(newPatientEntry);
      res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  const patient = patientService.getPatientById(req.params.id);

  if (patient) {
    try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = addEntryForPatient(req.body);
    const addedEntry = patientService.addNewEntryForPatient(patient, newEntry as Entry);
    res.json(addedEntry);

  }  catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
  } else {
    res.status(404).send({ error: "Sorry, this patient does not exist" });
  }
});



export default router;