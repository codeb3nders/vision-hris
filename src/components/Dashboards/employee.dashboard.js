import { Card, Grid } from '@mui/material';
import React from 'react';

const EmployeeDashboard = () => {
  return (
    <Grid container>
      <Grid item flex={1}>
        <Card sx={{ p: 2 }}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui, illo
          tenetur. Assumenda, omnis consequatur repellat fugit commodi incidunt
          beatae ea.
        </Card>
      </Grid>
      <Grid item flex={1}>
        <Card sx={{ p: 2 }}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui, illo
          tenetur. Assumenda, omnis consequatur repellat fugit commodi incidunt
          beatae ea.
        </Card>
      </Grid>
    </Grid>
  );
};

export default EmployeeDashboard;
