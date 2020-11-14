const mongoose = require('mongoose');

const CakeSchema = mongoose.Schema({
    name: "",
    price: 0.0,
    flavours: [],
},
{
    timestamos: true
});

module.exports= mongoose.model('Cake', CakeSchema);