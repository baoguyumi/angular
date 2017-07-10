const security = require('./../security/security.js');
module.exports = (app, ruta) => {
    app.route(ruta)
        .post((req, res) => {
            const user = req.body;
            if (security.userExists(user)) {
                console.log(`email already registered: ${user.email}`);
                res.status(409).send(`email ${user.email} already registered`);
            } else {
                console.log(`ok registering: ${user.email}`);
                security.createUser(user);
                let token = security.getNewToken(user);
                res.status(201).json(token);
            }
        })
}