/**
 * Created by Dragos on 28.09.2016.
 */

(function () {
    angular.module("app.todo", ['ui.router', 'ngStorage'])
        .config(["$stateProvider", TodosConfig])
        .service("FilterService", ["$q", '$localStorage', FilterService])
        .service("TodosService", ["$q", '$localStorage', TodosService])
        .controller("FilterController", ['$scope','FilterService', '$timeout', FilterController])
    ;
})();

function TodosConfig($stateProvider) {
    $stateProvider
        .state({
            name: 'todos',
            url: "/todos",
            templateUrl: getContextPath(2) + '/todo/todos.html',
            controller: ["$scope", "$state", "TodosService", TodosController]
        })
        .state({
            name: 'todoEdit',
            url: "/todos/:id",
            templateUrl: getContextPath(2) + '/todo/todo-edit.html',
            controller: ["$scope", "$stateParams", "TodosService", TodoEditController]
        })
    ;
}

function TodosController($scope, $state, todosService) {

    todosService.findAll().then(function(todos){
        $scope.todos = todos;
    });

    $scope.addTodo = function () {
        todosService.addOne().then(function (id) {
            $state.go('todoEdit', {id: id});
        });
    };

    $scope.deleteTodo = function (todo) {
        todosService.deleteOne(todo.id);
    };

    $scope.openTodo = function (todo) {
        $state.go('todoEdit', {id: todo.id});
    };
}

function TodoEditController($scope, $stateParams, todosService) {
    todosService.findOne($stateParams.id).then(function (todo) {
        $scope.todo = todo;
    });
}

function TodosService($q, $localStorage) {
    return {
        findAll: function () {
            return $q(function (resolve, reject) {
                setTimeout(function () {
                    resolve($localStorage.todos);
                }, 10);
            });
        },
        deleteOne: function (id) {
            return $q(function (resolve, reject) {
                setTimeout(function () {
                    for(var i = 0; i< $localStorage.todos.length; i++){
                        if($localStorage.todos[i] != null && $localStorage.todos[i].id == id){
                            $localStorage.todos.splice(i, 1);
                            break;
                        }
                    }
                }, 10);
            });
        },
        addOne: function () {
            return $q(function (resolve, reject) {
                setTimeout(function () {
                    var id = nextId($localStorage.todos);
                    $localStorage.todos.push({
                        id:id,
                        title: null,
                        message: null,
                        date: null
                    })

                    resolve(id);
                }, 10);
            });
        },
        findOne: function (id) {
            return $q(function (resolve, reject) {
                setTimeout(function () {
                    for(var i = 0; i< $localStorage.todos.length; i++){
                        if($localStorage.todos[i] != null && $localStorage.todos[i].id == id){
                            if($localStorage.todos[i].date != null){
                                $localStorage.todos[i].date = new Date($localStorage.todos[i].date);
                            }
                            resolve($localStorage.todos[i]);
                            break;
                        }
                    }
                }, 10);
            });
        }
    };
}

function FilterService($q, $localStorage) {
    return {
        findAll: function () {
            return $q(function (resolve, reject) {
                setTimeout(function () {
                    resolve($localStorage.filters);
                }, 10);
            });
        }
    }
}


function FilterController($scope, filterService, $timeout) {

    filterService.findAll().then(function(filters){
        $scope.filters = filters;
    });

    $scope.addFilter = function () {
    }

    $scope.editFilter = function (filter) {
        alert(JSON.stringify(filter));
    }

    $scope.deleteFilter = function (filter) {
        alert(JSON.stringify(filter));
    }



    var self = $scope;

    self.simulateQuery = false;
    self.isDisabled    = false;

    // list of `state` value/display objects
    self.states        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;

    self.newState = newState;

    function newState(state) {
        alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
        var results = query ? self.states.filter( createFilterFor(query) ) : self.states;
        var deferred;
        if (self.simulateQuery) {
            deferred = $q.defer();
            $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }

    function searchTextChange(text) {
    }

    function selectedItemChange(item) {
    }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
        var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

        return allStates.split(/, +/g).map( function (state) {
            return {
                value: state.toLowerCase(),
                display: state
            };
        });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(state) {
            return (state.value.indexOf(lowercaseQuery) === 0);
        };

    }
}