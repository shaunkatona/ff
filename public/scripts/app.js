/**
 * Created by shaunkatona on 7/25/14.
 */
(function () {
    var app = angular.module('ffApp', []);

    app.controller('PlayerController', ['$scope', '$http', function ($scope, $http) {
        $scope.players = {
            available: [],
            mine: []
        };

        $http.get('json/rankings.json').then(function (res) {
            $scope.players.available = res.data;

            console.log($scope.players.available);
        });

        $scope.addPlayer = function (player) {
            $scope.players.available.splice($scope.players.available.indexOf(player));
            $scope.players.mine.push(player);
        }
    }]);
})();