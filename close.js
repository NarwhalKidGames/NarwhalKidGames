const pm2 = require('pm2');

pm2.connect(function (err) {
  if (err) {
    console.error('Error connecting to PM2 daemon:', err);
    process.exit(2);
  }

  pm2.stop('NKG', function (err) {
    if (err) {
      console.error('Error stopping process:', err);
      return pm2.disconnect();
    }

    // console.log('Process stopped successfully.');

    pm2.delete('NKG', function (err) {
      if (err) {
        console.error('Error deleting process:', err);
      } else {
        // console.log('Process deleted successfully.');
      }

      pm2.disconnect();
    });
  });
});
