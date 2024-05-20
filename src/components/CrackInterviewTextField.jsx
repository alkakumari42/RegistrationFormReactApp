import { Box, FormControl, InputLabel, Stack, TextField } from "@mui/material";
import { useField } from "formik";
import { useEffect, useState } from "react";

  
const CrackInterviewTextField = ({ label, field, form, ...props }) => {
    const { name, value } = field;
    const { setFieldValue } = form;
    const [meta] = useField(props);

    const [error, setError] = useState({
        isError: false,
        errorMessage: null
    });
    const [textFieldValue, setTextFieldValue] = useState(value);

    useEffect(() => {
        setFieldValue(name, textFieldValue);
        if (meta && meta.touched && meta.error) {
            setError({
                isError: true,
                errorMessage: meta.error[field.name]
            })
        } else {
            setError({
                isError: false,
                errorMessage: null
            });
        }
    }, [textFieldValue]);

    const handleChange = (event) => {
        setTextFieldValue(event.target.value);
    };
      
    return (
        <Box>
            <Stack spacing={1}>
                <InputLabel 
                    htmlFor={label}
                    sx={{
                        fontWeight: 'bold',
                      }}>
                    {label}
                </InputLabel>
                <FormControl>
                    <TextField
                        {...field}
                        {...props}
                        value={textFieldValue}
                        onChangeCapture= {handleChange}
                        error= {error.isError}
                        helperText = {error.errorMessage}
                        variant="outlined"
                        id = {label}
                        label={label}
                    />
                </FormControl>
                
            </Stack>
        </Box>
    );
};

export default CrackInterviewTextField;