import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles(theme => ({
  divStyle: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginRight: theme.spacing(4),
  },
}));

const RangeSelectionMenu = React.memo(function NavigationMenu({
  value,
  setValue,
}) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className={classes.divStyle}>
        <DateRangeIcon></DateRangeIcon>
      </div>
      <div className={classes.divStyle}>
        <Tabs
          gutter={'8px'}
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          disableUnderline
          TabIndicatorProps={{ style: { backgroundColor: 'transparent' } }}
        >
          <Tab label="Max" value={0} />
          <Tab label="Last 6 Month" value={6} />
          <Tab label="Last 3 Month" value={3} />
          <Tab label="Last Month" value={1} />
        </Tabs>
      </div>
    </div>
  );
});

export default RangeSelectionMenu;
