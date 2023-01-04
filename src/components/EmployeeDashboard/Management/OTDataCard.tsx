import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Chip, Divider, List, ListItem, ListItemText, Tooltip } from '@mui/material';
import { OTIcon } from 'components/Dashboards/Common/icons';
import { moment } from "App";

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

const OTDataCard = ({ d, handleCancel, handleUpdate }: Props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return <Card sx={{ width: '100%' }} className="phone: w-full">
    <CardHeader
      sx={{padding: 1, backgroundColor: "#f0f8ff"}}
      title={<Typography variant="subtitle1">{ d.date }</Typography>}
      subheader={`${d.timeFrom} - ${d.timeTo} (${d.totalOThrs} ${d.totalOThrs > 1 ? 'hrs' : 'hr'})`}
    />
    <CardContent>
      <div className='grid grid-cols-3 gap-0'>
        <div className='phone:col-span-3 laptop:col-span-1 desktop:col-span-1'>
          <Typography variant="subtitle1" className="text-[11px] text-sky-500">Early OT</Typography>
          <Typography variant="body2">{d.earlyOT}</Typography>
        </div>
        <div className='phone:col-span-3 laptop:col-span-1 desktop:col-span-1'>
          <Typography variant="subtitle1" className="text-[11px] text-sky-500">Less Break</Typography>
          <Typography variant="body2">{d.lessBreak}</Typography>
        </div>
        <div className='phone:col-span-3 laptop:col-span-1 desktop:col-span-1'>
          <Typography variant="subtitle1" className="text-[11px] text-sky-500">Plus 1 Day</Typography>
          <Typography variant="body2">{d.plus1day}</Typography>
        </div>
        <div className='col-span-3'>
          <Typography variant="subtitle1" className="text-[11px] text-sky-500">Reason</Typography>
          <Typography variant="body2">{d.reason}</Typography>
        </div>
      </div>
    </CardContent>
    <CardActions disableSpacing className='flex flex-row gap-2 text-xs justify-center w-full p-0'>
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

export default OTDataCard;