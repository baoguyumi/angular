const usuarios = require('./usuarios.js');
const sesiones = require('./sesiones.js');
const items = require('./items.js');

module.exports = app => {
    usuarios(app, '/api/pub/usuarios');
    sesiones(app, '/api/pub/sesiones');
    items(app, '/api/pub/items');
}
