const models = require('../models');

module.exports = {
  getQuestions(req, res) {
    const params = req.query.productId;
    console.log('product', params);
    models.questions.getQuestions(params, (result, err) => {
      if (result) {
        console.log(result);
        res.status(200).send(result);
      } else {
        console.error(err);
        res.status(500).send('failed');
      }
    });
  },

  getAnswer(req, res) {
    const params = req.query.questionId;
    console.log('question id', params);
    models.questions.getAnswer(params, (result, err) => {
      if (result) {
        res.status(200).send(result);
      } else {
        console.error(err);
        res.status(500).send('failed');
      }
    });
  },

  addQuestion(req, res) {
    console.log('post question', req.query);
    models.questions.postQuestion(req.query, (result, err) => {
      if (result) {
        console.log(result);
        res.status(201).send('successfully post');
      } else {
        console.error(err);
        res.status(500).send('failed');
      }
    });
  },

  addAnswer(req, res) {
    console.log('post ANSWER', req.query);
    models.questions.postAnswer(req.query, (result, err) => {
      if (result) {
        console.log(result);
        res.status(201).send('successfully post');
      } else {
        console.error(err);
        res.status(500).send('failed');
      }
    });
  },

  markHelpfulQuestion(req, res) {
    console.log('question helpful', req.query);
    models.questions.questionHelpful(req.query.question_id, (result, err) => {
      if (result) {
        console.log(result);
        res.status(201).send('successfully post');
      } else {
        console.error(err);
        res.status(500).send('failed');
      }
    });
  },

  markHelpfulAnswer(req, res) {
    console.log('answer helpful', req.query);
    models.questions.answerHelpful(req.query.answer_id, (result, err) => {
      if (result) {
        console.log(result);
        res.status(201).send('successfully post');
      } else {
        console.error(err);
        res.status(500).send('failed');
      }
    });
  },

  reportAnswer(req, res) {
    console.log('answer repored', req.query);
    models.questions.answerReported(req.query.answer_id, (result, err) => {
      if (result) {
        console.log(result);
        res.status(201).send('successfully post');
      } else {
        console.error(err);
        res.status(500).send('failed');
      }
    });
  },

  reportQuestion(req, res) {
    console.log('question repored', req.query);
    models.questions.questionReported(req.query.question_id, (result, err) => {
      if (result) {
        console.log(result);
        res.status(201).send('successfully post');
      } else {
        console.error(err);
        res.status(500).send('failed');
      }
    });
  },
};
