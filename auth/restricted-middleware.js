const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('./config/secrets.js');
const Users = require('../users/users-model.js');



module.exports = (req, res, next) => {
    // const { username, password } = req.headers;
  
    // if (username && password) {
    //   Users.findBy({ username })
    //     .first()
    //     .then(user => {
    //       if (user && bcrypt.compareSync(password, user.password)) {
    //         next();
    //       } else {
    //         res.status(401).json({ message: 'Invalid Credentials' });
    //       }
    //     })
    //     .catch(error => {
    //       res.status(500).json({ message: 'Ran into an unexpected error' });
    //     });
    // } else {
    //   res.status(400).json({ message: 'No credentials provided' });
    // }
  
    const token = req.headers.authorization;
    
  if(token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
  
        if(err){
          //token is not valid
          res.status(401).json({error: "unable to get token"})
        } else {
            console.log(decodedToken);
          req.department = decodedToken.department;
          next();
        }
    })
  } else {
    res.status(401).json({you: "Shall not pass"})
  }
  
  };