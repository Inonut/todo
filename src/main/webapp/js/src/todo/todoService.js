/**
 * Created by Dragos on 02.10.2016.
 */

function TodosService($q, $localStorage) {
    return {
        findAll: function () {
            return $q(function (resolve, reject) {
                setTimeout(function () {
                    resolve(angular.copy($localStorage.todos || []));
                }, 10);
            });
        },
        deleteOne: function (id) {
            var self = this;
            return $q(function (resolve, reject) {
                setTimeout(function () {
                    self.findAll().then(function (data) {
                        for(var i = 0; i< data.length; i++){
                            if(data[i] != null && data[i].id == id){
                                data.splice(i, 1);
                                break;
                            }
                        }
                        resolve(data)
                    });
                }, 10);
            });
        },
        addOne: function (todo) {
            var self = this;
            return $q(function (resolve, reject) {
                setTimeout(function () {
                    self.findAll().then(function (data) {
                        self.findOne(todo.id).then(function (todoFound) {
                            todoFound.title= todo.title;
                            todoFound.message= todo.message;
                            todoFound.date= todo.date;

                            resolve(data, todoFound);
                        }, function () {
                            var newTodo = {
                                id: nextId(data),
                                title: todo.title,
                                message: todo.message,
                                date: todo.date
                            };

                            data.push(newTodo);

                            resolve(data, newTodo);
                        });
                    });
                }, 10);
            });
        },
        findOne: function (id) {
            var self = this;
            return $q(function (resolve, reject) {
                setTimeout(function () {
                    self.findAll().then(function (data) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i] != null && data[i].id == id) {
                                if (data[i].date != null) {
                                    data[i].date = new Date(data[i].date);
                                }
                                resolve(data[i]);
                                break;
                            }
                        }

                        if(i==data.length){
                            reject();
                        }
                    });
                }, 10);
            });
        },
        saveAll: function (data) {
            var self = this;
            return $q(function (resolve, reject) {
                setTimeout(function () {
                    $localStorage.todos = data;
                    self.findAll().then(resolve);
                }, 10);
            });
        }
    };
}