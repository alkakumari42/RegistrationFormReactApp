import DropDownDateSelector from './dropDownDateSelector';
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import CrackInterviewTextField from './CrackInterviewTextField';
import Paper from '@mui/material/Paper';
import { Button, Stack, Item, OutlinedInput, InputLabel, Typography, Box, Snackbar, Alert } from '@mui/material';
import {createUser} from '../clients';
import { useState } from 'react';


const RegistrationForm = () => {
    const [showToast, setShowToast] = useState({
        shouldShowToast: false
    });

    const handleSuccessResponnse = async() => {
        setShowToast({
            shouldShowToast: true,
            type: 'success',
            message: 'User account successfully created'
        });
    }

    const handleFailureResponse = async(errorMessage) => {
        setShowToast({
            shouldShowToast: true,
            type: 'error',
            message: errorMessage
        });
    }

    const formHandler = async(values) => {
        console.log(JSON.stringify(values));
        const {result, errorMessage} = await createUser(values);
        if(result === "SUCCESS") {
            handleSuccessResponnse();
        } else {
            handleFailureResponse(errorMessage);
        }
    };

    const handleCancel = () => {
        console.log("Cancelled");
    }

    const FIELD_TYPES = Object.freeze({ 
        TEXT_FEILD: 0, 
        DATE_FEILD: 1,
    });

    const registrationFormConfig = [{
        fieldName: "fullName",
        label: "Full Name",
        type: FIELD_TYPES.TEXT_FEILD,
    }, {
        fieldName: "contact_number",
        label: "Contact Number",
        type: FIELD_TYPES.TEXT_FEILD,
    }, {
        fieldName: "email",
        label: "Email",
        type: FIELD_TYPES.TEXT_FEILD,
    }, {
        fieldName: "date_of_birth",
        label: "Birth date",
        type: FIELD_TYPES.DATE_FEILD,
    }, {
        fieldName: "password",
        label: "Password",
        type: FIELD_TYPES.TEXT_FEILD,
    }, {
        fieldName: "confirm_password",
        label: "Confirm Password",
        type: FIELD_TYPES.TEXT_FEILD,
    }];

    const fieldComponentByType = {
        0: CrackInterviewTextField,
        1: DropDownDateSelector,
    }

    Yup.addMethod(Yup.string, 'noSymbol', function(errorMessage){
        const regexPeriod = /^[^!@#$%^&*+=<>:;|~]*$/;  
        return this.matches(regexPeriod, errorMessage);
       });
    
    Yup.addMethod(Yup.string, "phoneNumber", function(errorMessage){
        const phoneRegExp = /(\(\+[0-9]{2}\))?([0-9]{3}-?)?([0-9]{3})\-?([0-9]{4})(\/[0-9]{4})?$/;
        return this.matches(phoneRegExp, errorMessage);
    })
    
    return (
    <Formik initialValues = {{
        fullName: "",
        contact_number : "",
        email: "",
        date_of_birth: {},
        password: "",
        confirm_password: "",
    }}
    onSubmit = {(values) => {
        formHandler(values);
    }}
    validationSchema = {Yup.object({
        fullName: Yup.string()
            .noSymbol("Sorry, this name is not valid. No symbols are allowed.")
            .required("Name is a required field."),
        contact_number: Yup.string().phoneNumber("Canadian phone number format is required.").required("Contact number is required."),
        email: Yup.string().email().required("Email is required"),
        date_of_birth: Yup.object().shape({
            day: Yup.number().min(1).max(31).required("Day is required"),
            month: Yup.number().required("Month is required"),
            year: Yup.number().required("Year is required")
        }),
        //Assumption: The requirement is to have "minimum" 8 chars in password. If the requirement is to have exact 8 characters, we can use length()
        password: Yup.string().min(8, "Minimum 8 characters are required.").noSymbol("Only alphanumeric characrters are allowed").required("Password is required."),
        confirm_password: Yup.string().oneOf([Yup.ref("password"), null], "Must be the same as the password field").required("Confirm Password is required.")
    })}>

    
       {(formik) => (
                <Form onSubmit={formik.handleSubmit}>
                    <Paper elevation={4}  sx={{ padding: 4 }}>
                        <Stack spacing={2}>
                            {
                                registrationFormConfig.map((fieldConfig) => (
                                    <Box>
                                        <Field name={fieldConfig.fieldName} 
                                               label = {fieldConfig.label} 
                                               component={fieldComponentByType[fieldConfig.type]}
                                        />
                                        <ErrorMessage name={fieldConfig.fieldName}>
                                        {errorMessage => (
                                            <Typography variant="body2" color="error" style={{ marginTop: '8px' }}>
                                                {errorMessage}
                                            </Typography>
                                        )}
                                        </ErrorMessage>
                                    </Box>
                                    )
                                )
                            }
                        </Stack> 
                    </Paper>
                    <Stack direction={"row"} 
                            spacing={5} 
                            mt={3}
                            sx={{
                                display: 'flex', // Use flexbox for the container
                                justifyContent: 'center', // Center horizontally
                                alignItems: 'center', // Center vertically
                                margin: '2'
                            }
                    }>
                        <Button onClick={handleCancel} variant="outlined">Cancel</Button>
                        <Button type="submit" variant="contained"
                            disableRipple
                            sx={{
                                padding: '8px 16px', // Custom padding for the button
                                '& .MuiButton-label': {
                                  padding: '0px', // Reset internal padding of the button label
                                },
                              }}>
                            Submit
                        </Button>

                        <Snackbar
                            open={showToast.shouldShowToast}
                            autoHideDuration={2000}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            action={null}
                        >
                            <Alert severity={showToast.type} sx={{ width: '100%' }}>
                                {showToast.message}
                            </Alert>
                        </Snackbar>
                    </Stack>
                </Form>
       )}
       </Formik>
    );
    
};

export  { RegistrationForm };