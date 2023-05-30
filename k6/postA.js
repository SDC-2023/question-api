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
  const res = http.post(http.url`http://localhost:3000/qa/questions/:question_id/answers?question_id=2&body=hhha&answerer_name=rachel&answerer_email=xxx@gmail.com`);

  check(res, { 'status was 201': (r) => r.status === 201 });

  sleep(1);
};
