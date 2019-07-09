//Require data from friends.js
var friends = require("../data/friends.js");

module.exports = function (app) {

    //API GET request when user visit a link, JSON data of friends are shown
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    //API POST request, when user submits survey
    app.post("/api/friends", function (req, res) {

        //Set variables
        //User Data is the request body (array)
        var userData = req.body;
        //User scores
        var userScores = userData.scores;
        //Set best match to first friend in the friend array (default)
        var bestMatch = 0;
        //Set minimumDifference to 40 
        //because that's the maximum possible difference score between user scores and friend scores
        var minimumDifference = 40;

        //Convert user score to number
        for (var i = 0; i < userScores.length; i++) {
            userScores[i] = parseInt(userScores[i]);
        };

        //Loop through friends array
        for (var i = 0; i < friends.length; i++) {
            //At first set total score difference between user scores and friend scores to 0
            var totalDifference = 0;
            var friendScores = friends[i].scores
            //Then loop through friend scores array
            for (var j = 0; j < friendScores.length; j++) {
                //Score difference equal userScores minus friendScores or vice versa
                //By using Math.abs, we set an absolute value so the score would never be negative
                var scoreDifference = Math.abs(userScores[j] - friendScores[j]);
                //Add scoreDiffence to total Score Difference which was set to 0 at the beginning
                totalDifference += scoreDifference;
            }

            //Everytime we got a total score difference, it will be compared to the minimum difference
            //If it is smaller than the minimum difference, the a new minimum difference will be set to that total score difference
            //Basically, we're comparing which friend has the closest total score to user score
            //The minimum difference starts from 40 and will keep going down until we find the closet match
            if (totalDifference < minimumDifference) {
                bestMatch = i;
                minimumDifference = totalDifference;
            }
        }
        //Push user Data to friend array after finding a match
        friends.push(userData);

        //Send best match to browser
        res.json(friends[bestMatch]);
    });

};
