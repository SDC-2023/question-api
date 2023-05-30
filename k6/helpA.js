import { sleep, check } from 'k6';
import http from 'k6/http';

export const options = {
  stages: [
    { durations: '30s', target: 1000 },
    { duration: '30s', target: 1000 },
    { duration: '30s', target: 0 },
  ],
};

export default () => {
  const res = http.put(http.url`http://localhost:3000/qa/answers/:answer_id/helpful?answer_id=3`);

  check(res, { 'status was 201': (r) => r.status === 201 });

  sleep(1);
};
