const Cake = require('../models/cake.model');

exports.create = (req, res ) => {
    if(!req.body.name){
        return res.status(400).send({
            message: "Cake content can not be empty"
        });
    }

    const cake = new Cake({
        name: req.body.name || "Unamed cake",
        price: req.body.price,
        flavours: req.body.flavours
    });

    cake.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error ocurred while creatinf the Cake"
        });
    });
};

exports.findAll = (req, res ) => {

    Cake.find()
    .then(cakes => {
        res.send(cakes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving cakes"
        });
    })

};


exports.findOne = (req, res ) => {

    Cake.findById(req.params.cakeId)
        .then(note => {
            if(!cake) { 
                return res.status(404).send({
                    message: "Cake not found with id "+ req.params.cakeId
                });
            }
            res.send(cake);
        }).catch(err => {
            if(err.kind === 'ObjectId'){
                return res.status(404).send({ 
                    message: "Cake not found with id " + req.params.cakeId
                });
            }

            return res.status(500).send({
                message: "Error retriving cake with id "+ req.params.cakeId
            });
        });
};

exports.update = (req, res) => {
    if(!req.body.name){ 
        return res.status(400).send({
            message: "Cake content can not be empty"
        });
    }

    Cake.findByIdAndUpdate(req.params.cakeId, {
        name: req.body.name || "Untitled Cake"
    }, {new: true })
    .then(cake => {
        if(!cake) {
            return res.status(404).send({
                message: "Cake not found with id " + req.params.cakeId         
            });
        }
        res.send(cake);
    }).catch(err => {
        if(err.kind === ' ObjectId') {
            return res.status(404).send({
                message: "Cake not found with id "+ req.params.cakeId
            });
        }
        return res.status(500).send({
            message: "Errors updating cake with id " + req.params.cakeId
        });
    });
};

exports.detele = (req, res ) => {
    Cake.findByIdAndRemove(req.params.cakeId)
        .then( cake => {
            if(!cake) {
                return res.status(404).send({
                    message: "Cake not found with id" + req.params.cakeId
                });
            }
            res.send({message: "Cake deleted successfully!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Cake not found with id " + req.params.cakeId
                });
            }
            return res.status(500).send({
                message: "Could not delete cake with id " + req.params.cakeId
            });
        });
};
