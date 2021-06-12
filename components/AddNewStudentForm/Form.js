import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DatePicker from './DatePicker';
import SelectInput from './SelectInput';


export default function StudentForm({values, onChangeHandler}) {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            value={values?.firstname}
            onChange={e => onChangeHandler(e)}
            required
            id="firstname"
            name="firstname"
            label="First name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={values?.lastname}
            onChange={e => onChangeHandler(e)}
            required
            id="lastname"
            name="lastname"
            label="Last name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={values?.email}
            onChange={e => onChangeHandler(e)}
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            value={values?.dob}
            onChangeHandler={onChangeHandler}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={values?.phone}
            onChange={e => onChangeHandler(e)}
            required
            type="number"
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectInput
            values={values?.subjects}
            onChangeHandler={onChangeHandler}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}