/**
 * Created by Dragos on 28.09.2016.
 */

(function () {
    angular.module('myApp',['ngMaterial', 'ui.router', 'ngStorage', 'app.todo'])
        .config(["$mdThemingProvider", "$urlRouterProvider", "$httpProvider", ApplicationConfiguration])
        .controller('StorageController', ['$scope', '$localStorage', StorageController])
    ;
})();


function ApplicationConfiguration($mdThemingProvider, $urlRouterProvider, $httpProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('teal', {
            'default': '400', // by default use shade 400 from the pink palette for primary intentions
            'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
            'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
            'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
        })
        // If you specify less than all of the keys, it will inherit from the
        // default shades
        .accentPalette('lime', {
            'default': '200' // use shade 200 for default, and keep all other shades the same
        });

    $urlRouterProvider.otherwise('/todos');
}

function StorageController($scope, $localStorage) {

    if($localStorage.todos == null || $localStorage.todos.length == 0){
        $localStorage.todos = [];
        $localStorage.todos.push({
            id:nextId($localStorage.todos),
            title: "title 1",
            message: "Message",
            date: new Date()
        })
        $localStorage.todos.push({
            id:nextId($localStorage.todos),
            title: "title 1",
            message: "Message",
            date: new Date()
        })
        $localStorage.todos.push({
            id:nextId($localStorage.todos),
            title: "title 1",
            message: "Message",
            date: new Date()
        })
        $localStorage.todos.push({
            id:nextId($localStorage.todos),
            title: "title 1",
            message: "Message",
            date: new Date()
        })
        $localStorage.todos.push({
            id:nextId($localStorage.todos),
            title: "title 1",
            message: "Message",
            date: new Date()
        })
        $localStorage.todos.push({
            id:nextId($localStorage.todos),
            title: "title 1",
            message: "Message",
            date: new Date()
        })
        $localStorage.todos.push({
            id:nextId($localStorage.todos),
            title: "title 1",
            message: "Message",
            date: new Date()
        })
        $localStorage.todos.push({
            id:nextId($localStorage.todos),
            title: "title 1",
            message: "Message",
            date: new Date()
        })
        $localStorage.todos.push({
            id:nextId($localStorage.todos),
            title: "title 1",
            message: "Message",
            date: new Date()
        })
        $localStorage.todos.push({
            id:nextId($localStorage.todos),
            title: "title 1",
            message: "Message",
            date: new Date()
        })
        $localStorage.todos.push({
            id:nextId($localStorage.todos),
            title: "title 1",
            message: "Message",
            date: new Date()
        })
        $localStorage.todos.push({
            id:nextId($localStorage.todos),
            title: "title 1",
            message: "Message",
            date: new Date()
        })
        $localStorage.todos.push({
            id:nextId($localStorage.todos),
            title: "title 1",
            message: "Message",
            date: new Date()
        })
        $localStorage.todos.push({
            id:nextId($localStorage.todos),
            title: "title 1",
            message: "Message",
            date: new Date()
        })
        $localStorage.todos.push({
            id:nextId($localStorage.todos),
            title: "title 1",
            message: "Message",
            date: new Date()
        })

    }

}