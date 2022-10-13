import React from "react";
import { Entry } from "../types";
import { useStateValue } from "../state";
import { Box, Typography } from "@material-ui/core";
import { MedicalInformation } from "@mui/icons-material";
import { Favorite } from "@material-ui/icons";

 export const HealthCheck: React.FC<{entry: Entry}> = ({entry}) => {
    const [{ diagnoses } ] = useStateValue();
    return <Box m={1} sx={{border: "1px solid black", borderRadius: "5px", padding: "10px", maxWidth:"60%"}}>
      
      <Typography>
        <MedicalInformation />{" "}
        {entry.date}{" "}<br/>{entry.description}
      </Typography>
      
      <Typography>
        {entry.specialist}
      </Typography>
      <Typography>
        {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code].name}</li>)}
      </Typography>
      <Favorite color="disabled" />
    </Box>;
  };