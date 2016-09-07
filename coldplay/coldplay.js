var express = require("express");
var handlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var app = express();


var songs = [
            "Yellow",
            "Clocks",
            "The Scientist"
        ];


app.engine("handlebars", handlebars({
    defaultLayout : "main"
}));

app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


function renderSongsPage(res){
     res.render("songs", {
        title: "Lost of Sharks",
        songs: songs
    });   
}




app.get("/", function(req, res){
    res.render("home", {
        title: "Coldplay | Home"
    });
});


app.get("/songs", function(req,res){
   renderSongsPage(res);
});


app.post("/songs", function(req, res){
    songs.push(req.body.song);
    renderSongsPage(res);
});


app.use(function(req, res, next){
    res.status(418);
    res.send("418 I'm a Teapot.");
});



app.listen(3000, function(){
    console.log("server Started on port 3000");
});