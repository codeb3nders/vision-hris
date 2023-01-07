import { useContext, useState } from "react";
import {
  Alert,
  Dialog,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import {
  Password,
  Save,
  SyncLock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { changePasswordEndpoint } from "apis/userAccess";
import { AppCtx } from "App";

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChangePassword = ({ show, setShow }: Props) => {
  const { access_token, userData } = useContext(AppCtx);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
// console.log({oldPassword}, {newPassword})
  const handleChangePassword = async () => {
    setLoading(true);
    setIsSuccess(false);
    setError("");
    try {
      const config = {
          headers: { Authorization: `Bearer ${access_token}` },
      };
      const { status, data } = await changePasswordEndpoint(config, { oldPassword, newPassword, employeeNo: userData.employeeNo })
      // console.log({data})
      if (status === 200) {
        if (data.isValid === false) {
          setError(data.error)
        }else{
          setIsSuccess(true);
        }
      }
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setIsSuccess(false);
    }
  };

  return (
    <Dialog open={show} onClose={() => setShow(false)}>
      <section className="p-8">
        <div className="flex flex-row gap-1 items-center justify-start mb-8">
          <SyncLock />{" "}
          <span className="font-bold text-md">Change Password</span>
        </div>

        <div>
          <FormControl fullWidth variant="standard" disabled={loading}>
            <InputLabel>Old Password</InputLabel>
            <Input
              type={showPassword ? "text" : "password"}
              fullWidth
              size="small"
              className="mb-4"
              onChange={(e: any) => setOldPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl fullWidth variant="standard" disabled={loading}>
            <InputLabel>New Password</InputLabel>
            <Input
              type={showPassword ? "text" : "password"}
              fullWidth
              size="small"
              className="mb-4"
              onChange={(e: any) => setNewPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        {isSuccess &&
          <Alert severity="success">
            Your password was successfully updated.
          </Alert>
        }
        {error &&
          <Alert severity="error">{ error}</Alert>
        }

        <div className="flex flex-row gap-4 mt-8 justify-between items-center">
          <button
            onClick={() => setShow(false)}
            className="px-4 py-2 rounded-md bg-white hover:bg-gray-100 transition-all duration-150"
          >
            Cancel
          </button>
          <LoadingButton
            className="bg-sky-500 hover:bg-sky-600 text-md ease-in-out mt-4"
            loading={loading}
            loadingPosition="start"
            startIcon={<Save />}
            variant="contained"
            disabled={
              loading ||
              !newPassword ||
              !oldPassword
            }
            onClick={handleChangePassword}
            disableElevation
          >
            Submit
          </LoadingButton>
        </div>
      </section>
    </Dialog>
  );
};

export default ChangePassword;
