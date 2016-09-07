var express = require("express");
var handlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var loader = require("./save.js")

var app = express();

var userArr = [];

var current = [];

var rsharkt = [{
        tweet: "hello there world i'm on the right side!",
        id: 0,
        kicks: 0
               },
    {
        tweet: "ANOTHER RIGHT TEST",
        id: 1,
        kicks: 0
               }];
var Lsharkt = [{
        tweet: "hello there world i'm on the left side!",
        id: 0,
        kicks: 0
    },
    {
        tweet: "ANOTHER LEFT TEST",
        id: 1,
        kicks: 0
               }];


loader.load("user.txt", function (data) {
    data = JSON.parse(data);
    console.log(data);
    userArr = data;
});




app.engine("handlebars", handlebars({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



app.get("/sharksign", function (req, res) {
    res.render("signup", {
        title: "SHARKS"
    })

});

app.post("/sharksign", function (req, res) {
    for (var i = 0; i < userArr.length; i++) {
        if (userArr[i].userNam == req.body.usernam) {
            res.send("User already exsist please go back and choose a new one!");
            return;
        }
    }
    
    if (req.body.userside == "right") {
        var userInfo = {
            userNam: req.body.usernam.toLowerCase(),
            userPass: req.body.userpass,
            userSide: "right"
        }
        userArr.push(userInfo);
    } else {
        var userInfo = {
            userNam: req.body.usernam.toLowerCase(),
            userPass: req.body.userpass,
            userSide: "left"
        }
        userArr.push(userInfo);

    }
    loader.save("user.txt", JSON.stringify(userArr))
    console.log(userArr);
    res.redirect("/")
});

app.get("/", function (req, res) {
    res.render("home", {
        title: "SHARKS"
    })

});

app.post("/", function (req, res) {
    for (var i = 0; i < userArr.length; i++) {
        if (userArr[i].userNam == req.body.lognam) {
            if (userArr[i].userPass == req.body.logpass) {
                var userSide = userArr[i].userSide;
                var theuserR = false;
                var theuserL = false;
                if (userSide == "right") {
                    theuserR = true;
                } else {
                    theuserL = true;
                }


                current = [{
                    title: "Lots of sharks",
                    tweets: rsharkt,
                    tweetsL: Lsharkt,
                    user: req.body.lognam,
                    right: theuserR,
                    left: theuserL,
                }];



            }
        }
    }
    res.redirect("/sharks");

});



function renderSharksPage(res) {
    for (var i = 0; i < current.length; i++) {
        res.render("sharks", current[i]);
    }
}




app.get("/sharks", function (req, res) {
    renderSharksPage(res);

});

app.post("/sharks", function (req, res) {
        var i = rsharkt.length;
        var j = Lsharkt.length;
    if (req.body.rtweet) {
            rsharkt.push({
                user: current[0].user,
                tweet: req.body.rtweet,
                id: i,
                kicks: 0
            })
            
        
    }
    
    if (req.body.ltweet) {
        Lsharkt.push({
                user: current[0].user,
                tweet: req.body.ltweet,
                id: j,
                kicks: 0
            })
    };
    renderSharksPage(res);
});

function getSharkByIdr(id) {
    for (var s in rsharkt) {
        if (rsharkt[s].id == id) {
            return rsharkt[s];
        }
    }
    return null;
}

function getSharkByIdl(id) {
    for (var s in Lsharkt) {
        if (Lsharkt[s].id == id) {
            return Lsharkt[s];
        }
    }
    return null;
}


app.post("/kickright", function (req, res) {
    var shark = getSharkByIdr(req.body.kickid);
    if (shark) {
        shark.kicks += 1;
        res.redirect("/sharks");

    } else {
        res.send("no such shark");
    }
});


app.post("/kickleft", function (req, res) {
    var shark = getSharkByIdl(req.body.kickid);
    if (shark) {
        shark.kicks += 1;
        res.redirect("/sharks");

    } else {
        res.send("no such shark");
    }
});




app.use(function (req, res, next) {
    res.status(404);
    res.send("404 page not found");
});

app.listen(3000, function () {
    console.log("Server Started on Port 3000");
});