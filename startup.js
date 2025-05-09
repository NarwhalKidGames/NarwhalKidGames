const pm2 = require('pm2');
const SCRIPT_NAME = 'NKG';

pm2.connect(function (err) {
  if (err) {
    console.error('Error connecting to PM2 daemon:', err);
    process.exit(2);
  }

  pm2.start({
    script: './index.js',
    name: SCRIPT_NAME,
    autorestart: false,
  }, function (err) {
    if (err) {
      console.error('Error starting process:', err);
      pm2.disconnect();
      return;
    }

    console.log(`Started ${SCRIPT_NAME} with PM2`);

    pm2.launchBus(function (err, bus) {
      if (err) {
        console.error('Failed to launch PM2 bus:', err);
        pm2.disconnect();
        return;
      }

      bus.on('process:exit', function (packet) {
        if (
          packet.process.name === SCRIPT_NAME &&
          packet.process.exit_code === 123
        ) {
          console.log(`${SCRIPT_NAME} exited with code 123 — restarting...`);
          pm2.restart(SCRIPT_NAME, () => {
            console.log('Restart complete.');
          });
        }
      });
    });
  });
});
