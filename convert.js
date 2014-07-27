/*
 Convert all of the numerical data points in our player objects from strings to numbers so they can be sorted properly
 */
var _INPUT_JSON_FILENAME = process.argv[2] || "convert_test.json";
var _OUTPUT_JSON_FILENAME = process.argv[3] || "converted.json";
var fs = require('fs');

console.log("Reading from " + _INPUT_JSON_FILENAME);

fs.readFile(_INPUT_JSON_FILENAME, function (err, data) {
   if (err) {
       console.log(err);
   }
   else {
       var players = JSON.parse(data);

       for (var i = 0; i < players.length; i++) {
           players[i].playerId = Number(players[i].playerId);
           players[i].byeWeek = Number(players[i].byeWeek);
           players[i].nerdRank = Number(players[i].nerdRank);
           players[i].positionRank = Number(players[i].positionRank);
           players[i].overallRank = Number(players[i].overallRank);
       }

       console.log("Writing to " + _OUTPUT_JSON_FILENAME);

       fs.writeFile(_OUTPUT_JSON_FILENAME, JSON.stringify(players), null, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("success!");
            }
       });
   }
});