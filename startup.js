const pm2 = require('pm2');

pm2.connect(function (err) {
  if (err) {
    console.error('Error connecting to PM2 daemon:', err);
    process.exit(2);
  }

  pm2.start({
    script: './index.js',
    name: 'NKG',
  }, function (err, apps) {
    if (err) {
      console.error('Error starting process:', err);
      return pm2.disconnect();
    }

    console.log('Process started successfully.');

    pm2.disconnect(); // Now we close the connection here
  });
});