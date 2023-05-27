const router = require('express').Router();
const controller = require('./controller');

// Connect controller methods to their corresponding routes
router.get('/qa/questions', controller.questions.getQuestions);
router.post('/qa/questions', controller.questions.addQuestion);
router.put('/qa/questions/:question_id/helpful', controller.questions.markHelpfulQuestion);
router.put('/qa/questions/:question_id/report', controller.questions.reportQuestion);

router.get('/qa/questions/:question_id/answers', controller.questions.getAnswer);
router.post('/qa/questions/:question_id/answers', controller.questions.addAnswer);
router.put('/qa/answers/:answer_id/helpful', controller.questions.markHelpfulAnswer);
router.put('/qa/answers/:answer_id/report', controller.questions.reportAnswer);

module.exports = router;
