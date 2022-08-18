import React, { useState } from 'react';
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { VISION_LOGO_WHITE } from 'assets';
import { Link } from 'react-router-dom';
import { doNothing } from '@mui/x-date-pickers/internals/utils/utils';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: any[];
};

const NavDrawer = ({ open, setOpen, navigation }: Props) => {
  return (
    <Drawer
      anchor='left'
      open={open}
      onClose={() => setOpen(false)}
      className='backdrop-blur-sm'
    >
      <Box sx={{ width: 320 }} role='presentation'>
        <div className='bg-v-red p-4 flex items-center justify-center'>
          <img src={VISION_LOGO_WHITE} alt='' className='h-8' />
        </div>
        <List>
          {navigation.map((item: any) => {
            return item.menus ? (
              <>
                <Menus key={item.href} item={item} setOpen={setOpen} />
              </>
            ) : (
              <Link to={item.href} key={item.href}>
                <ListItemButton
                  className='text-sm'
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </ListItemButton>
              </Link>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

const Menus = ({ item, setOpen }) => {
  const [openMenus, setOpenMenus] = useState<boolean>(false);
  return (
    <>
      <ListItemButton
        onClick={() => setOpenMenus(!openMenus)}
        className='text-sm'
      >
        <ListItemText
          primary={item.name}
          primaryTypographyProps={{ sx: { fontSize: '0.875rem' } }}
        />

        {openMenus ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openMenus} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {item.menus.map((menu: any) => {
            return (
              <Link to={menu.href}>
                <ListItemButton
                  sx={{ pl: 4 }}
                  className='text-sm'
                  onClick={() => setOpen(false)}
                >
                  {menu.label}
                </ListItemButton>
              </Link>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};

export default NavDrawer;
