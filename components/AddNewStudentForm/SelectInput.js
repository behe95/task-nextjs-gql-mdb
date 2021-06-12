import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

import {useQuery} from '@apollo/client';
import {GET_ALL_SUBJECTS} from '../../apolloClient/queries/subjects';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const subjects = [
    'Bengali',
    'English',
    'Math',
  ];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({onChangeHandler, values}) {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const { loading:getAllSubjectsLoading, error:getAllSubjectsError, data:getAllSubjectsData } = useQuery(GET_ALL_SUBJECTS, {
    fetchPolicy: "cache-first"
  });

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };


  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Subjects</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          name="subjects"
          multiple
          value={values}
          onChange={onChangeHandler}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {!getAllSubjectsLoading && !getAllSubjectsError && getAllSubjectsData?.getAllSubjects.map(subject => (
            <MenuItem key={subject.id} value={subject.id}>
              <Checkbox checked={values.indexOf(subject.id) > -1} />
              <ListItemText primary={subject.title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
