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

async function getData(metrics, startDate, endDate) {
  await jwt.authorize((err) => {
    if (err) {
      console.log('Auth Error');
      console.log(err);
    } else {
      console.log('Successfully connected!');
    }
  });

  // ensure all metrics have ga:
  const santizedMetrics = Array.from(metrics);
  for (let i = 0; i < santizedMetrics.length; i += 1) {
    if (!santizedMetrics[i].startsWith('ga:')) {
      santizedMetrics[i] = `ga:${santizedMetrics[i]}`;
    }
  }

  const result = await analytics.data.ga.get({
    auth: jwt,
    ids: `ga:${viewId}`,
    'start-date': startDate,
    'end-date': endDate,
    metrics: santizedMetrics,
  });

  return result;
}

module.exports = { getData };
