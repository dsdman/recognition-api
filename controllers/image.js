import Clarifai from 'clarifai';

//initialize Clarifai with API key
const KEY = process.env.Capi;
const app = new Clarifai.App({
  apiKey: KEY
});

//returns bounding box data given image URL
export const handleAPI = (req, res) => {
  app.models
    .predict("d02b4508df58432fbb84e800597b8959", req.body.input)
    .then(data => {
      res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'));
}

//increments entries (rank in db) by 1 given id
export const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get count'))
};
