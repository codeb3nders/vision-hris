import {
  BusinessCenter,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { AppCtx } from 'App';
import { OTIcon } from 'components/Dashboards/Common/icons';
import OTDataCard from 'components/EmployeeDashboard/Management/OTDataCard';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OTDetailsInitialState, OTDetailsModel } from '../Overtime';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';

type Props = {
  data: OTDetailsModel[];
  isHRview?: boolean;
};

const Pending = ({ data, isHRview }: Props) => {
  const dispatch = useDispatch();
  const { access_token } = useContext(AppCtx);

  return <>
    <CollapseWrapper
      panelTitle='OT For Approval'
      icon={OTIcon}
      open
      contentClassName='p-0'
    >
      <Grid container justifyContent="center" sx={{paddingLeft: 3, paddingRight: 3, paddingBottom: 3}} spacing={{ xs: 1, md: 2 }} columns={{ xs: 12, sm: 6, md: 12 }}>
        {
          data.map((d: any) => {
            return <Grid item xs sm={3} md={3}>
              <OTDataCard
                d={d}
              />
            </Grid>
          })
        }
      </Grid>
    </CollapseWrapper>
  </>
};

export default Pending;
