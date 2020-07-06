import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MailIcon from '@material-ui/icons/Mail';
import SettingsIcon from '@material-ui/icons/Settings';
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';
import BarChartIcon from '@material-ui/icons/BarChart';
import AddLocationIcon from '@material-ui/icons/AddLocation';

import WatchList from './WatchList';
import ColumnsSelector from './ColumnsSelector';

export function MainListItems({ handleDrawerClose }) {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openColumnsSelector, setOpenColumnsSelector] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenColumnsSelector = () => {
    setOpenColumnsSelector(true);
  };

  const handleCloseColumnsSelector = () => {
    setOpenColumnsSelector(false);
    handleDrawerClose();
  };

  const handleClose = () => {
    setOpen(false);
    handleDrawerClose();
  };

  const handleClick = link => {
    handleDrawerClose();
    history.push(link);
  };

  return (
    <div>
      <ListItem button onClick={() => handleClick('/')}>
        <ListItemIcon>
          <Tooltip title="Dashboard">
            <DashboardIcon aria-label="Dashboard" />
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => alert('not implemented yet')}>
        <ListItemIcon>
          <Tooltip title="Subscribe">
            <MailIcon />
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary="Subscribe" />
      </ListItem>
      <ListItem button onClick={() => alert('not implemented yet')}>
        <ListItemIcon>
          <Tooltip title="Unsubscribe">
            <UnsubscribeIcon />
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary="Unsubscribe" />
      </ListItem>
      <ListItem button onClick={() => handleClick('/graph')}>
        <ListItemIcon>
          <Tooltip title="Reports">
            <BarChartIcon />
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <Tooltip title="Add to watch list">
            <AddLocationIcon />
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary="Add to watch list" />
      </ListItem>
      <ListItem button onClick={handleClickOpenColumnsSelector}>
        <ListItemIcon>
          <Tooltip title="Choose Columns">
            <SettingsIcon />
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary="Choose Columns" />
      </ListItem>

      <WatchList open={open} onClose={handleClose} />
      <ColumnsSelector
        open={openColumnsSelector}
        onClose={handleCloseColumnsSelector}
      />
    </div>
  );
}
