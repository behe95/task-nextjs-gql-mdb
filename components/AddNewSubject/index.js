import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import Form from './Form';
import Spinner from '../Spinner';


import { useSnackbar } from 'notistack';
import useSubmitForm from './hooks/useSubmitForm';
import useForm from './hooks/useForm';
import useEditForm from './hooks/useEditForm';


const initValues = {
  title: ""
}


export default function AddNewSubjectForm({open, setOpen, ...rest}) {
  const {selectedForEdit, setSelectedForEdit} = rest || {};

  const classes = useStyles();
  
  const [createSubject,loading, serverResponseData] = useSubmitForm();
  const [updateSubject, updateSubjectLoading, updateSubjectServerResponseData] = useEditForm();

  const [values, onChangeHandler] = useForm(
    selectedForEdit ? {...initValues, title: selectedForEdit?.name} : initValues
  );
  const { enqueueSnackbar } = useSnackbar();


  

  const handleAdd = async () => {
    const {title} = values;
    try {
      if (selectedForEdit) {
        await updateSubject(selectedForEdit.id,title)
        enqueueSnackbar('Subject edited successfully', {variant: 'success'})        
      }else{
        await createSubject(title)
        enqueueSnackbar('Subject added successfully', {variant: 'success'})
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
            {selectedForEdit ? 'Edit Subject' : 'Subject Information'}
          </Typography>
          <React.Fragment>

            <Form
              values={values}
              onChangeHandler={onChangeHandler}
            />

            <div className={classes.buttons}>
                <Button
                disabled={loading || updateSubjectLoading}
                onClick={() => setOpen(!open)}
                variant="contained"
                className={classes.button}
                >
                Cancel
                </Button>
                <Button
                disabled={loading || updateSubjectLoading}
                variant="contained"
                color="primary"
                onClick={handleAdd}
                className={classes.button}
                >
                  {
                    loading || updateSubjectLoading ? 
                    <Spinner />
                    :
                    "Add"
                  }
                </Button>
            </div>
          </React.Fragment>
        </Paper>
      </main>

    </React.Fragment>
  );
}