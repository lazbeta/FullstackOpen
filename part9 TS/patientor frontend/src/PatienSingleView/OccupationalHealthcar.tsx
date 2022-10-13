import React from "react";
import { Entry } from "../types";
import { Box, Typography } from "@material-ui/core";
import { HealthAndSafety } from "@mui/icons-material";
import { Favorite } from "@material-ui/icons";
import { useStateValue } from "../state";

export const OccupationalHealthcare: React.FC<{entry: Entry}> = ({entry}) => {
    const [{ diagnoses } ] = useStateValue();
    
    return <Box m={1} sx={{border: "1px solid black", borderRadius: "5px", padding: "10px", maxWidth:"60%"}}>
       
      <Typography>
        <HealthAndSafety />{" "}
        {entry.date}{" "} <br/>{entry.description}
      </Typography>
      <Typography>
        {entry.specialist}
      </Typography>
      <Typography>
        {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code].name}</li>)}
      </Typography>
      <Favorite color="secondary"/>
    </Box>;
  };