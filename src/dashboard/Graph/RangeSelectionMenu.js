import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateRangeIcon from '@material-ui/icons/DateRange';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
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
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {!smallScreen && (
        <div className={classes.divStyle}>
          <DateRangeIcon></DateRangeIcon>
        </div>
      )}
      <div className={classes.divStyle}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          variant="fullWidth"
          TabIndicatorProps={{ style: { backgroundColor: 'transparent' } }}
        >
          <Tab label="Max" value={0} />
          <Tab label={smallScreen ? '6 M' : 'Last 6 Month'} value={6} />
          <Tab label={smallScreen ? '3 M' : 'Last 3 Month'} value={3} />
          <Tab label={smallScreen ? '1 M' : 'Last Month'} value={1} />
        </Tabs>
      </div>
    </>
  );
});

export default RangeSelectionMenu;
