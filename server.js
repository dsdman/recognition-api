import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRoot from './controllers/root.js'
import handleRegister from './controllers/register.js'
import handleSignin from './controllers/signin.js'
import { handleImage } from './controllers/image.js'
import { handleAPI } from './controllers/image.js'
import handleProfile from './controllers/profile.js'


/*===== Globals =====*/
const PORT = process.env.PORT;
const app = express();
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'facerecognition'
  }
});

/*===== Middlewares =====*/
app.use(bodyParser.json());
app.use(cors());

/*===== Endpoints =====*/
app.get('/', (req, res) => handleRoot(req, res));
app.post('/signin', (req, res) => handleSignin(req, res, db, bcrypt));
app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => handleProfile(req, res, db));
app.put('/image', (req, res) => handleImage(req, res, db));
app.post('/imageurl', (req, res) => handleAPI(req, res, db));

/*===== server listen =====*/
console.log(PORT);
app.listen(PORT, ()=> {
  console.log(`listening on port ${PORT}`);
});
