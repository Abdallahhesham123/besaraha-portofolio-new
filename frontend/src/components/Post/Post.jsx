import React from 'react'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import { format } from "timeago.js";
import { Box, useTheme } from "@mui/material";
const fonts ={

  fontFamily:"Pacifico"
}
const Post = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {title ,date}= props;
  return (
   <>
   <Box>
   <Accordion defaultExpanded sx={{backgroundColor:colors.blueAccent[300]}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.blueAccent[700]} variant="h3">
            Your Message is :
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color={colors.redAccent[900]} variant="h2"style={fonts}>
           {title}
          </Typography>
          <Typography color={colors.greenAccent[900]} variant="h5" sx={{marginTop:"15px" ,marginBottom:"20px" }}>
          {format(date)}
          </Typography>
        
        </AccordionDetails>
      </Accordion>

   </Box>

   </>
  )
}

export default Post