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
        $state.go('todoEdit', {id: -1});
    };

    $scope.deleteTodo = function (todo) {
        todosService.deleteOne(todo.id).then(function(data){
            todosService.saveAll(data).then(function (todos) {
                $scope.todos = todos;
            });
        });
    };

    $scope.openTodo = function (todo) {
        $state.go('todoEdit', {id: todo.id});
    };
}

function TodoEditController($scope, $stateParams, todosService) {
    todosService.findOne($stateParams.id).then(function (todo) {
        $scope.todo = todo;
    });
    
    $scope.saveTodo = function (todo) {
        todosService.addOne(todo).then(function (data, newtodo) {
            $scope.todo = newtodo;
            todosService.saveAll(data)
        });
    }
}