const http = require('http');

const postData = JSON.stringify({
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/test',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);

  res.setEncoding('utf8');
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    console.log('Body:', body);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();