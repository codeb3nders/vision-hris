/* eslint-disable react-hooks/exhaustive-deps */
import {
  ContentCopy,
  Login,
  VerifiedUser,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  FilledInput,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { CODE_NEW } from "assets";
import { useContext, useEffect, useState } from "react";
import { SliderCtx } from "./slider";

type Props = {};

const CodeVerification = (props: Props) => {
  const { setIndex, index, setCopied, copied } = useContext(SliderCtx);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(false);
  const [verificationCode, setVerificationCode] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setLoading(false);
        setUpdated(true);
        // setError(true); // un-comment to simulate errors
      }, 2000);
    } catch (error) {}
  };

  useEffect(() => {
    if (index !== 2) {
      setUpdated(false);
      setNewPassword("");
      setError(false);
      setLoading(false);
      setVerificationCode(null);
    }
  }, [index]);

  const handleCopyPassword = () => {
    const newPass: any = document.querySelector("#new-password");
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
          {updated ? "Congratulations!" : "Enter Verification Code"}
        </strong>
        {!updated && (
          <>
            <p className="text-xs mb-4 text-gray-400">
              Please enter the verification code that was sent to your Company
              Email Address.
            </p>

            {error && !loading && (
              <Alert severity="error">
                Invalid verification code or something went wrong.{" "}
                <span className="underline">Contact us.</span>
              </Alert>
            )}

            <div className="flex flex-col items-end mt-4">
              <div className="flex flex-row items-center w-full gap-2">
                <div className="flex-1">
                  {index === 2 && (
                    <>
                      <TextField
                        label="Verification Code"
                        variant="filled"
                        size="small"
                        fullWidth
                        disabled={loading}
                        error={error && !loading}
                        onChange={(e: any) =>
                          setVerificationCode(e.target.value)
                        }
                        value={verificationCode}
                      />
                      <FormControl fullWidth variant="filled" className="mt-2">
                        <InputLabel htmlFor="new-password">
                          New Password
                        </InputLabel>
                        <FilledInput
                          id="new-password"
                          size="small"
                          fullWidth
                          value={newPassword}
                          disabled={loading}
                          error={error && !loading}
                          type={showPassword ? "text" : "password"}
                          onChange={(e: any) => setNewPassword(e.target.value)}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword((prev) => !prev)}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </>
                  )}
                </div>
              </div>
              <LoadingButton
                className="bg-sky-500 hover:bg-sky-600 text-md ease-in-out mt-4"
                loading={loading}
                loadingPosition="start"
                startIcon={<VerifiedUser />}
                variant="contained"
                disabled={loading || !verificationCode || !newPassword}
                onClick={handleVerify}
                disableElevation
              >
                Submit
              </LoadingButton>
            </div>
          </>
        )}

        {updated && (
          <div className="flex-1 flex flex-row items-start justify-center">
            <div className="flex flex-col flex-1 gap-2">
              <Alert severity="success">
                Password has been successfully updated.
              </Alert>
              {/* <strong className="text-lg p-2 bg-v-red text-white rounded-md text-center flex flex-row items-center">
                <span className="flex-1" id="new-password">
                  {newPassword}
                </span>
                <IconButton size="small" onClick={handleCopyPassword}>
                  <ContentCopy fontSize="small" className="text-white" />
                </IconButton>
              </strong> */}
            </div>
          </div>
        )}

        <div
          className={`${
            updated ? "" : "flex-1"
          } flex flex-row items-end justify-center`}
        >
          <button
            className={`p-2 w-full bg-gray-200 rounded-sm mt-2 text-sm hover:bg-gray-300 ease-in-out duration-150 uppercase flex flex-row items-center justify-center gap-2 ${
              updated ? "!bg-sky-500 !text-white hover:bg-sky-600" : ""
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
