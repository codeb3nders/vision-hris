import React, {useState, useContext} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Menu, MenuItem, Tooltip } from '@mui/material';
import { LeavesCtx } from './LeaveManagement';
import { GridMoreVertIcon } from '@mui/x-data-grid';
import { CheckTwoTone, ClearTwoTone } from '@mui/icons-material';
import { AppCtx } from 'App';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

type Props = {
  d: any;
  handleCancel?: any;
  handleUpdate?: any;
}

const LeaveDataCard = ({ d, handleCancel, handleUpdate }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const { isManagerLogin } = useContext(AppCtx);
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClose = (e) => {
    setAnchorEl(null)
  }
console.log({isManagerLogin})
  return <Card sx={{ width: '100%' }} className="phone: w-full">
    <CardHeader
      sx={{ padding: 1, backgroundColor: "#f0f8ff" }}
      avatar={
        <Tooltip title={d.leaveTypeDetails.name} >
          {d.leaveTypeDetails.icon}
        </Tooltip>
      }
      action={isManagerLogin && <IconButton aria-label="settings">
            <GridMoreVertIcon onClick={(e:any) => setAnchorEl(e.currentTarget)}  />
          </IconButton>}
      title={d.startDate}
      subheader={isManagerLogin && `${d.employeeDetails.lastName}, ${d.employeeDetails.firstName[0]}.`}
    />
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>View Leaves</MenuItem>
    </Menu>
    <CardContent>
      <div className='grid grid-cols-2 gap-1'>
        <div className='phone:col-span-2 laptop:col-span-1 desktop:col-span-1'>
          <Typography variant="subtitle1" className="text-[11px] text-sky-500">No. of Days</Typography>
          <Typography variant="body2">{d.noOfDays}</Typography>
        </div>
        <div className='phone:col-span-2 laptop:col-span-1 desktop:col-span-1'>
          <Typography variant="subtitle1" className="text-[11px] text-sky-500">Return Date</Typography>
          <Typography variant="body2">{d.returnDate}</Typography>
        </div>
        <div>
          <Typography variant="subtitle1" className="text-[11px] text-sky-500">Reason</Typography>
          <Typography variant="body2">{d.reasonOfLeave}</Typography>
        </div>
      </div>
    </CardContent>
    
    <CardActions disableSpacing className='flex flex-row gap-2 text-xs justify-center w-full p-0'>
      {/* <button className='bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1 flex items-center justify-center transition duration-150 ease-in-out rounded-sm' onClick={handleCancel}>
          <ClearTwoTone className='text-sm' /> Cancel
      </button>
      <button className='bg-orange-600 hover:bg-orange-700 text-white px-2 py-1 flex items-center justify-center transition duration-150 ease-in-out rounded-sm' onClick={handleUpdate}>
        <EditTwoTone className='text-sm' /> Update
      </button> */}
      {isManagerLogin && <>
        <button className='bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1 flex items-center justify-center transition duration-150 ease-in-out rounded-sm' onClick={handleCancel}>
          <ClearTwoTone className='text-sm' /> Disapprove
        </button>
        <button className='bg-orange-600 hover:bg-orange-700 text-white px-2 py-1 flex items-center justify-center transition duration-150 ease-in-out rounded-sm' onClick={handleUpdate}>
          <CheckTwoTone className='text-sm' /> Approve
        </button>
      </>}
      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </ExpandMore>
    </CardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <div className='grid grid-cols-1 gap-1'>
          <div>
            <Typography variant="subtitle1" className="text-[11px] text-sky-500">Last Day of Leave</Typography>
            <Typography variant="body2">{d.lastDate}</Typography>
          </div>
          <div>
            <Typography variant="subtitle1" className="text-[11px] text-sky-500">Approver</Typography>
            <Typography variant="body2">{d.approverDetails.firstName} { d.approverDetails.lastName}</Typography>
          </div>
          <div>
            <Typography variant="subtitle1" className="text-[11px] text-sky-500">Date Requested</Typography>
            <Typography variant="body2">{ d.dateRequested}</Typography>
          </div>
        </div>
      </CardContent>
    </Collapse>
  </Card>
}

export default LeaveDataCard;