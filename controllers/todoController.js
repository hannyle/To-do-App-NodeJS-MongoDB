const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://mLabtest1:mLabtest1@ds113452.mlab.com:13452/todofinland', { useNewUrlParser: true });

//Create a schema - a blueprint for data, what mongoDB is expecting from todo data
const todoSchema = new mongoose.Schema({
    item: String,
});

//Create a todo model
const Todo = mongoose.model('Todo', todoSchema);

//setup bodyParser module and assign it to a variable, to handle parsing data of POST request
const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = (app) => {
    //setup all request handlers
    //1. GET request for the URL
    app.get('/', (req, res)=>{
        Todo.find({}, (err, data)=>{
            if(err) throw err;
            res.render('todoView', {todos: data});
        });
    });
    app.get('/todo', (req, res)=>{
        //get data from mongoDB and pass it to the view
        //find({}) gets all the data from Collection/Model Todo
        Todo.find({}, (err, data)=>{
            if(err) throw err;
            res.render('todoView', {todos: data});
        });
        
    });

    //2. POST request for users to submit items
    app.post('/todo', urlencodedParser, (req, res)=>{
        //get data from the View and add it to mongoDB
        let newTodo = Todo(req.body).save((err, data)=>{
            if(err) throw err;
            res.json(data);
        });        
    });

    //3. DELETE request
    app.delete ('/todo/:item', (req, res)=>{
        //Delete the requested item from mongoDB
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err, data)=>{
            if(err) throw err;
            res.json(data);
        });        
    });
};