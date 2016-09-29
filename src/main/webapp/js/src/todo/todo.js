/**
 * Created by Dragos on 28.09.2016.
 */

(function () {
    angular.module("app.todo", ['ui.router', 'ngStorage'])
        .config(["$stateProvider", TodosConfig])
        .service("TodosService", ["$q", '$localStorage', TodosService])
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