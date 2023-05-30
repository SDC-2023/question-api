import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { durations: '30s', target: 1000 },
    { duration: '30s', target: 1000 },
    { duration: '30s', target: 0 },
  ],
};

export default () => {
  const res = http.get(http.url`http://localhost:3000/qa/questions/:question_id/answers?questionId=7`);

  check(res, { 'status was 200': (r) => r.status === 200 });

  sleep(1);
};
