import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  paper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(10),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  mainMetric: {
    background: theme.palette.background.secondary,
  },
  secondaryMetric: {
    background: theme.palette.background.tertiary,
  },
});

class DashboardItem extends Component {

  getClassNames() {
    const { priority, classes } = this.props
    let classNames = classes.paper; 
    if (priority === 'primary'){
      classNames = `${classNames} ${classes.mainMetric}`;
    } else {
      classNames = `${classNames} ${classes.secondaryMetric}`;
    }
    return classNames;
  }

  render() {
    const { size, metric } = this.props;
    const classNames = this.getClassNames();

    // Create a graph component that takes metric as a prop and
    // Turns it into some graph, probably add a graphType prop
    return (
      <Grid item xs={ size }>
        <Paper className={`${classNames}`}>{metric}</Paper>
      </Grid>
    )
  }
}

DashboardItem.propTypes = {
  size: PropTypes.number.isRequired,
  priority: PropTypes.string.isRequired,
}

export default withStyles(styles)(DashboardItem);