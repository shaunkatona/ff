/**
 * Created by shaunkatona on 7/25/14.
 */
(function () {
    var app = angular.module('ffApp', []);

    app.controller('PlayerController', ['$scope', '$http', function ($scope, $http) {
        $scope.localStorage = window.localStorage;
        $scope.savedRosters = [];
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

            $scope.saveRoster();
        };

        // take the player out of the available queue and add them to another coach's team (not mine)
        $scope.addPlayerToTheirs = function (player, coach) {
            $scope.players.available.splice($scope.players.available.indexOf(player), 1);
            $scope.players.theirs[coach].push(player);

            $scope.saveRoster();
        };

        // take the player out of our queue and add them to the available queue
        $scope.releasePlayer = function (player) {
            $scope.players.mine.splice($scope.players.mine.indexOf(player), 1);
            $scope.players.available.push(player);

            $scope.saveRoster();
        };

        // take the player out of their queue and add them to the available queue
        $scope.releasePlayerFromTheirs = function (player, coach) {
            $scope.players.theirs[coach].splice($scope.players.theirs[coach].indexOf(player), 1);
            $scope.players.available.push(player);

            $scope.saveRoster();
        };

        // to color code the rows by position
        $scope.getRowClass = function (player) {
            return player.position;
        };

        $scope.getMyAverageRank = function (position) {
            var sum = 0;
            var numPlayersInThatPosition = 0;
            var _NO_RESULT = "--";

            for (var i = 0; i < $scope.players.mine.length; i++) {
                if ($scope.players.mine[i].position == position) {
                    sum += $scope.players.mine[i].positionRank;

                    numPlayersInThatPosition++;
                }
            }

            if (!numPlayersInThatPosition) {
                return _NO_RESULT;
            }

            return (sum / numPlayersInThatPosition).toFixed(2);
        };

        $scope.getMyAverageOverallRank = function () {
            var sum = 0;

            if (!$scope.players.mine.length) {
                return sum;
            } else {

                for (var i = 0; i < $scope.players.mine.length; i++) {
                    sum += $scope.players.mine[i].overallRank;
                }

                return (sum / $scope.players.mine.length).toFixed(2);
            }
        };

        $scope.getTheirAverageOverallRank = function (coach) {
            var sum = 0;

            if (!$scope.players.theirs[coach].length) {
                return sum;
            }

            for (var i = 0; i < $scope.players.theirs[coach].length; i++) {
                sum += $scope.players.theirs[coach][i].overallRank;
            }

            return (sum / $scope.players.theirs[coach].length).toFixed(2);
        };

        $scope.getTheirAverageRank = function (coach, position) {
            var sum = 0;
            var numPlayersInThatPosition = 0;
            var _NO_RESULT = "--";

            for (var i = 0; i < $scope.players.theirs[coach].length; i++) {
                if ($scope.players.theirs[coach][i].position == position) {
                    sum += $scope.players.theirs[coach][i].positionRank;

                    numPlayersInThatPosition++;
                }
            }

            if (!numPlayersInThatPosition) {
                return _NO_RESULT;
            }

            return (sum / numPlayersInThatPosition).toFixed(2);
        };

        $scope.saveRoster = function () {
            if(typeof(Storage) !== "undefined") {
                localStorage.setItem(new Date().getTime(), JSON.stringify($scope.players));
            }
        };

        $scope.loadRoster = function (timestamp) {
            if(typeof(Storage) !== "undefined") {
                $scope.players = JSON.parse(localStorage.getItem(timestamp));
            }
        };

        $scope.loadNewRoster = function () {
            location.reload();
        };
    }]);

    app.directive("savedRosters", function () {
        return {
            restrict: "E",
            scope: {
                loadRoster: "&",
                localStorage: "=",
                loadNewRoster: "&"
            },
            replace: true,
            template: "<ul class='dropdown-menu' role='menu'>" +
                            "<li><a href='javascript: void(0);' ng-click='loadNewRoster()'>NEW</a></li>" +
                            "<li class='divider'></li>" +
                            "<li ng-repeat='(key, value) in localStorage'>" +
                                "<a href='javascript: void(0);' ng-click='loadRoster({timestamp: key})'>" +
                                    "{{key | date: 'medium'}}" +
                                "</a>" +
                            "</li>" +
                        "</ul>"
        };
    });
})();