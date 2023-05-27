const request = require('supertest');
const app = require('../server/app');

describe('Question test', () => {
  it('get answer successfully', async () => {
    await request(app)
      .get('/qa/questions/:question_id/answers')
      .query({ questionId: 1 })
      .expect(200);
  });

  it('get answer failed', async () => {
    await request(app)
      .get('/qa/questions/:question_id/answers')
      .expect(500);
  });

  it('put helpful successfully ', async () => {
    await request(app)
      .put('/qa/answers/:answer_id/helpful')
      .query({ answer_id: 2 })
      .expect(201);
  });

  it('put helpful failed', async () => {
    await request(app)
      .put('/qa/answers/:answer_id/helpful')
      .expect(500);
  });

  it('put report successfully', async () => {
    await request(app)
      .put('/qa/answers/:answer_id/report')
      .query({ answer_id: 2 })
      .expect(201);
  });

  it('put report failed', async () => {
    await request(app)
      .put('/qa/answers/:answer_id/report')
      .query({ answer_id: 400000000000 })
      .expect(500);
  });
  it('post answer successfully', async () => {
    await request(app)
      .post('/qa/questions/:question_id/answers')
      .query({
        question_id: 2, body: 'post answer test', asker_name: 'rachel', asker_email: 'test@gmail.com',
      })
      .expect(201);
  });

  it('post answer failed', async () => {
    await request(app)
      .post('/qa/questions/:question_id/answers')
      .query({})
      .expect(500);
  });
});
