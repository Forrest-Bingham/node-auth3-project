const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted,  (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get('/department', restricted, (req, res) => {
  
    console.log(req.department);
    Users.findByDepartment(req.department)
      .then(users => {
          console.log(users);
        res.json(users);
      })

      .catch(err => {
        //console.log(err);
        res.status(400).json({error: "Unable to load departments"});
        })
    
    
  });

// function onlyHouse(house) {
//   return function(req, res, next) {
//     if(req.user && req.user.house && req.user.house.toLowerCase() === house) {
//       next();
//     } else {
//       res.status(403).json({ spell: 'Expelliarmus'})    
//     }
//   }
// }

function sameDepartment(department){
    return function(req,res,next){
        if(req.user && req.user.department && req.user.department.toLowerCase() === department){
            const group = req.user.department;
                next();
        } else {
            res.status(400).json({message: "Unable to load by department"})
        }
    }
}

// router.use(sameDepartment);

module.exports = router;
