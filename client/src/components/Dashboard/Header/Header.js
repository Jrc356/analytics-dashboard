import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  header: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.primary,
    background: theme.palette.background.primary,
  }
});

export class Header extends Component {
  render() {
    const { classes, text } = this.props;
    return (
      <Grid item xs={12}>
        <Paper className={classes.header}>{text}</Paper>
      </Grid>
    )
  }
}

export default withStyles(styles)(Header);