import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useEffect, useState } from "react";

const DropDownDateSelector = ({ label, field, form }) => {
    const { name, value } = field;
    const { setFieldValue } = form;
    const [date, setDate] = useState( value || {
        day: null,
        month: null,
        year: null
    });

    useEffect(() => {
        console.log(name);
        const setFormikValue = async() => {
            await setFieldValue(name, date);
        }
        setFormikValue();
    }, [date]);

    const handleChange = (event) => {
        setDate({
            ...date,
            [event.target.name]: event.target.value
        });
        setFieldValue(name, date);
    };

    const daysInMonth = {"January": 31, "February": 28, "March": 31, "April": 30, "May": 31, "June": 30, "July": 31, "August": 31, "September": 30, "October": 31, "November": 30, "December": 31};
    const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    const years = [2001, 2002, 2003, 2004, 2005,];
    return (
        <Stack spacing={1}>
            <InputLabel 
                htmlFor={label}
                sx={{
                    fontWeight: 'bold',
                }}>
                    {label}
            </InputLabel>
            <Stack direction={"row"} spacing={2}>
                    <FormControl>
                        <InputLabel id="day-select-label">Day</InputLabel>
                        <Select name="day" 
                                labelId="day-select-label" 
                                onChange={handleChange} 
                                value={date.date}
                                autoWidth
                                sx={{ minWidth: 80 }}
                                label = {label}
                            >
                            {
                            Array.from(Array(31).keys()).map(day => (<MenuItem value={day}>{day}</MenuItem>))
                            }
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="month-select-label">Month</InputLabel>
                        <Select name="month" 
                                labelId="month-select-label" 
                                onChange={handleChange}
                                value={date.month}
                                autoWidth
                                sx={{ minWidth: 100 }}
                                label = {label}>
                            {monthNames.map((month, index) => (
                                <MenuItem value={index}>{month}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="year-select-label">Year</InputLabel>
                        <Select name="year" 
                                labelId="year-select-label" 
                                onChange={handleChange} 
                                value={date.year}
                                autoWidth
                                sx={{ minWidth: 80 }}
                                label = {label}>
                            {years.map((year) => (
                                <MenuItem value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
            </Stack>
        </Stack>
    );

}

export default DropDownDateSelector;