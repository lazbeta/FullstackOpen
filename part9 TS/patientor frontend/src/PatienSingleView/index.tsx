import React from "react";
import axios from "axios";
import { Patient, TypeOptions } from "../types";
import { Entry } from "../types";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { displayOnePatient } from "../state";
import { Button } from "@material-ui/core";
import assertNever from "assert-never";
import { addPatientEntry } from "../state";
import { AddPatientEntry } from "../AddPatientModal/index";
import { EntryFormValues } from "../AddPatientModal/AddPatientEntry";
import { Hospital } from "./Hospital";
import { OccupationalHealthcare } from "./OccupationalHealthcar";
import { HealthCheck } from "./HealthCheck";

const PatientSingleView = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

   React.useEffect(() => {
      const fetchPatient = async () => {
      try {
        if(!id){
          console.error("there was a mistake");
        } else{
          const { data: displayPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(displayOnePatient(displayPatient));
        }
        
      } catch (e) {
        console.error(e);
      }
    };
      void fetchPatient();

  }, [id, dispatch]);

  const patientEntryInitialValues = {
    date: "",
    description: "",
    diagnosisCodes: [],
    discharge: {},
    specialist: "",
    type: TypeOptions.Hospital
  };

  const submitNewEntry = async (entryValues: EntryFormValues) => {
    if (!patient) return false;
    try {
        const { data: newPatientData } = await axios.post<Patient>(`${apiBaseUrl}/patients/${patient.id}/entries`, entryValues);
        dispatch(addPatientEntry(newPatientData));
        // eslint-disable-next-line no-console
        console.log(entryValues, "entry");
        closeModal();
      } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      } 
    }
  };

  const EntryDetails: React.FC<{entry: Entry}> = ({ entry }) => {
    switch (entry.type) {
      case TypeOptions.Hospital:
        return <Hospital entry={entry}/>;
      case TypeOptions.OccupationalHealthcare:
        return <OccupationalHealthcare entry={entry}/>;
      case TypeOptions.HealthCheck:
        return <HealthCheck entry={entry}/>;
      default:
        return assertNever(entry);
    }
  };

    return (
        <>
       {patient && 
        <>
          <div>
            <h2>{patient.name}</h2>
            <p>occupation: {patient.occupation}</p>
            <p>ssn: {patient.ssn}</p>
            <p>gender: {patient.gender}</p>
            {" "}
          </div>

          <div>
              {patient?.entries?.length > 0 &&
              patient.entries.map((entry: Entry, i) => <EntryDetails key={i} entry={entry} />)}
          </div>
        </>
        }

{console.log(patient)}
        {
          patient && 
          <AddPatientEntry 
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
            initialValues={patientEntryInitialValues}      
          />
        }
        
        <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
        </Button>
        
        </>
    );
};

export default PatientSingleView;
