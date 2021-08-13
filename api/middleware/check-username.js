const Users = require('../users/users-model')

module.exports = (req, res, next) => {
    let { username } = req.body;
    Users.findBy({ username })
        .then(user => {
            if (user[0]) {
                console.log('user: ', user)
                res.status(406).json('username taken')
            } else {
                next()
            }
        })
        .catch(next)
}