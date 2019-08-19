import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './Header/Header';
import Grid from '@material-ui/core/Grid';
import DashboardItem from './DashboardItem/DashboardItem';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class Dashboard extends Component {
  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Header />
          <DashboardItem size={9} priority={'primary'} metric={'some metric'} />
          <DashboardItem size={3} priority={'secondary'} metric={'another metric'} />
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Dashboard);