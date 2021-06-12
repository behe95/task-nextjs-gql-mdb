import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import Form from './Form';

import { useSnackbar } from 'notistack';
import useSubmitForm from './hooks/useSubmitForm';
import useForm from './hooks/useForm';
import useEditForm from './hooks/useEditForm';

const initValues = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  dob: "",
  subjects: []
}

export default function AddNewStudentForm({open, setOpen, ...rest}) {
  const {selectedForEdit, setSelectedForEdit} = rest || {};

  const classes = useStyles();
  
  const [createStudent,loading, serverResponseData] = useSubmitForm();
  const [updateStudent, updateStudentLoading, updateStudentServerResponseData] = useEditForm();
  const [values, onChangeHandler] = useForm(
    selectedForEdit ? {...initValues, ...selectedForEdit} : initValues
  );

  const { enqueueSnackbar } = useSnackbar();

  const handleAdd = async () => {
    try {
      if (selectedForEdit) {
        await updateStudent(values)
        enqueueSnackbar('Student edited successfully', {variant: 'success'})        
      }else{
        await createStudent(values)
        enqueueSnackbar('Student added successfully', {variant: 'success'})
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
            Student Information
          </Typography>
          <React.Fragment>
            <Form
              values={values}
              onChangeHandler={onChangeHandler}            
            />
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