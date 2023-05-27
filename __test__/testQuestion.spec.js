const request = require('supertest');
const app = require('../server/app');

describe('Question test', () => {
  it('get questions', async () => {
    await request(app)
      .get('/qa/questions')
      .query({ productId: 1 })
      .expect(200);
  });
});
