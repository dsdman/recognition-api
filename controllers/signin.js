const handleSignin = (req, res, db, bcrypt) => {
  //grab needed variables
  const {email, password } = req.body;
  
  //validation
  if (!email || !password) {
    return res.status(400).json('Incorrect form');
  }

  //grab email and hash from db, compare against password entered
  db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email','=',email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => res.status(400).json('error'))
      } else {
        res.status(400).json('wrong credentials');
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
};

export default handleSignin;
