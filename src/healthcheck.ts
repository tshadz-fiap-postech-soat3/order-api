import * as http from 'http';
const port = process.env.API_PORT || 50051;
const host = 'localhost';
const timeout = 3000;
const path = '/api/health/check';
const request = http.request({ method: 'get', path, host, port, timeout });

request.on('response', () => {
  console.log('SUCCESS health check');
  process.exit(0);
});

request.on('error', (err) => {
  console.error(err);
  process.exit(1);
});

request.end();
