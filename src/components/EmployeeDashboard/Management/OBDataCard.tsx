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
import { Divider, List, ListItem, ListItemText, Tooltip } from '@mui/material';
import { HomeIcon, OBIcon } from 'components/Dashboards/Common/icons';
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

const OBDataCard = ({ d, handleCancel, handleUpdate }: Props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getItinerary = (o) => {
    return <ListItem key={o.id} alignItems="flex-start" className="py-0">
        <ListItemText
          className='py-0'
          primary={<Typography variant="body2">{o.from} - {o.to}</Typography>}
          secondary={<span className="text-xs">{moment(o.departureDateTime).format("hh:mm A")} - {moment(o.arrivalDateTime).format("hh:mm A")}</span>}
        />
      </ListItem>
  }

  return <Card sx={{ width: '100%' }} className="phone: w-full">
    <CardHeader
      sx={{padding: 1, backgroundColor: "#f0f8ff"}}
      avatar={d.isWorkFromHome ? <HomeIcon /> : <OBIcon /> }
      title={d.dateFrom}
    />
    <CardContent>
      <div>
        <div>
          <Typography variant="subtitle1" className="text-[11px] text-sky-500">Purpose</Typography>
          <Typography variant="body2">{d.purpose}</Typography>
        </div>
        <div>
          <Typography variant="subtitle1" className="text-[11px] text-sky-500">Itinerary</Typography>
          <List className="p-0">
          {d.itineraryDetails.map((o: any, i:number) => {
            return <>
              {getItinerary(o)}
              {i < (d.itineraryDetails.length-1) && <Divider />}
            </>
          })
          }
          </List>
        </div>
        {/* <div className='phone:col-span-2 laptop:col-span-1 desktop:col-span-1'>
          <Typography variant="subtitle1" className="text-[11px] text-sky-500">Return Date</Typography>
          <Typography variant="body2">{d.returnDate}</Typography>
        </div> */}
        
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

export default OBDataCard;