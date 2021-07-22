import { useState, useEffect } from "react"
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {useContacts} from "./useContacts";
import {ContactsTable} from "./ContactsTable"
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { DATA_VIEW_MODES } from "../contacts/constants"
import {ToggleDataViewMode} from "../contacts/ToggleDataViewMode"

import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => 
createStyles({
  root: {
    marginTop: theme.spacing(4),
  },
  titleContainer: {
    marginBottom: theme.spacing(3),
  }
 })
);



const getInitialDataViewMode = () => {
  return localStorage.getItem("dataViewMode") || DATA_VIEW_MODES.TABLE
}

export const Contacts = () => {
  const classes = useStyles();
  const contacts = useContacts();
  
  const [dataViewMode, setDataViewMode] = useState(getInitialDataViewMode);

  useEffect(() => {
    localStorage.setItem("dataViewMode", dataViewMode);
  }, [dataViewMode]);

  return (<Container className={classes.root}>
    <Grid container >
    
        <Grid item xs={12} className={classes.titleContainer}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4" component="h4" gutterBottom>
            Contacts
            </Typography>
            <ToggleDataViewMode 
            dataViewMode={dataViewMode}
            setDataViewMode={setDataViewMode}
            />
            
          </Box>
        </Grid>
        <Grid item xs={12}>
          {(() => {
            if (contacts.isLoading) {
              return <LinearProgress />
            }
            if (contacts.isError) {
              return <div > ...Unknown error </div>
            }

            if (dataViewMode === DATA_VIEW_MODES.TABLE){
              return <ContactsTable data={contacts.data} />
            }

            if (dataViewMode === DATA_VIEW_MODES.GRID) {
              return "grid"
            }
            return null
          })()}
          
        </Grid>
      </Grid>
     </Container>)
}