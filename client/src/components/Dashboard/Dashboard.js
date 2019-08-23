import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DashboardItem from './DashboardItem/DashboardItem';

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
  },
});

class Dashboard extends Component {
  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3} justify={"center"} alignItems={"center"}>
          <DashboardItem size={9} priority={'primary'} metric={'Users'} />
          <DashboardItem size={3} priority={'secondary'} metric={'Sessions'} />
          <DashboardItem size={3} priority={'primary'} metric={'Page Views'} />
          <DashboardItem size={9} metric={'Transaction Revenue'} />
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Dashboard);