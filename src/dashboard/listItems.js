import React from 'react';
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

export const mainListItems = (
  <div>
    <ListItem button onClick={() => alert('not implemented yet')}>
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
    <ListItem button onClick={() => alert('not implemented yet')}>
      <ListItemIcon>
      <Tooltip title="Reports"><BarChartIcon /></Tooltip>
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button onClick={() => alert('not implemented yet')}>
      <ListItemIcon>
      <Tooltip title="Add to watch list"><AddLocationIcon /></Tooltip>
      </ListItemIcon>
      <ListItemText primary="Add to watch list" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
      <Tooltip title="Current month"><BookmarkIcon /></Tooltip>
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
      <Tooltip title="Last quarter"><AssignmentIcon /></Tooltip>
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
      <Tooltip title="Year-end"><AssignmentIcon /></Tooltip>
      </ListItemIcon>
      <ListItemText primary="Year-end" />
    </ListItem>
  </div>
);
