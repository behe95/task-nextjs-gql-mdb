import React from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ConfirmationForm from '../ConfirmationForm'
import _Modal from '../Modal';



const ITEM_HEIGHT = 48;

export default function LongMenu({student,subjects}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const [selectedForDelete, setSelectedForDelete] = React.useState(null);

  const isMounted = React.useRef(true);

  React.useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  },[])

  const handleClick = (event) => {
    if(isMounted.current){
      setAnchorEl(event.currentTarget);

    }
  };

  const handleClose = () => {
    if(isMounted.current){
      setAnchorEl(null);
    }
  };

  const onClickDeleteHandler = (selectedSubject) => {
    if(isMounted.current){
      setSelectedForDelete(i => ({...student, __typename: 'SubjectFromStudent', selectedSubject}));
      setOpenConfirmation(true);

    }
  }

  return (
    <div>
      <Button
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          View Subjects
        </Button>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        // keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {subjects.map((subject) => (
          <MenuItem key={subject.id} onClick={handleClose}>
            {subject.title}
            <IconButton
            onClick={() => onClickDeleteHandler(subject)} 
            color="secondary" component="span">
              <DeleteIcon />
            </IconButton>
          </MenuItem>
        ))}
      </Menu>

      <_Modal
        open={openConfirmation}
        setOpen={setOpenConfirmation}
      >
        <ConfirmationForm
          open={openConfirmation}
          setOpen={setOpenConfirmation}
          selectedForDelete={selectedForDelete}
        />
      </_Modal>
    </div>
  );
}
