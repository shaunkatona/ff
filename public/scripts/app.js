/**
 * Created by shaunkatona on 7/25/14.
 */
(function () {
    var app = angular.module('ffApp', []);

    app.controller('PlayerController', ['$scope', '$http', function ($scope, $http) {
        $scope.players = {
            available: [],
            mine: [],
            theirs: {
                "Steve Racz": [],
                Jarrod: [],
                Dale: [],
                Ryan: [],
                Brandt: [],
                "Steve Okell": [],
                Renee: [],
                Chris: []
            }
        };

        // TODO: add/edit/remove coaches?
        $scope.coaches = [
            "Steve Racz", "Jarrod", "Dale", "Ryan", "Brandt", "Steve Okell", "Renee", "Chris"
        ];

        $http.get('json/rankings_converted.json').then(function (res) {
            $scope.players.available = res.data;
        });

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