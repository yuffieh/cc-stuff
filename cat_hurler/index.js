var stdin = process.stdin;
var stdout = process.stdout;

var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question('What  is your name? ', function(answer){
  
    console.log('hello,', answer);
});


//what were we doing?


//how to throw cats
//var fs = require("fs");
//var numCatsHurled = 0;
//
//fs.readFile("cats.txt", "utf8", function (err, data) {
//    if (err) {
//        console.log("created file");
//    }
//    numCatsHurled = parseInt(data);
//    
//    if(isNaN(numCatsHurled)){
//        numCatsHurled = 0;
//    }
//    
//    hurlCat();
//});
//
//
//function hurlCat() {
//    console.log("hurling One Cat");
//    console.log("meoww");
//    numCatsHurled += 1;
//    console.log(numCatsHurled + " have been hurled");
//
//    fs.writeFile("cats.txt", numCatsHurled, function (err) {
//        if (err) {
//            console.log("there was an error:", err);
//            return;
//        }
//        console.log("wrote to file.")
//
//    });
//}