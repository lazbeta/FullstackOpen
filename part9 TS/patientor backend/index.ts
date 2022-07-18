import express from 'express';
import patientRouter from './routes/routes/patientsRouter';
import diagnoseRouter from './routes/routes/diagnosesRouter';
import cors from 'cors';
const app = express();
app.use(express.json());

const PORT = 3001;
app.use(cors());

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});