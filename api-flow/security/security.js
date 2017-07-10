const jwt = require('./jwt');
const users = [];

var userExists = user => users.some(u => u.email == user.email);

var createUser = user => users.push(user);

var isValidUser = user => users.filter(u => u.email == user.email && u.password == user.password)[0];


module.exports = {
    useSecurity: useSecurity,
    userExists: userExists,
    createUser: createUser,
    isValidUser: isValidUser,
    getNewToken: (user) => jwt.generaToken(user)
};

function useSecurity(app, ruta) {
    app.use(ruta, (req, res, next) => {
        let token = null;
        const authorization = req.get('Authorization');
        const pieces = authorization.split(' ');
        if (pieces && pieces.length > 0) {
            const token = authorization.split(' ')[1];
            token = jwt.verifyToken(token);
        }
        if (token) {
            req.user = token.email;
            next();
        } else {
            res.status(401)
                .send('Invalid credentials');
        }
    })
};
