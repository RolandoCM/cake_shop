module.exports = (app) => {
    const cakes = require('../controllers/cake.controller.js');


    app.post('/cakes', cakes.create);

    app.get('/cakes', cakes.findAll);

    app.get('/cakes/:cakeId', cakes.findOne);

    app.put('/cakes/:cakeId', cakes.update);

    app.delete('/cakes/:cakeId', cakes.delete);

}