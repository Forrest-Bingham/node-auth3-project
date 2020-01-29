npm i jsonwebtoken

in router-- const jwt = require('jsonwebtoken');

--in router login function :

if (user && bcrypt.compareSync(password, user.password){

    const token = generateToken(user);

    res.status(200).json({
        message: 'WElcome back `${user.username}`,
        token,
    })

})

--outside of router.post

function generateToken(user){
    const payload = {
        subject: user.id   //who is it talking about
        username: user.username
        // any other data we want to save.
    };
    const secret = 'sdfopiunmodhshdnf' // any secure secret we want // not needed after we create secret.jsfile
    const options = {
        expiresIn: '8h'
    }

    return jwt.sign(payload, secrets.jwtSecret, options); // change to secrets.jwtSecret after importing secret.js folder.
}

create secret.js file: 

module.exports = {
    jwtSecret: process.env.JWT_SECRET || "KEep it secret, keep it safe!"
}

in router folder: const secrets = require('secret.js');