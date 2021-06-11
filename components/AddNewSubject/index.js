import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import Form from './Form';



export default function AddNewSubjectForm({open, setOpen}) {
  const classes = useStyles();

  const handleAdd = () => {
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Subject Information
          </Typography>
          <React.Fragment>
            <Form />
            <div className={classes.buttons}>
                <Button
                onClick={() => setOpen(!open)}
                variant="contained"
                className={classes.button}
                >
                Cancel
                </Button>
                <Button
                variant="contained"
                color="primary"
                onClick={handleAdd}
                className={classes.button}
                >
                Add
                </Button>
            </div>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}