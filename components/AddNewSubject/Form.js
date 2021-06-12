import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';



export default function SubjectForm({values, onChangeHandler}) {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            value={values?.title}
            onChange={e => onChangeHandler(e)}
            required
            id="title"
            name="title"
            label="Subject Title"
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}