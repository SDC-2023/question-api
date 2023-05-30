const models = require('../models');

module.exports = {
  getQuestions(req, res) {
    models.questions.getQuestions(req.query, (result, err) => {
      if (result) {
        res.status(200).send(result);
      } else {
        console.log(err);
        res.status(500).send('failed');
      }
    });
  },

  getAnswer(req, res) {
    models.questions.getAnswer(req.query, (result, err) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(500).send('failed');
      }
    });
  },

  addQuestion(req, res) {
    models.questions.postQuestion(req.query, (result, err) => {
      if (result) {
        res.status(201).send('successfully post');
      } else {
        res.status(500).send('failed');
      }
    });
  },

  addAnswer(req, res) {
    models.questions.postAnswer(req.query, (result, err) => {
      if (result) {
        res.status(201).send('successfully post');
      } else {
        res.status(500).send('failed');
      }
    });
  },

  markHelpfulQuestion(req, res) {
    models.questions.questionHelpful(req.query.question_id, (result, err) => {
      if (result) {
        res.status(201).send('successfully post');
      } else {
        res.status(500).send('failed');
      }
    });
  },

  markHelpfulAnswer(req, res) {
    models.questions.answerHelpful(req.query.answer_id, (result, err) => {
      if (result) {
        res.status(201).send('successfully post');
      } else {
        res.status(500).send('failed');
      }
    });
  },

  reportAnswer(req, res) {
    models.questions.answerReported(req.query.answer_id, (result, err) => {
      if (result) {
        res.status(201).send('successfully post');
      } else {
        res.status(500).send('failed');
      }
    });
  },

  reportQuestion(req, res) {
    models.questions.questionReported(req.query.question_id, (result, err) => {
      if (result) {
        res.status(201).send('successfully post');
      } else {
        res.status(500).send('failed');
      }
    });
  },
};
