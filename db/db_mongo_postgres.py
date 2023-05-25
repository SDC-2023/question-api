import pandas as pd
from pymongo import MongoClient
import os
import dotenv
from sqlalchemy import create_engine, text

dotenv.load_dotenv()
answers = pd.read_csv('./data/answers.csv')
photos = pd.read_csv('./data/answers_photos.csv')
questions = pd.read_csv('./data/questions.csv')
# # merge rows with the same answer_id
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
database = "sdc"
dbUser = os.getenv("PG_USER")
dbPwd= os.getenv("PG_PASSWORD")
engine = create_engine('postgresql://'+ dbUser +':'+ dbPwd +'@localhost:5432/' + database)
answers.loc[:,'url'] = answers['url'].astype(str)
answers.to_sql('answer_photo',engine)
questions.to_sql('question', engine)
with engine.begin() as conn:
    conn.execute(text('''ALTER TABLE question ADD PRIMARY KEY(id)'''))
    conn.execute(text('''ALTER TABLE answer_photo ADD CONSTRAINT fk_Q_A FOREIGN KEY(question_id) REFERENCES question(id)'''))
engine.dispose()

