import React, {useEffect, useState} from 'react';
import { Button, Chip, Divider, MobileStepper, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { LeaveDetailsModel } from 'components/EmployeeDashboard/Management/LeaveManagement';
import { upsert } from 'utils/functions';
import { Moment } from 'moment';
import { OBDetailsModel } from 'components/MyProfile/OfficialBusiness';

export type ItineraryDetailsModel = {
    id:number;
    from:string;
    to:string;
    departureDateTime:Date | null;
    arrivalDateTime:Date | null;
}

export const ItineraryDetailsInitialState: ItineraryDetailsModel = {
  id:0,
  from:"",
  to:"",
  departureDateTime: null,
  arrivalDateTime: null
}
const ItineraryForm = ({data, setDetails}) => {
  // const itineraryDetails = data?.itineraryDetails || [];
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [itineraryList, setItineraryList] = useState<ItineraryDetailsModel[]>([]);
  const [departure, setDeparture] = useState<any>({})
  const [arrival, setArrival] = useState<any>({})
  const [from, setFrom] = useState<any>({})
  const [to, setTo] = useState<any>({})

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleUpdate = (value, column, ctr) => { 
    // console.log({itineraryList})
    const index = itineraryList.findIndex((o: ItineraryDetailsModel) => o.id === ctr)
    // console.log({index})
    if (index > -1) {
      itineraryList[index][column] = value
    } else {
      itineraryList.push({
        ...ItineraryDetailsInitialState,
        [column]: value,
        id: activeStep
      })
    }
    setDetails((data:OBDetailsModel) => {
      return {
        ...data,
        itineraryDetails: itineraryList
      }
    })
    setItineraryList(itineraryList)
  }

  const getForm = (ctr) => {
    
    return <>
      <Divider textAlign='left' ><Chip label={`Itinerary ${ctr + 1}`} /></Divider>
      <TextField label="From" variant="outlined" size="small" value={from[ctr] || ""} onChange={(e: any) => {
        setFrom({ ...from, [ctr]: e.target.value })
        handleUpdate(e.target.value, "from", activeStep)
      }} />
      <TextField label="To" variant="outlined" size="small" value={to[ctr] || ""} onChange={(e: any) => {
        setTo({ ...to, [ctr]: e.target.value });
        handleUpdate(e.target.value, "to", activeStep)
      }} />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <MobileDateTimePicker
          minDate={data.dateFrom}
          maxDate={data.dateTo}
          label="Date/Time of Departure"
          value={departure[ctr] || null}
          onChange={(newValue) => {
            setDeparture({ ...departure, [ctr]: newValue });
            handleUpdate(newValue, "departureDateTime", activeStep)
          }}
          renderInput={(params) => <TextField {...params} variant="outlined" size="small" />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <MobileDateTimePicker
          minDate={data.dateFrom}
          maxDate={data.dateTo}
          label="Date/Time of Arrival"
          value={arrival[ctr] || null}
          onChange={(newValue) => {
            setArrival({ ...arrival, [ctr]: newValue })
            handleUpdate(newValue, "arrivalDateTime", activeStep)
          }}
          renderInput={(params) => <TextField {...params} variant="outlined" size="small" />}
        />
      </LocalizationProvider>
    </>
  }
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      {getForm(activeStep)}
      <MobileStepper
        variant="text"
        steps={5}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === 5-1}
          >
            Add Itinerary
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Previous
          </Button>
        }
      />
    </Box>
  );
}

export default ItineraryForm;