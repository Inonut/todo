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
    ;
}

function TodosController($scope, $state, todosService) {

    todosService.findAll().then(function(todos){
        $scope.todos = todos;
    });

    $scope.addTodo = function () {

    };

    $scope.deleteTodo = function (todo) {
        todosService.deleteOne(todo.id);
    };
}

function TodoDeleteController($scope, $stateParams, todosService) {
    todosService.deleteOne($stateParams.id);
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
        }
    };
}