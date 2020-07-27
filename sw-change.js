var path = require('path');
const fs = require('fs');

const file = path.join(__dirname, 'build', 'service-worker.js');

console.log('file', file);

const search = 'workbox.core.clientsClaim();';

const replaceWith = `  
  workbox.setConfig({debug: false});
  self.addEventListener('push', function (evt) {
    console.log('Push Message Received');
    var options = {
      body: evt.data.text(),
      data: {
        timestamp: Date.now(),
        loc: 'index.html#info',
      },
      action: [{ action: 'go', title: 'Go Now' }],
    };
    evt.waitUntil(self.registration.showNotification('Corona Stat', options));
  });

  workbox.core.clientsClaim();
`;

fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log(err);
    throw err;
  }
  const newContent = data.replace(search, replaceWith);
  console.log('data ', newContent);

  fs.writeFile(file, newContent, function (err) {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log('The file was saved!');
  });
});
