const dotenv = require('dotenv');
const { Client } = require('pg');
dotenv.config();

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  database: 'test',
});

// create tables commands
const answerCommand = `CREATE TABLE IF NOT EXISTS answers (
    id INT,
    question_id INT,
    body VARCHAR(1000),
    date_written bigserial,
    answerer_name VARCHAR(60),
    answerer_email VARCHAR(60),
    reported INT,
    helpful INT,
    PRIMARY KEY (id),
    FOREIGN KEY (question_id)
      REFERENCES questions (id)
  )`;

const questionCommand = `CREATE TABLE IF NOT EXISTS questions (
    id INT,
    product_id INT,
    body VARCHAR(1000),
    date_written bigserial,
    asker_name VARCHAR(60),
    asker_email VARCHAR(60),
    reported INT,
    helpful INT,
    PRIMARY KEY (id)
  )`;

const answerPhotoCommand = `CREATE TABLE IF NOT EXISTS answers_photo (
    id INT,
    answer_id INT,
    url TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (answer_id)
      REFERENCES answers (id)
  )`;

// copy csv commands
const copyAnswer = `COPY answers(id, question_id,
  body,
  date_written,
  answerer_name,
  answerer_email,
  reported,
  helpful) FROM '/Users/ruojialiu/Desktop/HRProject/question-api/data/answers.csv' DELIMITER ',' CSV HEADER;`;

const copyQuestion = `COPY questions(id, product_id,
    body,
    date_written,
    asker_name,
    asker_email,
    reported,
    helpful) FROM '/Users/ruojialiu/Desktop/HRProject/question-api/data/questions.csv' DELIMITER ',' CSV HEADER;`;

const copyPhoto = `COPY answers_photo(id, answer_id,url)
FROM '/Users/ruojialiu/Desktop/HRProject/question-api/data/answers_photos.csv' DELIMITER ',' CSV HEADER;`;
async function connect(client_) {
  try {
    await client_.connect();
    console.log('client connected');
    // add command
    await client_.query(questionCommand);
    await client_.query(answerCommand);
    await client_.query(answerPhotoCommand);
    await client_.query(copyQuestion);
    await client_.query(copyAnswer);
    await client_.query(copyPhoto);
    await client_.end();
  } catch (err) {
    console.log(err);
  } finally {
    await client_.end();
  }
}
connect(client);
