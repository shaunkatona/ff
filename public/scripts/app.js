/**
 * Created by shaunkatona on 7/25/14.
 */
(function () {
    var app = angular.module('ffApp', []);

    app.controller('PlayerController', ['$scope', '$http', function ($scope, $http) {
        $scope.search = {
            displayName: "",
            position: ""
        };

        $scope.positions = [
            "DEF", "QB", "RB", "WR", "K", "TE"
        ];
        $scope.players = {
            available: [],
            mine: [],
            theirs: {
                "Steve R": [],
                Jarrod: [],
                Dale: [],
                Ryan: [],
                Brandt: [],
                "Steve O": [],
                Renee: [],
                Chris: [],
                John: [],
                Andy: [],
                Ben: []
            }
        };

        // TODO: add/edit/remove coaches?
        // TODO: refactor so not 2 lists of coaches
        $scope.coaches = [
            "Steve R", "Jarrod", "Dale", "Ryan", "Brandt", "Steve O", "Renee", "Chris", "John", "Andy", "Ben"
        ];

        $http.get('json/rankings_converted.json').then(function (res) {
            $scope.players.available = res.data;
        });

        // TODO: refactor so only 1 add and 1 remove methods
        // take the player out of the available queue and add them to our queue
        $scope.addPlayer = function (player) {
            $scope.players.available.splice($scope.players.available.indexOf(player), 1);
            $scope.players.mine.push(player);
        };

        // take the player out of the available queue and add them to another coach's team (not mine)
        $scope.addPlayerToTheirs = function (player, coach) {
            $scope.players.available.splice($scope.players.available.indexOf(player), 1);
            $scope.players.theirs[coach].push(player);
        };

        // take the player out of our queue and add them to the available queue
        $scope.releasePlayer = function (player) {
            $scope.players.mine.splice($scope.players.mine.indexOf(player), 1);
            $scope.players.available.push(player);
        };

        // take the player out of their queue and add them to the available queue
        $scope.releasePlayerFromTheirs = function (player, coach) {
            $scope.players.theirs[coach].splice($scope.players.theirs[coach].indexOf(player), 1);
            $scope.players.available.push(player);
        };

        // to color code the rows by position
        $scope.getRowClass = function (player) {
            return player.position;
        };
    }]);
})();