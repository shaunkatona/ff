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

        $scope.addPlayer = function (player) {
            $scope.players.available.splice($scope.players.available.indexOf(player), 1);
            $scope.players.taken.mine.push(player);
        };

        $scope.releasePlayer = function (player) {
          $scope.players.taken.mine.splice($scope.players.taken.mine.indexOf(player), 1);
          $scope.players.available.push(player);
        };
    }]);
})();