angular.module('starter')
    .controller('todoCtrl', ['$scope', 'localStorageService',
        function($scope, localStorageService) {

            //store the data in local storage
            var TODO = "to_Do";

            var setDataToStore = function(data) {
                localStorageService.set(TODO, data);
            };
            
            //retrieve the data from local storage
            var getFromStorage = function() {
                return localStorageService.get(TODO);
            };
            
            //edit new task
            $scope.task = {
                id: ""
            };
            
            //load complete and incomplete tasks 
            var loadApp = function() {
                var data = getFromStorage();
                if (data) {
                    $scope.tasks = data;
                } 
            else {
                $scope.tasks = {
                    //store all created tasks
                    'complete': [],
                    'incomplete': []
                    };
                }
            };
            
            //function loads on start altasks in the view
            loadApp();
            
            $scope.newTask = function(task) {
                $scope.tasks.incomplete.splice(0, 0, {
                    'id': task.id
                });
                //cleare task 
                $scope.task = {};
                setDataToStore($scope.tasks);
            };
            // move from one array to another when cheked
            $scope.changeToCompleted = function(from, task) {
                if (from == "incomplete") {
                    var deleteTask = $scope.tasks.incomplete.splice($scope.tasks.incomplete.indexOf(task), 1);
                    $scope.tasks.complete.splice(0, 0, deleteTask[0]);
                } else {
                    var deleteTask = $scope.tasks.complete.splice($scope.tasks.complete.indexOf(task), 1);
                    $scope.tasks.incomplete.splice(0, 0, deleteTask[0]);
                }
                setDataToStore($scope.tasks);
            };
            
            //function for deleting takes task as argument
            //removes tasks from from two arrays
            $scope.deleteTask = function(from, task) {
                if (from == "incomplete") {
                    $scope.tasks.incomplete.splice($scope.tasks.incomplete.indexOf(task), 1);
                } else {
                    $scope.tasks.complete.splice($scope.tasks.complete.indexOf(task), 1);
                }
                setDataToStore($scope.tasks);
            };

        }
    ]);