import {
  ArrowBackIos,
  ForwardToInbox,
  Login,
  VpnKey,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Alert, TextField } from "@mui/material";
import { getForgotPasswordEndpoint } from "apis/userAccess";
import { consoler } from "App";
import { ERROR } from "assets";
import React, { useContext, useEffect, useState } from "react";
import { SliderCtx } from "./slider";

type Props = {};

const ForgotPassword = (props: Props) => {
  const { setIndex, index, employeeNo, setEmployeeNo, setExpiresIn } = useContext(SliderCtx);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendCode = async () => {
    setLoading(true);
    try {
      const { status, data } = await getForgotPasswordEndpoint(employeeNo);
      if (status === 200) {
        // console.log({ data });
        if (data.isValid) {
          setIndex(2);
          setExpiresIn(data.expiresInSeconds)
        }else{
          setError(data.error)
        }
        setLoading(false);  
      }
    } catch (error) {
      consoler(error, "red", "ERROR in handleSendCode");
    }
  };

  useEffect(() => {
    // console.log({ index });

    if (index === 0) {
      setLoading(false);
      setEmployeeNo("");
      setExpiresIn(0);
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

        <div className="flex flex-col">
          {index === 1 && (
            <TextField
              label="Employee No."
              variant="filled"
              size="small"
              defaultValue={""}
              autoComplete='off'
              fullWidth
              disabled={loading}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={(e: any) => setEmployeeNo(e.target.value)}
              value={employeeNo}
            />
          )}

          <div className="flex-1 flex flex-row items-center mt-4">
            <div className="flex-1">
              <button
                disabled={loading}
                onClick={() => setIndex(0)}
                className="py-1 px-4 bg-gray-0 hover:bg-gray-100 rounded-md flex flex-row items-center"
              >
                <ArrowBackIos />
                <span className="flex-1">Back</span>
              </button>
            </div>
            <LoadingButton
              className="bg-sky-500 hover:bg-sky-600 text-md ease-in-out"
              loading={loading}
              loadingPosition="start"
              startIcon={<ForwardToInbox />}
              variant="contained"
              disabled={loading || !employeeNo}
              onClick={handleSendCode}
              disableElevation
            >
              {loading ? "Sending" : "Send"} Code
            </LoadingButton>
          </div>
        </div>

        {error &&
          <div className="flex-1 flex-row items-center justify-center mt-4">
            <Alert severity="error">{error}</Alert>
          </div>
        }

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

export default React.memo(ForgotPassword);
