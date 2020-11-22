const handleProfile = (req, res, db) => {
  //get parameter
  const { id } = req.params;

  //return user if found
  db.select('*').from('users').where({
    id: id
  })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('error');
      }
    })
    .catch(err => res.status(400).json('There was a problem'));
}; 

export default handleProfile;
