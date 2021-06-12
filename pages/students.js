import React from 'react';
import StudentsTable from '../components/Students'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Modal from '../components/Modal';
import AddNewStudentForm from '../components/AddNewStudentForm';

import {GET_ALL_STUDENTS} from '../apolloClient/queries/students';
import {useQuery} from '@apollo/client'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Students() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };

    const {
      data: getAllStudentsData,
      loading:getAllStudentsLoading,
      error: getAllStudentsError
  } = useQuery(GET_ALL_STUDENTS);

    console.log(getAllStudentsData);

    return (
      <>
      <div className={classes.root}>
          <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          >
              <Button
                  onClick={handleOpen}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<AddCircleOutlineIcon />}
              >
                  Add New Student
              </Button>
          </Grid>
          <Grid container spacing={3}>
              <Grid item xs={12}>
                  <StudentsTable
                    getAllStudentsData={getAllStudentsData}
                    getAllStudentsError={getAllStudentsError}
                    getAllStudentsLoading={getAllStudentsLoading}
                  />
              </Grid>
          </Grid>    
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
      >
        <AddNewStudentForm
          open={open}
          setOpen={setOpen}
        />
      </Modal>
      </>
    )
}
