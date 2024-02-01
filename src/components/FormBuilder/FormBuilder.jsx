import React, { useEffect, useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Education from "../Education/Education";
import Experience from "../Experience/Experience";
import PersonalDetails from "../PersonalDetails/PersonalDetails";
import { dataBase } from "../../config/FireBaseConfig";
import { useUser } from "../Context/UserContext";

import { auth } from "../../config/FireBaseConfig";
import { collection, addDoc } from "@firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";




const steps = ["Personal Details", "Education", "Experience"];
export default function FormBuilder() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [education, setEducation] = React.useState({});
  const [experience, setExperience] = React.useState({});
  const [personalInfo, setPersonalInfo] = React.useState({});
  const [isFirebaseInitialized, setIsFirebaseInitialized] = React.useState(false);
  const { user } = useUser(useUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setIsFirebaseInitialized(true);
    });
    return () => unsubscribe();
  }, []);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      saveFormDataToFirebase();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const saveFormDataToFirebase = async () => {
    if (!isFirebaseInitialized) {
      console.error("Firebase is not initialized yet.");
      return;
    }
    const collectionPath = "resumes";
    try {
      const formData = { education, experience, personalInfo };
      const docRef = await addDoc(
        collection(dataBase, collectionPath),
        { ...formData, user: user ? user.uid : null }
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const updateEducation = (field, value) => {
    setEducation((prevEducation) => ({
      ...prevEducation,
      [field]: value,
    }));
  };

  const updateExperience = (field, value) => {
    setExperience((prevExperience) => ({
      ...prevExperience,
      [field]: value,
    }));
  };

  const updatePersonalInfo = (field, value) => {
    setPersonalInfo((prevPersonalInfo) => ({
      ...prevPersonalInfo,
      [field]: value,
    }));
  };

  const renderFormStep = (step) => {
    switch (step) {
      case 0:
        return <PersonalDetails updateFormData={updatePersonalInfo} />;
      case 1:
        return <Education updateFormData={updateEducation} />;
      case 2:
        return <Experience updateFormData={updateExperience} />;
      default:
        throw new Error("Unknown step");
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Create your Resume
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Build Resume
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for working with us.
              </Typography>
              <Typography variant="subtitle1">
                Your Resume is ready to download.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {renderFormStep(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}