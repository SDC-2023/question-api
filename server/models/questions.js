const client = require('../dbConnection');

module.exports = {
  async getQuestions(params, cb) {
    // const getQuestionQuery = `SELECT * FROM questions WHERE product_id = '${params.productId}' ORDER BY helpful DESC
    // LIMIT '${params.count}' OFFSET '${(params.page - 1) * params.count}'`;

    const getQuestionQuery = `SELECT * FROM questions WHERE product_id = '${params.productId}' ORDER BY helpful DESC`;

    try {
      const { rows } = await client.query(getQuestionQuery);
      await cb(rows, null);
    } catch (err) {
      await cb(null, err);
    }
  },

  async getAnswer(params, cb) {
    // const getAnswerQuery = `SELECT answers.body, answers.date_written,
    // answers.answerer_name, answers.helpful, answers.url
    // FROM questions JOIN answers
    // ON questions.id = answers.question_id
    // WHERE questions.id = '${params.questionId}' ORDER BY answers.helpful DESC
    // LIMIT '${params.count}' OFFSET '${(params.page - 1) * params.count}'`;
    const getAnswerQuery = `SELECT answers.body, answers.date_written,
    answers.answerer_name, answers.helpful, answers.url
    FROM questions JOIN answers
    ON questions.id = answers.question_id
    WHERE questions.id = '${params.questionId}' ORDER BY answers.helpful DESC`;
    try {
      const { rows } = await client.query(getAnswerQuery);
      await cb(rows, null);
    } catch (err) {
      await cb(null, err);
    }
  },

  async postQuestion(params, cb) {
    let time = new Date().getTime();
    time = new Date(time).toLocaleString();
    const postQuery = `INSERT INTO questions(product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES
    ('${Number(params.product_id)}', '${params.body}','${time}','${params.asker_name}', '${params.asker_email}',0,0)`;
    try {
      const response = await client.query(postQuery);
      await cb(response, null);
    } catch (err) {
      await cb(null, err);
    }
  },

  async postAnswer(params, cb) {
    let time = new Date().getTime();
    time = new Date(time).toLocaleString();
    const postQuery = `INSERT INTO answers(question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES
    ('${Number(params.question_id)}', '${params.body}','${time}','${params.answerer_name}', '${params.answerer_email}',0,0)`;
    try {
      console.log(postQuery);
      const response = await client.query(postQuery);
      await cb(response, null);
    } catch (err) {
      await cb(null, err);
    }
  },
  async answerHelpful(answerId, cb) {
    const findQuery = `SELECT helpful from answers WHERE id = '${answerId}'`;
    try {
      const { rows } = await client.query(findQuery);
      const { helpful } = rows[0];
      await client.query(`UPDATE answers SET helpful = '${Number(helpful) + 1}' WHERE id = '${answerId}'`);
      await cb(rows, null);
    } catch (err) {
      await cb(null, err);
    }
  },

  async questionHelpful(questionId, cb) {
    const findQuery = `SELECT helpful from questions WHERE id = '${questionId}'`;
    try {
      const { rows } = await client.query(findQuery);
      const { helpful } = rows[0];
      await client.query(`UPDATE questions SET helpful = '${Number(helpful) + 1}' WHERE id = '${questionId}'`);
      await cb(rows, null);
    } catch (err) {
      await cb(null, err);
    }
  },

  async answerReported(answerId, cb) {
    try {
      const { rows } = await client.query(`UPDATE answers SET reported = 1 WHERE id = '${answerId}'`);
      await cb(rows, null);
    } catch (err) {
      await cb(null, err);
    }
  },

  async questionReported(questionId, cb) {
    try {
      const { rows } = await client.query(`UPDATE questions SET reported = 1 WHERE id = '${questionId}'`);
      await cb(rows, null);
    } catch (err) {
      await cb(null, err);
    }
  },
};
