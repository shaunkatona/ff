/**
 * Created by shaunkatona on 7/25/14.
 */
(function () {
    var app = angular.module('ffApp', []);

    app.controller('PlayerController', ['$scope', '$http', function ($scope, $http) {
        $scope.players = {
            available: [],
            taken: {
                mine: []
            }
        };

        $http.get('json/rankings_converted.json').then(function (res) {
            $scope.players.available = res.data;
        });

        // take the player out of the available queue and add them to our queue
        $scope.addPlayer = function (player) {
            $scope.players.available.splice($scope.players.available.indexOf(player), 1);
            $scope.players.taken.mine.push(player);
        };

        // take the player out of our queue and add them to the available queue
        $scope.releasePlayer = function (player) {
          $scope.players.taken.mine.splice($scope.players.taken.mine.indexOf(player), 1);
          $scope.players.available.push(player);
        };

        $scope.getRowClass = function (player) {
          return player.position;
        };
    }]);
})();