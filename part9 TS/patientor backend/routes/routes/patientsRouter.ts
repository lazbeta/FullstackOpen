import express from 'express';
import patientService from '../../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientInfo());
});

router.post('/', (_req, res) => {
  res.send('Saving a new patients entry!');
});

export default router;