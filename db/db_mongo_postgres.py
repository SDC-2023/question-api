import pandas as pd
from pymongo import MongoClient
import os
import dotenv
from sqlalchemy import create_engine, text

dotenv.load_dotenv()
answers = pd.read_csv('./data/answers.csv')
photos = pd.read_csv('./data/answers_photos.csv')
questions = pd.read_csv('./data/questions.csv')
# merge rows with the same answer_id
photos = photos.groupby('answer_id')['url'].apply(list).to_frame()
# merge answers and photos
answers= pd.merge(answers, photos, left_on='id', right_on='answer_id', how='outer')
# convert timestamp to date time
answers['date_written'] = pd.to_datetime(answers['date_written'], unit='ms')
questions['date_written'] = pd.to_datetime(questions['date_written'], unit='ms')

# mongodb
client = MongoClient(host=os.getenv("MONGO_HOST"), port=27017)
db = client['sdc']
answer_photo= db['answers_photos']
questions_table = db['questions']
answers_dict = answers.to_dict(orient="records")
questions_dict = questions.to_dict(orient="records")
answer_photo.insert_many(answers_dict)
questions_table.insert_many(questions_dict)

# sql
database = "sdc_1"
dbUser = os.getenv("PG_USER")
dbPwd= os.getenv("PG_PASSWORD")
engine = create_engine('postgresql://'+ dbUser +':'+ dbPwd +'@localhost:5432/' + database)
questionQuery = text('''CREATE TABLE questions (
    id serial PRIMARY KEY NOT NULL,
    product_id INT,
    body VARCHAR(1000),
    date_written TIMESTAMP,
    asker_name VARCHAR(60),
    asker_email VARCHAR(60),
    reported INT,
    helpful INT
)''')
answerQuery = text(''' CREATE TABLE answers (
    id serial PRIMARY KEY NOT NULL,
    question_id INT,
    body VARCHAR(1000),
    date_written TIMESTAMP,
    answerer_name VARCHAR(60),
    answerer_email VARCHAR(60),
    reported INT,
    helpful INT,
    url TEXT[],
    FOREIGN KEY (question_id)
      REFERENCES questions (id))''')
with engine.begin() as conn:
    conn.execute(questionQuery)
    conn.execute(answerQuery)
    questions.to_sql('questions', engine, if_exists='append', index = False)
    answers.to_sql('answers', engine, if_exists='append', index = False)
    conn.execute(text('''SELECT setval('answers_id_seq'::regclass,(SELECT MAX(id) FROM answers)+1)'''))
    conn.execute(text('''SELECT setval('questions_id_seq'::regclass,(SELECT MAX(id) FROM questions)+1)'''))
engine.dispose()
