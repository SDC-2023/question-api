import { sleep, check } from 'k6';
import http from 'k6/http';

export const options = {
  stages: [
    { durations: '30s', target: 1000 },
    { duration: '30s', target: 1000 },
    { duration: '30s', target: 1000 },
  ],
};

export default () => {
  const res = http.get(http.url`http://localhost:3000/qa/questions/?productId=4`);

  check(res, { 'status was 200': (r) => r.status === 200 });

  sleep(1);
};
