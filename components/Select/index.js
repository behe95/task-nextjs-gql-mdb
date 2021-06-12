import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useStyles from './useStyles';

const FilterSelect = ({filterOptions,setSearchBy, searchBy}) => {
  const classes = useStyles();
//   const [searchBy, setSearchBy] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setSearchBy(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Search by</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={searchBy}
          onChange={handleChange}
        >
          {
            filterOptions.map((f,_idx) => (
              <MenuItem key={`filter_${f.title}_${_idx}`} value={`${f.value}`}>{f.label}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  );
}

export default FilterSelect;