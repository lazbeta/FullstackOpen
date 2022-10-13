import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import { LocalHospital } from "@mui/icons-material";
import { Entry } from "../types";
import { useStateValue } from "../state";
  
  export const Hospital: React.FC<{entry: Entry}> = ({entry}) => {
    const [{ diagnoses } ] = useStateValue();
   return <Box m={1} sx={{border: "1px solid black", borderRadius: "5px", padding: "10px", maxWidth:"60%"}}>

      <Typography>
        <LocalHospital />{" "}
        {entry.date}{" "}<br/> {entry.description}
      </Typography>
      <Typography>
        {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code].name}</li>)}
      </Typography>
       <Typography>
        {entry.specialist}
      </Typography>
      <Favorite color="primary"/>
    </Box>;
  };