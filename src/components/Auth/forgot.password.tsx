import { ForwardToInbox, Login, VpnKey } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import { ERROR } from 'assets';
import React, { useContext, useEffect, useState } from 'react';
import { SliderCtx } from './slider';

type Props = {};

const ForgotPassword = (props: Props) => {
  const { setIndex, index } = useContext(SliderCtx);
  const [loading, setLoading] = useState(false);
  const [employeeNo, setEmployeeNo] = useState(null);

  const handleSendCode = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setIndex(2);
        setLoading(false);
      }, 2000);
    } catch (error) {}
  };

  useEffect(() => {
    console.log({ index });

    if (index !== 1) {
      setLoading(false);
      setEmployeeNo(null);
    }
  }, [index]);

  return (
    <section className="w-full h-[100%] flex flex-row">
      <div className="bg-gradient-to-r from-gray-600 to-gray-700  w-[55%] overflow-hidden relative">
        <div className="w-[600px] absolute top-[50px] left-[50%] translate-x-[-50%]">
          <img src={ERROR} alt="" />
        </div>
      </div>

      <div className="w-[45%] p-6 flex flex-col h-full">
        <strong className="uppercase mb-2 block">Forgot Password</strong>
        <p className="text-xs mb-4 text-gray-400">
          Please enter your Employee Number to send a Verification Code on your
          Company Email Address.
        </p>

        <div className="flex flex-col items-end">
          {index === 1 && (
            <TextField
              label="Employee No."
              variant="filled"
              size="small"
              fullWidth
              disabled={loading}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              onChange={(e: any) => setEmployeeNo(e.target.value)}
              value={employeeNo}
            />
          )}
          <LoadingButton
            className="bg-sky-500 hover:bg-sky-600 text-md ease-in-out mt-4"
            loading={loading}
            loadingPosition="start"
            startIcon={<ForwardToInbox />}
            variant="contained"
            disabled={loading || !employeeNo}
            onClick={handleSendCode}
            disableElevation
          >
            {loading ? 'Sending' : 'Send'} Code
          </LoadingButton>
        </div>

        <div className="flex-1 flex flex-row items-end justify-center">
          <button
            className="p-2 w-full bg-gray-200 rounded-sm mt-2 text-sm hover:bg-gray-300 ease-in-out duration-150 uppercase flex flex-row items-center justify-center gap-2"
            onClick={() => setIndex(0)}
          >
            <Login className="text-sm" /> Sign In
          </button>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
