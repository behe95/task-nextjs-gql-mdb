import React from 'react';
import SubjectsTable from '../components/Subjects'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Modal from '../components/Modal';
import AddNewSubject from '../components/AddNewSubject';

import {GET_ALL_SUBJECTS} from '../apolloClient/queries/subjects';
import {useQuery} from '@apollo/client'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Subjects() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };


    const {
        data: getAllSubjectsData,
        loading:getAllSubjectsLoading,
        error: getAllSubjectsError
    } = useQuery(GET_ALL_SUBJECTS);

    

    
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
                    Add New Subject
                </Button>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SubjectsTable
                        getAllSubjectsData={getAllSubjectsData}
                        getAllSubjectsLoading={getAllSubjectsLoading}
                        getAllSubjectsError={getAllSubjectsError}
                    />
                </Grid>
            </Grid>    
        </div>
        <Modal
            open={open}
            setOpen={setOpen}
        >
            <AddNewSubject
                open={open}
                setOpen={setOpen}
            />
        </Modal>
        </>
    )
}


