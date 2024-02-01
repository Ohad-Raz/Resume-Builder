import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function Education({ updateFormData }) {
  const handleFieldChange = (field, value) => {
    // Update the form data with the new value
    updateFormData(field, value);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Education Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="university"
            name="university"
            label="University/College"
            fullWidth
            autoComplete="organization"
            variant="standard"
            multiline
            rows={3}
            onChange={(e) => handleFieldChange("university", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="degree"
            name="degree"
            label="Degree/Course"
            fullWidth
            autoComplete="degree"
            variant="standard"
            multiline
            rows={3}
            onChange={(e) => handleFieldChange("degree", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="studyLocation"
            name="studyLocation"
            label="Study Location"
            fullWidth
            variant="standard"
            multiline
            rows={3}
            onChange={(e) => handleFieldChange("studyLocation", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="graduationYear"
            name="graduationYear"
            label="Graduation Year"
            fullWidth
            variant="standard"
            onChange={(e) =>
              handleFieldChange("graduationYear", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="aboutEducation"
            name="aboutEducation"
            label="Tell us about your educational experience"
            fullWidth
            multiline
            rows={3}
            variant="standard"
            onChange={(e) =>
              handleFieldChange("aboutEducation", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveEducation" value="yes" />
            }
            label="Use this information for further correspondence"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
