import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './Header/Header';
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
        <Grid container spacing={3} justify={"center"}>
          <Header size={12} text={"Analytics Dashboard"}/>
          <DashboardItem size={9} priority={'primary'} metric={'some metric'} />
          <DashboardItem priority={'secondary'} metric={'another metric'} />
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Dashboard);