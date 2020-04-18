import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Tooltip from '@material-ui/core/Tooltip';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MailIcon from '@material-ui/icons/Mail';
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';
import BarChartIcon from '@material-ui/icons/BarChart';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import AssignmentIcon from '@material-ui/icons/Assignment';

import WatchList from './WatchList';

export function MainListItems({ handleDrawerClose }) {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    handleDrawerClose();
  };

  const handleClick = (link) => {
    handleDrawerClose();
    history.push(link);
  }

  return (
    <div>
      <ListItem button onClick={() => handleClick('/')}>
        <ListItemIcon>
          <Tooltip title="Dashboard"><DashboardIcon aria-label="Dashboard" /></Tooltip>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => alert('not implemented yet')}>
        <ListItemIcon>
          <Tooltip title="Subscribe"><MailIcon /></Tooltip>
        </ListItemIcon>
        <ListItemText primary="Subscribe" />
      </ListItem>
      <ListItem button onClick={() => alert('not implemented yet')}>
        <ListItemIcon>
          <Tooltip title="Unsubscribe"><UnsubscribeIcon /></Tooltip>
        </ListItemIcon>
        <ListItemText primary="Unsubscribe" />
      </ListItem>
      <ListItem button onClick={() => handleClick('/graph')}>
        <ListItemIcon>
          <Tooltip title="Reports"><BarChartIcon /></Tooltip>
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <Tooltip title="Add to watch list"><AddLocationIcon /></Tooltip>
        </ListItemIcon>
        <ListItemText primary="Add to watch list" />
      </ListItem>
      <WatchList open={open} onClose={handleClose} />
    </div>
  )
};

