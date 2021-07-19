
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {useContacts} from "./useContacts";
import {ContactsTable} from "./ContactsTable"
import Typography from '@material-ui/core/Typography';

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



export const Contacts = () => {
  const classes = useStyles();
  const contacts = useContacts();

  
  return (<Container className={classes.root}>
    <Grid container >
    
        <Grid item xs={12} className={classes.titleContainer}>
          <Typography variant="h4" component="h1" gutterBottom>
          Contacts
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {(() => {
            if (contacts.isLoading) {
              return <div > ...Loading </div>
            }
            if (contacts.isError) {
              return <div > ...Unknown error </div>
            }
            return <ContactsTable data={contacts.data} />
          })()}
          
        </Grid>
      </Grid>
     </Container>)
}