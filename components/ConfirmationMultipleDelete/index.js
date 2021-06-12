import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import Spinner from '../Spinner';

import useMultipleSubjectsDelete from './hooks/useMultipleSubjectsDelete';
import useMultipleStudentsDelete from './hooks/useMultipleStudentsDelete';


import { useSnackbar } from 'notistack';

const TYPES = {
    MULTI_SUBJECTS: 'MultipleSubjects',
    MULTI_STUDENTS: 'MultipleStudents',
}


export default function ConfirmationForm({open, setOpen, ...rest}) {

    const {selectedForDelete,setSelected} = rest;
  const classes = useStyles();


  const [deleteMultipleSubject,deleteMultipleSubjectLoading] = useMultipleSubjectsDelete();
  const [deleteMultipleStudent,deleteMultipleStudentLoading] = useMultipleStudentsDelete();
  
  const isMounted = React.useRef(true);
  
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  },[])

  const getRoleOfThisFunction = (obj) => {
      switch (obj.__typename) {
        case TYPES.MULTI_SUBJECTS:
            return obj.__typename;
        case TYPES.MULTI_STUDENTS:
            return obj.__typename;          
      }
  }
  

  const handleDelete = async () => {
    const typeName = getRoleOfThisFunction(selectedForDelete);
    try {

      if(isMounted.current){
        
        if(typeName === TYPES.MULTI_SUBJECTS) await deleteMultipleSubject(selectedForDelete.id);
        if(typeName === TYPES.MULTI_STUDENTS) await deleteMultipleStudent(selectedForDelete.id);

        enqueueSnackbar(`${selectedForDelete.id.length} items are deleted successfully`, {variant: 'success'})
        setSelected([]);
        setOpen(false);
      }
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
            {`Are you sure you want to remove ${selectedForDelete.id.length} items?`}
          </Typography>
          <React.Fragment>

            <div className={classes.buttons}>
                <Button
                disabled={deleteMultipleSubjectLoading}
                onClick={() => setOpen(!open)}
                variant="contained"
                className={classes.button}
                >
                Cancel
                </Button>
                <Button
                disabled={deleteMultipleSubjectLoading}
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