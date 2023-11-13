import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
import { TextField, TypeEntryOptions } from "./FormField";
import { Entry, TypeOptions } from "../types";
import { DiagnosisSelection } from "./FormField";
import EntryType from "./Entrytype";
import { SelectEntryTypeField } from "./FormField";

/*
 * use type Entry, but omit id,
 * because it is irrelevant for new entry object.
 */
export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  initialValues: EntryFormValues;
}

const typeOptions: TypeEntryOptions[] = [
  { value: TypeOptions.Hospital, label: "Hospital" },
  { value: TypeOptions.HealthCheck, label: "HealthCheck" },
  { value: TypeOptions.OccupationalHealthcare, label: "Occupational healthcare" },
];

export const AddPatientEntryForm = ({ onCancel, onSubmit, initialValues }: Props) => {
  
  const [{ diagnoses }] = useStateValue();

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.diagnosisCodes) {
            errors.diagnosisCodes = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          return errors;
        }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
          return (
            <>
              <Form className="form ui">
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="date"
                  component={TextField}
                />
                <Field
                  label="Specialist"
                  placeholder="Specialist"
                  name="specialist"
                  component={TextField}
                />
                <Field
                  label="Description"
                  placeholder="Description"
                  name="description"
                  component={TextField}
                />
            
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnoses)}
                />

                <SelectEntryTypeField label="type" name="typeOfentry" options={typeOptions}/>
                <EntryType entryType={values.type} />
              
                <Grid>
                  <Grid item>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ float: "left" }}
                      type="button"
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{
                        float: "right",
                      }}
                      type="submit"
                      variant="contained"
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
}; 

export default AddPatientEntryForm;
