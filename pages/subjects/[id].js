import React from 'react';
import SingleSubjectTable from '../../components/SingleSubject'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '../../components/Modal';
import AddNewSubject from '../../components/AddNewSubject';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function SingleSubject() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };


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
                    startIcon={<EditIcon />}
                >
                    Edit
                </Button><Button
                    onClick={handleOpen}
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SingleSubjectTable />
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
