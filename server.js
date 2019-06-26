const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const todoService = require('./services/todo.service');

const app = express()
app.use(express.static('public'))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); 


const port = 3000
const VIEW_DIR = `${__dirname}/views`;

// Render list of todos
app.get('/todo', (req, res) => {
    todoService.query()
        .then(todos => {
            res.render(`${VIEW_DIR}/todo-list.ejs`, { todos });
        })
})

// Edit Xtodo
app.get('/todo/edit/:todoId?', (req, res) => {
    const todoId = req.params.todoId;
    if (todoId) {
        todoService.getById(todoId)
        .then(todo => {
            res.render(`${VIEW_DIR}/todo-edit.ejs`, {todo});        
        })
    } else {
        res.render(`${VIEW_DIR}/todo-edit.ejs`, {todo: {}});
    }
})

app.post('/todo/save', (req, res) => {
    const todoData = req.body;
    todoData.completed = (todoData.completed === 'true');
    if (todoData.id) {
        console.log('Updating todo:', todoData);
        todoService.update(todoData)
        .then(updatedTodo => res.redirect(`/todo/${updatedTodo.id}`))
        
    } else {
        console.log('Adding todo:', todoData);
        todoService.add(todoData)
            .then(addedTodo => res.redirect(`/todo/${addedTodo.id}`))
    }
})

// Render Single Xtodo details:
app.get('/todo/:todoId', (req, res) => {
    const todoId = req.params.todoId;
    todoService.getById(todoId)
        .then(todo => {
            res.render(`${VIEW_DIR}/todo-details.ejs`, { todo });
        })
        .catch(err => {
            res.send(err);
        })
})

// Delete a XTodo
app.get('/todo/delete/:todoId', (req, res) => {

    const todoId = req.params.todoId
    todoService.remove(todoId)
        .then(() => {
            res.redirect('/todo')
        })
})

app.get('/', (req, res) => {
    var visitCount = req.cookies.visitCount || 0;
    visitCount++;
    res.cookie('visitCount', visitCount)
    res.sendFile(`${VIEW_DIR}/index.html`);
})

app.get('/admin', (req, res) => {
    const data = {
        greet: 'Yes Baba',
        users: [{ fullName: 'Bobo' }, { fullName: 'Momo' }, { fullName: 'Koko' }]
    }
    res.render(`${VIEW_DIR}/admin.ejs`, data);
})

app.get('/puki', (req, res) => {
    if (req.cookies.visitCount < 5) res.redirect('/')
    res.send('Hello Puki!')
})

app.get('/nono', (req, res) => res.redirect('/puki'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
