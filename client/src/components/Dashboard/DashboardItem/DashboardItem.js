import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { numberWithCommas } from "../../../utils";

const styles = theme => ({
  paper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(10),
    textAlign: 'center',
    color: theme.palette.text.primary,
    height: 100,
  },
  mainMetric: {
    background: theme.palette.background.quaternary,
  },
  secondaryMetric: {
    background: theme.palette.background.secondary,
  },
  defaultMetric: {
    background: theme.palette.background.tertiary
  }
});

class DashboardItem extends Component {
  constructor(props){
    super(props);

    this.state = {
      classNames: this.props.classes,
      size: this.props.size,
      metric: this.props.metric,
      priority: this.props.priority,
      data: 'No data'
    }
  }

  componentDidMount(){
    this.getMetricData();
    this.getClassNames();
  }

  getMetricData(){
    const { metric } = this.state;
    const strippedMetric = metric.replace(" ", "");
    const url = `http://localhost:3001/api?metrics=${strippedMetric}`
    fetch(url, {
      method:'GET',
      mode: 'cors',
    })
    .then((res) => {
      return res.json()
    }).then((data) => {
      const value = parseInt(strippedMetric.startsWith('ga:') ? data.data[strippedMetric] : data.data[`ga:${strippedMetric}`]);
      const formattedValue = numberWithCommas(value);
      this.setState( { data: formattedValue } );
    });
  }

  getClassNames() {
    const { priority } = this.state;
    const { classes } = this.props;
    let classNames = classes.paper; 
    
    switch(priority){
      case 'primary':
        classNames = `${classNames} ${classes.mainMetric}`;
        break;
      case 'secondary':
        classNames = `${classNames} ${classes.secondaryMetric}`;
        break;
      default:
        classNames = `${classNames} ${classes.defaultMetric}`;
        break;
    }

    this.setState({classNames});
  }

  render() {
    const 
    { data, 
      classNames, 
      metric, 
      size } = this.state;

    return (
      <Grid item xs={ size ? size : 'auto' } zeroMinWidth height={100} width={100}>
        <Paper className={`${classNames}`}>
          <h2>{metric}</h2>
          <p>{data}</p>
        </Paper>
      </Grid>
    )
  }
}

DashboardItem.propTypes = {
  size: PropTypes.number,
  priority: PropTypes.string,
}

export default withStyles(styles)(DashboardItem);