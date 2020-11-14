const express = require('express');
const bosyParser = require('body-parser');



const dbConfig = require('./config/database.config');
const mongose = require('mongoose');

mongose.Promise = global.Promise;
mongose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch( err => {
    console.log('Could not connect to the database. Exiting now... ', err );
    process.exit();
})

const app = express();

app.use(bosyParser.urlencoded({ extended: true }))

app.use(bosyParser.json())

app.get('/', (req, res) => {
    res.json({"message": " Welcome to cake shop"});
});


app.listen(3000, () => { 
    console.log("Server is listening on port 3000 ");
});


require('./app/routes/cake.routes')(app);