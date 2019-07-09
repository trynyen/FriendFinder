
var friends = require("../data/friends.js");

module.exports = function(app) {
  
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {

    var userData = req.body;
    var userScores = userData.scores;
    var bestMatch = 0;
    var minimumDifference = 40;

    //Convert user score to number
    for (var i = 0; i < userScores.length; i++){
        userScores[i] = parseInt(userScores[i]);
    };

    //Loop through friends array
    for (var i = 0; i < friends.length; i++){
        var totalDifference = 0;
        var friendScores = friends[i].scores
        //Then loop through friend scores array
        for (var j = 0; j < friendScores.length; j++){
            var scoreDifference = Math.abs(userScores[j] - friendScores[j]);
            totalDifference += scoreDifference;
        }
        if(totalDifference < minimumDifference){
            bestMatch = i;
            minimumDifference = totalDifference;
        }
    }
    friends.push(userData);

    res.json(friends[bestMatch]);
  });

};
