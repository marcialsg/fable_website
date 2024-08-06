import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    palette:{primary:"#000000",secondary:"#FFFFFF",},
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },

}));

export default function AccordionToggle({collaborators}) {
  const classes = useStyles();
  
  return (
    
    <div className={classes.root+" pb-2 "} >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="bg_accordeon__title"
        >
          <Typography className={classes.heading}>{collaborators.country}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className=" col-lg-12 d-flex flex-column">
            <div className="d-flex justify-content-around pt-2 pb-2" style={{fontWeight:"800", textAlign:'center'}}>
              <div className="col-lg-4 ">Participants</div>
              <div className="col-lg-4 text-center">Institution</div>
            </div>
            <div className="col  justify-content-around flex-column">
              {collaborators.members.map(data=>{
                return <div className="d-flex justify-content-around">
                        <div className="col-lg-4  p-2">{data.name}</div>
                        <div className="col-lg-4  p-2">{data.institution}</div>
                    </div>
              })}
              
            </div>
            
          </div>
          
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
