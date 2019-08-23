import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';

const styles = (theme) => ({
  header: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.primary,
    background: theme.palette.background.primary,
  },
});

export const Header = (props) => {
  const { classes, text } = props;
  return (
    <AppBar position="static">
      <Paper className={classes.header}>{text}</Paper>
    </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default withStyles(styles)(Header);
