const request = require('supertest');
const app = require('../server/app');

describe('Question test', () => {
  it('get questions successfully', async () => {
    await request(app)
      .get('/qa/questions')
      .query({ productId: 1 })
      .expect(200);
  });

  it('get questions failed', async () => {
    await request(app)
      .get('/qa/questions')
      .expect(500);
  });

  it('put helpful successfully ', async () => {
    await request(app)
      .put('/qa/questions/:question_id/helpful')
      .query({ question_id: 2 })
      .expect(201);
  });

  it('put helpful failed', async () => {
    await request(app)
      .put('/qa/questions/:question_id/helpful')
      .expect(500);
  });

  it('put report successfully', async () => {
    await request(app)
      .put('/qa/questions/:question_id/report')
      .query({ question_id: 2 })
      .expect(201);
  });

  it('put report failed', async () => {
    await request(app)
      .put('/qa/questions/:question_id/report')
      .query({ question_id: 400000000000 })
      .expect(500);
  });
  it('post question successfully', async () => {
    await request(app)
      .post('/qa/questions')
      .query({
        product_id: 2, body: 'post question test', asker_name: 'rachel', asker_email: 'test@gmail.com',
      })
      .expect(201);
  });

  it('post question failed', async () => {
    await request(app)
      .post('/qa/questions')
      .query({})
      .expect(500);
  });
});
