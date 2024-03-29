// Exoress - Router
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

var app =  express();

var router = express.Router();

// Routes
require("./config/routes")(router);

app.use(express.static(__dirname + "/public"));

// Handlebars
app.engine("handlebars", expressHandlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({extended: false}))

app.use(router);

//Mongoose
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(db, function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log("mongoose connection success!");
        
    }
})

app.listen(PORT, function() {
    console.log("Listening on port" + PORT);
});
