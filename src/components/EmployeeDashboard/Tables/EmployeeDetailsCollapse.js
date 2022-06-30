import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Groups, TITLES } from '../../HRDashboard/EmployeeData';

const EmployeeDetailsCollapse = ({
  details,
  isEmployeeDetails,
  expanded,
  setExpanded,
}) => {
  return (
    <div>
      {details &&
        isEmployeeDetails &&
        Groups.map((group) => {
          const titles = TITLES().filter((t) => t.group === group.key);
          const listItems = titles.map((t) => {
            return {
              value: details[t.key],
              icon: t.icon,
              label: t.label,
            };
          });

          return (
            <Accordion
              fullWidth
              expanded={expanded === `panel-${group.key}`}
              onChange={() =>
                setExpanded(
                  expanded === `panel-${group.key}`
                    ? null
                    : `panel-${group.key}`
                )
              }
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls='panel1a-content'
                id={`panel-${group.key}-header`}
              >
                <Typography
                  sx={{
                    textTransform: 'uppercase',
                    color:
                      expanded === `panel-${group.key}` ? '#1976d2' : 'inherit',
                  }}
                >
                  {group?.label}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List
                  sx={{
                    display: 'flex',
                    alignItems: 'stretch',
                    flexDirection: 'row',
                    width: '100%',
                    flexWrap: 'wrap',
                  }}
                >
                  {listItems.map((item) => {
                    return (
                      <Grid
                        item
                        md={isEmployeeDetails ? 6 : 12}
                        sx={{ alignSelf: 'stretch' }}
                      >
                        <ListItem>
                          <ListItemIcon>{item?.icon}</ListItemIcon>
                          <ListItemText
                            primary={item.value || '-'}
                            secondary={item?.label}
                            primaryTypographyProps={{
                              color:
                                item.value === 'Pending'
                                  ? '#ed6c02'
                                  : item.value === 'Approve'
                                  ? '#2e7d32'
                                  : item.value === 'Disapprove'
                                  ? '#d32f2f'
                                  : '#000',
                            }}
                            secondaryTypographyProps={{
                              fontSize: 11,
                              color: 'primary',
                            }}
                          />
                        </ListItem>
                        <Divider variant='inset' component='li' />
                      </Grid>
                    );
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
};

export default EmployeeDetailsCollapse;
