const fs = require('fs');

const todos = require('../data/todo.json')

function query() {
    return Promise.resolve(todos)
}

function remove(todoId) {
    const idx = todos.findIndex(todo => todo.id === todoId)
    if (idx < 0) return Promise.reject('Not found');
    todos.splice(idx, 1)
    _saveToFile();
    return Promise.resolve();
}

function getById(todoId) {
    const todo = todos.find(todo => todo.id === todoId)
    if (!todo) return Promise.reject('Unknown Todo')
    return Promise.resolve(todo)
}

function add(todo) {
    todo.id = _makeId()
    todos.push(todo)
    _saveToFile();
    return Promise.resolve(todo)
}
function update(todo) {
    const idx = todos.findIndex(currTodo => currTodo.id === todo.id)
    todos[idx] = todo;
    _saveToFile();
    return Promise.resolve(todo)
}


module.exports = {
    query,
    remove,
    getById,
    add,
    update
}

function _makeId(length = 3) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

function _saveToFile() {
    fs.writeFile("data/todo.json", JSON.stringify(todos) , function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}