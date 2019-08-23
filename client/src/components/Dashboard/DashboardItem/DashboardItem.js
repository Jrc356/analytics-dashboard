import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { TextItem, ChartItem } from '../DataItems';
import { numberWithCommas, isMobile } from '../../../utils';

const styles = (theme) => ({
  paper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    paddingTop: theme.spacing(10),
    textAlign: 'center',
    color: theme.palette.text.primary,
    height: 200,
    minWidth: 300,
  },
  chartItem: {
    paddingTop: theme.spacing(1),
    height: 272,
  },
  mainMetric: {
    background: theme.palette.background.quaternary,
  },
  secondaryMetric: {
    background: theme.palette.background.secondary,
  },
  defaultMetric: {
    background: theme.palette.background.tertiary,
  },
});

class DashboardItem extends Component {
  constructor(props) {
    super(props);

    const {
      classes,
      size,
      metric,
      priority,
      visual,
      type,
    } = this.props;

    this.state = {
      classNames: classes,
      size,
      metric,
      priority,
      visual,
      type,
      data: 'No data',
    };
  }

  componentDidMount() {
    this.getMetricData();
    this.getClassNames();
  }

  getMetricData() {
    const { visual, metric } = this.state;
    const strippedMetric = metric.replace(' ', '');

    let url;
    if (visual === 'chart') {
      url = `http://localhost:3001/api/graph?metric=${strippedMetric}`;
    } else {
      url = `http://localhost:3001/api?metrics=${strippedMetric}`;
    }
    fetch(url, {
      method: 'GET',
      mode: 'cors',
    })
      .then((res) => (res.json()))
      .then((data) => {
        let value;
        let formattedValue;
        if (visual === 'chart') {
          value = data.data[strippedMetric];
          formattedValue = value;
        } else {
          value = strippedMetric.startsWith('ga:') ? data.data[strippedMetric] : data.data[`ga:${strippedMetric}`];
          formattedValue = numberWithCommas(parseInt(value.value, 10));
        }
        this.setState({ data: formattedValue });
      });
  }

  getClassNames() {
    const { priority, visual } = this.state;
    const { classes } = this.props;
    let classNames = classes.paper;

    switch (priority) {
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

    if (visual === 'chart') {
      classNames = `${classNames} ${classes.chartItem}`;
    }

    this.setState({ classNames });
  }

  getVisualComponent() {
    const { data, visual, type } = this.state;

    let component;
    if (data === 'No data') {
      component = <TextItem data={data} />;
    } else {
      switch (visual) {
        case 'chart':
          component = <ChartItem data={data} type={type} />;
          break;
        default:
          component = <TextItem data={data} />;
          break;
      }
    }

    return component;
  }

  render() {
    const {
      classNames,
      metric,
      size,
    } = this.state;

    const visualComponent = this.getVisualComponent();

    return (
      <Grid item xs={(isMobile || !size) ? 'auto' : size} zeroMinWidth>
        <Paper className={`${classNames}`}>
          <h2>{ metric }</h2>
          {visualComponent}
        </Paper>
      </Grid>
    );
  }
}

DashboardItem.propTypes = {
  size: PropTypes.number,
  priority: PropTypes.string,
  visual: PropTypes.string,
  type: PropTypes.string,
  classes: PropTypes.object.isRequired,
  metric: PropTypes.string.isRequired,
};

DashboardItem.defaultProps = {
  size: null,
  priority: null,
  visual: 'text',
  type: null,
};

export default withStyles(styles)(DashboardItem);
