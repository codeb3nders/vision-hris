import {
  BusinessCenter,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { AppCtx } from 'App';
import OBDataCard from 'components/EmployeeDashboard/Management/OBDataCard';
import ConfirmDelete from 'components/Other/confirm.delete';
import { CANCELLED } from 'constants/Values';
import DialogModal from 'CustomComponents/DialogModal';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAction } from 'slices/obRequests';
import { getAllDataAction, dataStatus, newDataStatus } from 'slices/obRequests';
import { OBDetailsInitialState, OBDetailsModel } from '../OfficialBusiness';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';

type Props = {
  data: OBDetailsModel[];
  isHRview?: boolean;
};

const Pending = ({ data, isHRview }: Props) => {
  const dispatch = useDispatch();
  const { access_token } = useContext(AppCtx);

  return <>
    <CollapseWrapper
      panelTitle='Official Business For Approval'
      icon={BusinessCenter}
      open
      contentClassName='p-0'
    >
      <Grid container justifyContent="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 12, sm: 6, md: 12 }}>
        {
          data.map((d: any) => {
            return <Grid item xs sm={3} md={3}>
              <OBDataCard
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
