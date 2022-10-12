import {
  createTheme,
  CssBaseline,
  Grid,
  Snackbar,
  ThemeProvider,
} from '@mui/material';
import { VISION_RED } from 'constants/Colors';
import CustomCard from 'CustomComponents/CustomCard';
import Login from 'Login';
import React, { createContext, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import CodeVerification from './code.verification';
import ForgotPassword from './forgot.password';

type Props = {};

const theme = createTheme();
type SliderI = {
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  setCopied: React.Dispatch<React.SetStateAction<boolean>>;
  copied: boolean;
};

export const SliderCtx = createContext<SliderI>({
  setIndex: () => {},
  index: 0,
  setCopied: () => {},
  copied: false,
});

const Slider = (props: Props) => {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main">
        <Snackbar
          open={copied}
          autoHideDuration={6000}
          onClose={() => setCopied(false)}
          message="Password Copied!"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          className="z-10"
        />
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={12}
          md={12}
          sx={{
            backgroundAttachment: '',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundBlendMode: 'overlay',
            backgroundColor: VISION_RED,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="h-[100vh] p-4"
        >
          <CustomCard className="px-0 py-0 w-[90%] laptop:max-w-[800px] tablet:max-w-[600px] phone:max-w-full shadow-xl max-h-[472px]">
            <SliderCtx.Provider value={{ setIndex, index, setCopied, copied }}>
              <SwipeableViews disabled index={index} style={{ width: '100%' }}>
                <Login />
                <ForgotPassword />
                <CodeVerification />
              </SwipeableViews>
            </SliderCtx.Provider>
          </CustomCard>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Slider;
