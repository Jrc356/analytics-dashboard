// Config
const clientEmail = process.env.CLIENT_EMAIL;
const privateKey = process.env.PRIVATE_KEY.replace(new RegExp('\\\\n'), '\n');
const scopes = ['https://www.googleapis.com/auth/analytics.readonly'];

// API's
const { google } = require('googleapis');

const analytics = google.analytics('v3');
const viewId = process.env.VIEW_ID;
const jwt = new google.auth.JWT({
  email: clientEmail,
  key: privateKey,
  scopes,
});

async function getMetric(metric, startDate, endDate) {
  await jwt.authorize((err) => {
    console.log(`Retrieving data for metric: ${metric}`);
    if (err) {
      console.log('Auth Error');
      console.log(err);
    } else {
      console.log('Successfully connected!');
    }
  });

  const result = await analytics.data.ga.get({
    auth: jwt,
    ids: `ga:${viewId}`,
    'start-date': startDate,
    'end-date': endDate,
    metrics: metric,
  });

  const res = {};
  res[metric] = result.data.totalsForAllResults[metric];
  return res;
}

function getData(metrics = ['ga:users'], startDate = '30daysAgo', endDate = 'today') {
  // ensure all metrics have ga:
  const results = [];
  for (let i = 0; i < metrics.length; i += 1) {
    let metric = metrics[i];
    if (!metric.startsWith('ga:')) {
      metric = `ga:${metric}`;
    }

    results.push(getMetric(metric, startDate, endDate));
  }

  return results;
}

module.exports = { getData };
