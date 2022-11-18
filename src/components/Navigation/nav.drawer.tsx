import React, { useState } from 'react';
import {
  Box,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { ExpandLess, ExpandMore, MenuOpen } from '@mui/icons-material';
import { VISION_LOGO_WHITE } from 'assets';
import { Link } from 'react-router-dom';
import { doNothing } from '@mui/x-date-pickers/internals/utils/utils';
import { ChevronLeftIcon } from '@heroicons/react/outline';

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
        <div className='bg-v-red flex items-center justify-center'>
          <img src={VISION_LOGO_WHITE} alt='' className='h-14' />
          <div className='cursor-pointer absolute right-[10px] z-10 flex'>
            <IconButton onClick={() => setOpen(false)} className="text-white">
              <MenuOpen />
            </IconButton>
          </div>
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
                  className='text-sm phone:text-lg'
                  onClick={() => setOpen(false)}
                  key={item.name}
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
      >
        <ListItemText
          primary={item.name}
          className='text-sm phone:text-lg'
          primaryTypographyProps={{ className: 'text-sm phone:text-lg' }}
        />

        {openMenus ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openMenus} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {item.menus.map((menu: any, i: number) => {
            return (
              <Link to={menu.href} key={i}>
                <ListItemButton
                  sx={{ pl: 4 }}
                  className='text-sm phone:text-lg'
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
