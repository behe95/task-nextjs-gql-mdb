import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import Spinner from '../Spinner';

import useDeleteSubject from './hooks/useDeleteSubject';
import useDeleteStudent from './hooks/useDeleteStudent';


import { useSnackbar } from 'notistack';

const TYPES = {
    SUBJECT: 'Subject',
    STUDENT: 'Student'
}


export default function ConfirmationForm({open, setOpen, ...rest}) {

    const {selectedForDelete} = rest;
  const classes = useStyles();


  const [deleteSubject,deleteSubjectLoading] = useDeleteSubject();
  const [deleteStudent,deleteStudentLoading] = useDeleteStudent();
  
  
  const { enqueueSnackbar } = useSnackbar();


  const getRoleOfThisFunction = (obj) => {
      switch (obj.__typename) {
        case TYPES.SUBJECT:
            return obj.__typename;
        case TYPES.STUDENT:
            return obj.__typename;            
      }
  }
  

  const handleDelete = async () => {
    const typeName = getRoleOfThisFunction(selectedForDelete);
    try {
        if(typeName === TYPES.SUBJECT) await deleteSubject(selectedForDelete.id);
        if(typeName === TYPES.STUDENT) await deleteStudent(selectedForDelete.id);

        enqueueSnackbar(`${selectedForDelete.name} is deleted successfully`, {variant: 'success'})
        setOpen(false);
    } catch (error) {
        enqueueSnackbar(error.message, {variant: 'error'})
    }
  };


  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Are you sure you want to delete {selectedForDelete.name}?
          </Typography>
          <React.Fragment>

            <div className={classes.buttons}>
                <Button
                disabled={deleteSubjectLoading || deleteStudentLoading}
                onClick={() => setOpen(!open)}
                variant="contained"
                className={classes.button}
                >
                Cancel
                </Button>
                <Button
                disabled={deleteSubjectLoading || deleteStudentLoading}
                variant="contained"
                color="secondary"
                onClick={handleDelete}
                className={classes.button}
                >
                  Delete
                </Button>
            </div>
          </React.Fragment>
        </Paper>
      </main>

    </React.Fragment>
  );
}