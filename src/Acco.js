import * as React from 'react';
import Switch from '@mui/material/Switch';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Collapse from '@mui/material/Grow';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function AccordionExpandIcon() {
    const [checked, setChecked] = React.useState(false);
 
    return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
                 <Switch {...label} onChange={()=> {
                     setChecked((prev) => !prev);
                 }} />
          </Typography>
        </AccordionDetails>
      </Accordion>

       <Collapse in={checked} collapsedSize={10}>
            <h1 style={{height:'400px' , backgroundColor:'orange' , color:'black'}}> Hello Nigga xD</h1>
        </Collapse>
         
       
    </div>
  );
}
