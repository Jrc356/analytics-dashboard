import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';

const styles = theme => ({
  header: {
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.primary,
    background: theme.palette.background.primary,
  }
});

export class Header extends Component {
  render() {
    const { classes, text } = this.props;
    return (
      <AppBar position='static'>
        <Paper className={classes.header}>{text}</Paper>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Header);