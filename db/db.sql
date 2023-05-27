DROP DATABASE IF EXISTS  test;

CREATE DATABASE test;

\c test;


DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
    id INT,
    product_id INT,
    body VARCHAR(1000),
    date_written bigserial,
    asker_name VARCHAR(60),
    asker_email VARCHAR(60),
    reported INT,
    helpful INT,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
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
);

DROP TABLE IF EXISTS answers_photo;

CREATE TABLE answers_photo (
    id INT,
    answer_id INT,
    url TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (answer_id)
      REFERENCES answers (id)
);

COPY questions(id, product_id,
    body,
    date_written,
    asker_name,
    asker_email,
    reported,
    helpful) FROM '/Users/ruojialiu/Desktop/HRProject/question-api/db/data/questions.csv' DELIMITER ',' CSV HEADER;

COPY answers(id, question_id,
  body,
  date_written,
  answerer_name,
  answerer_email,
  reported,
  helpful) FROM '/Users/ruojialiu/Desktop/HRProject/question-api/db/data/answers.csv' DELIMITER ',' CSV HEADER;


COPY answers_photo(id, answer_id,url)
FROM '/Users/ruojialiu/Desktop/HRProject/question-api/db/data/answers_photos.csv' DELIMITER ',' CSV HEADER;




