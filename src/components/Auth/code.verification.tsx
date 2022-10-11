/* eslint-disable react-hooks/exhaustive-deps */
import { ContentCopy, Login, VerifiedUser } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, IconButton, TextField } from '@mui/material';
import { CODE_NEW } from 'assets';
import { useContext, useEffect, useState } from 'react';
import { SliderCtx } from './slider';

type Props = {};

const CodeVerification = (props: Props) => {
  const { setIndex, index, setCopied, copied } = useContext(SliderCtx);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(false);
  const [verificationCode, setVerificationCode] = useState(null);

  const handleVerify = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setLoading(false);
        setNewPassword('S4MPL3'); // comment to simulate error
        // setError(true); // un-comment to simulate errors
      }, 2000);
    } catch (error) {}
  };

  useEffect(() => {
    if (index !== 2) {
      setNewPassword('');
      setError(false);
      setLoading(false);
      setVerificationCode(null);
    }
  }, [index]);

  const handleCopyPassword = () => {
    const newPass: any = document.querySelector('#new-password');
    const val: any = newPass?.innerHTML;
    navigator.clipboard.writeText(val);
    setCopied(true);
  };

  return (
    <section className="w-full h-[100%] flex flex-row relative">
      <div className="bg-gradient-to-r from-gray-600 to-gray-700  w-[55%] overflow-hidden relative">
        <div className="w-[450px] absolute top-[60px] left-[40%] translate-x-[-50%]">
          <img src={CODE_NEW} alt="" className="opacity-75" />
        </div>
      </div>

      <div className="w-[45%] p-6 flex flex-col h-full">
        <strong className="uppercase mb-2 block">
          {newPassword ? 'Congratulations!' : 'Enter Verification Code'}
        </strong>
        {!newPassword && (
          <>
            <p className="text-xs mb-4 text-gray-400">
              Please enter the verification code that was sent to your Company
              Email Address.
            </p>

            {error && !loading && (
              <Alert severity="error">
                Invalid verification code or something went wrong.{' '}
                <span className="underline">Contact us.</span>
              </Alert>
            )}

            <div className="flex flex-col items-end mt-4">
              <div className="flex flex-row items-center w-full gap-2">
                <div className="text-md font-bold">VHRIS -</div>
                <div className="flex-1">
                  {index === 2 && (
                    <TextField
                      placeholder="Code"
                      variant="filled"
                      size="small"
                      fullWidth
                      disabled={loading}
                      hiddenLabel
                      error={error && !loading}
                      onChange={(e: any) => setVerificationCode(e.target.value)}
                      value={verificationCode}
                    />
                  )}
                </div>
              </div>
              <LoadingButton
                className="bg-sky-500 hover:bg-sky-600 text-md ease-in-out mt-4"
                loading={loading}
                loadingPosition="start"
                startIcon={<VerifiedUser />}
                variant="contained"
                disabled={loading || !verificationCode}
                onClick={handleVerify}
                disableElevation
              >
                {loading ? 'Verifying Code' : 'Verify Code'}
              </LoadingButton>
            </div>
          </>
        )}

        {newPassword && (
          <div className="flex-1 flex flex-row items-start justify-center">
            <div className="flex flex-col flex-1 gap-2">
              <Alert severity="success">
                Success! Here's your new password.
              </Alert>
              <strong className="text-lg p-2 bg-v-red text-white rounded-md text-center flex flex-row items-center">
                <span className="flex-1" id="new-password">
                  {newPassword}
                </span>
                <IconButton size="small" onClick={handleCopyPassword}>
                  <ContentCopy fontSize="small" className="text-white" />
                </IconButton>
              </strong>
            </div>
          </div>
        )}

        <div
          className={`${
            newPassword ? '' : 'flex-1'
          } flex flex-row items-end justify-center`}
        >
          <button
            className={`p-2 w-full bg-gray-200 rounded-sm mt-2 text-sm hover:bg-gray-300 ease-in-out duration-150 uppercase flex flex-row items-center justify-center gap-2 ${
              copied ? '!bg-sky-500 !text-white hover:bg-sky-600' : ''
            }`}
            onClick={() => setIndex(0)}
          >
            <Login className="text-sm" /> Sign In
          </button>
        </div>
      </div>
    </section>
  );
};

export default CodeVerification;
