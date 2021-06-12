import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import useToolbarStyles from './useToolbarStyles';
import TextField from '@material-ui/core/TextField';

import FilterSelect from '../Select';


const filterOptions = [
  {value: "title", label: "Title"}
]

export default function SubjectsTableToolbar(props){
    const classes = useToolbarStyles();
    const { numSelected, handleMultipleDelete, setSearch,search, setSearchBy,searchBy } = props;
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Subjects
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={handleMultipleDelete} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}


        <TextField
         value={search}
         onChange={e => setSearch(e.target.value)}
         id="standard-search" label="Search field" type="search" />
        <FilterSelect
        filterOptions={filterOptions} 
        setSearchBy={setSearchBy} searchBy={searchBy} />

      </Toolbar>
    );
  };
  
  SubjectsTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };